import { LoggerInfo } from './../utils/logger/winston.logger';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logger } from '../utils/logger/winston.logger';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { modelSql } from '../models/model_SQL';

dotenv.config();

const {
    URLDATABASE,
    POST_DATABASE,
    USERNAME_POSTGRES,
    PASSWORD_POSTGRES,
    DATABASE_POSTGRES,
    HOST,
} = process.env;

// connect db with mongodb
export const connectMongoDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(URLDATABASE as string);
        if (conn.connection.readyState === 1) LoggerInfo('connect mongoDB success');
    } catch (err) {
        Logger.info('==================== connect mongodb  err====================');
    }
};

// connect db with postgreSQL and typeorm

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: Number(POST_DATABASE),
    username: USERNAME_POSTGRES,
    password: PASSWORD_POSTGRES,
    database: DATABASE_POSTGRES,
    entities: modelSql,
    migrations: ['./src/models/model_SQL/migrations/*.ts'],
    synchronize: true,
    logging: false,
});

export const connectPostgreSQL = () => {
    AppDataSource.initialize()
        .then(() => {
            LoggerInfo('connect posrpreSQL');
        })
        .catch(() => {
            Logger.info('==================== connect posrpreSQL error ====================');
        });
};
