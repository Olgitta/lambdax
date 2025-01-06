import { Sequelize, Model, ModelStatic } from 'sequelize';
import mysql2 from 'mysql2';
import { Logger } from '@aws-lambda-powertools/logger';
import getMysqlCredentials from '../aws-secrets/index';

const logger = new Logger();

let sequelize: Sequelize;

export async function initializeDatabase(): Promise<void> {
  if (sequelize) {
    logger.info(`Already connected to MySQL.`);
  }

  const { host, user, password, database } = await getMysqlCredentials();

  try {
    sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql', // Use 'mysql' for MySQL
      dialectModule: mysql2,
      logging: false, // Disable SQL query logging
      pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0, // Minimum number of connections in the pool
        acquire: 30000, // Maximum time (in ms) to acquire a connection
        idle: 10000, // Maximum time (in ms) a connection can be idle before being released
      },
    });

    await sequelize.authenticate(); // Ensure connection works
    logger.info(`Connected to MySQL: ${host}/${database}`);
  } catch (error) {
    logger.error(`Error connecting to MySQL: ${host}/${database}`, { error });
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    logger.info('Closing MySQL connection...');
    await sequelize.close();
    logger.info('MySQL connection closed.');
  } catch (error) {
    logger.error('Error disconnecting from MySQL:', { error });
  }
}

export async function mysqlPing(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    logger.error('MySQL ping failed:', { error });
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
