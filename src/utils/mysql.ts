import mysql, { Connection } from "mysql";

export const createConnection = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });

  return connection;
};

export const executeQuery = async <T, S>(
  connection: Connection,
  sql: string,
  data?: S
): Promise<T> => {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (errors, results) => {
      if (errors) {
        return reject(errors);
      }
      return resolve(results);
    });
  });
};
