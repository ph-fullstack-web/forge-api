import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {GqlExecutionContext} from '@nestjs/graphql';
import {OAuth2Client} from 'google-auth-library';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  readonly CLIENT_ID: string;
  readonly oAuth2Client: OAuth2Client;
  constructor(
    private configService: ConfigService,
    private reflector: Reflector
  ) {
    this.CLIENT_ID = configService.get<string>('CLIENT_ID');
    this.oAuth2Client = new OAuth2Client(this.CLIENT_ID);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (request) {
      return await this.verify(request.headers.authorization, roles);
    }

    const graphQLContext = GqlExecutionContext.create(context);
    const {headers} = graphQLContext.getContext().req;

    return await this.verify(headers.authorization, roles);
  }

  async verify(authorization: string, roles: string[]): Promise<boolean> {
    try {
      const token = authorization.replace('Bearer', '').trim();
      const ticket = await this.oAuth2Client.verifyIdToken({
        idToken: token,
        audience: this.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (
        !payload ||
        payload.iss !== this.configService.get<string>('ISSUER') ||
        payload.hd !== this.configService.get<string>('DOMAIN') ||
        payload.aud !== this.CLIENT_ID ||
        payload.exp * 1000 < Date.now()
      ) {
        throw new UnauthorizedException();
      }
      if (!roles) {
        return true;
      }
      const currentRoles = ['employee', 'admin']; //TODO use payload.email to get user roles
      return this.hasApproriateRole(currentRoles, roles);
    } catch {
      throw new UnauthorizedException();
    }
  }

  hasApproriateRole(currentRoles: string[], requiredRoles: string[]) {
    return currentRoles.some(r => requiredRoles.includes(r));
  }
}
