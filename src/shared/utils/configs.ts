declare let process;

export class ConfigModel {
  public API_ROOT: string;
  public EMPLOYEE_COLLECTION_NAME: string;
}

export function Configs(): ConfigModel {
  return <ConfigModel>{
    API_ROOT: process.env.API_ROOT,
    EMPLOYEE_COLLECTION_NAME: 'employees',
  };
}
