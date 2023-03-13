import { connectMongoDB, connectPostgreSQL } from './database.config';
import { swaggerConfig } from './../utils/swagger/config.swagger';
import { registerController } from './controller.config';
import { Logger } from '../utils/logger/winston.logger';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import { startAgenda } from '../utils/agenda/config.agenda';
import { client } from './redis.config';

const server = express();

function _setupProcessHandlers() {
    process.on('exit', () => Logger.info('=== Fatal Error: Application Closed ==='));
    process.on('uncaughtException', (err) => Logger.error('Unhandled Exception at', err));
    process.on('unhandledRejection', (reason) => {
        if (!(reason instanceof Error) || reason.name !== 'FeatureNotEnabled') {
            Logger.error('Unhandled Rejection at', reason);
        }
    });
}

export const App = async () => {
    _setupProcessHandlers();

    server.use(cors());
    server.use(express.json());
    // register Controller
    registerController(server);
    // register Swagger
    swaggerConfig(server);

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    // Create connection to database(mongoose)
    await connectMongoDB();
    // await startAgenda();
    // Create connection to database(postgreSQL)
    // connectPostgreSQL();

    //create Redis
    client;
    return server;
};
