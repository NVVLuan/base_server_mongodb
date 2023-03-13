import * as redis from 'redis';
import dotenv from 'dotenv';
import { Logger } from '../utils/logger/winston.logger';
dotenv.config();

const { HOSTREDIS, PORTREDIS } = process.env;

// create a client instance
const client = redis.createClient({
    // password: PASSREDIS,
    socket: {
        host: HOSTREDIS,
        port: Number(PORTREDIS),
    },
});

client.connect();
client.ping();
// handle errors
client.on('error', () => {
    Logger.error('==================== redis error ======================');
});

//ping server

export { client };
