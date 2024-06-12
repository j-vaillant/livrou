import mysql from "serverless-mysql";

export const createConnection = async () => {
  const connection = await mysql({
    library: require("mysql2"),
    config: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT ?? "3306", 10),
    },
  });
  return connection;
};

export const executeQuery = async <T, V>(
  connection: any,
  sql: string,
  data?: V
): Promise<T> => {
  const queryResult = (await connection.query(sql, data)) as T;

  return queryResult;
};
