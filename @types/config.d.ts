export type key =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | 'mssql'
  | 'mariadb';

export type MysqlConfig = {
  key: key;
  host: Array<string>;
  user: string;
  password: string;
  database: string;
  modelPath: string[];
};

export type ConfigItem = MysqlConfig | string | Array<string>;

export type ConfigMap = {
  [key: string]: ConfigItem;
};
