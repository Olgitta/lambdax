import { Sequelize, Model, ModelStatic } from 'sequelize';
import mysql2 from 'mysql2';
import getMysqlCredentials from '../aws-secrets/index';

let sequelize: Sequelize;

export async function initializeDatabase(): Promise<Sequelize> {
  if (sequelize) {
    console.info(`Already connected to MySQL.`);
    return sequelize;
  }

  const { host, user, password, database } = await getMysqlCredentials();

  try {
    sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql',
      dialectModule: mysql2,
      logging: false,
      pool: {
        max: 2, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        acquire: 0, // Maximum time (in ms) to acquire a connection
        idle: 0, // Maximum time (in ms) a connection can be idle before being released
      },
    });

    await sequelize.authenticate(); // Ensure connection works
    console.info(`Connected to MySQL: ${host}/${database}`);

    return sequelize;
  } catch (error) {
    console.error(`Error connecting to MySQL: ${host}/${database}`, { error });
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    console.info('Closing MySQL connection...');
    await sequelize.close();
    console.info('MySQL connection closed.');
  } catch (error) {
    console.error('Error disconnecting from MySQL:', { error });
  }
}

export async function mysqlPing(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    console.error('MySQL ping failed:', { error });
    return false;
  }
}

export function createModel<TAttributes extends {}>(
  name: string,
  definition: {
    [key in keyof TAttributes]: any;
  },
  options: any = {},
): ModelStatic<Model> {
  return sequelize.define(name, definition, options);
}
