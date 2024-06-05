import mysql, { Connection } from "mysql";

export const createConnection = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "apprenant",
    password: "apprenant",
    database: "livrou",
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
