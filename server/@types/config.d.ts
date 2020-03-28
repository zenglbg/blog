import { ConnectionOptions } from "typeorm";

export type key =
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "mariadb";

export type ConfigMap = {
  mysql: ConnectionOptions;
};
