import Agenda from 'agenda';
import mongoose from 'mongoose';
import { Logger } from '../logger/winston.logger';
import dotenv from 'dotenv';

dotenv.config();

const { URLDATABASE } = process.env;

const agenda = new Agenda({ db: { address: URLDATABASE as string } });

agenda.define('check mongoose connection', async (job, done): Promise<void> => {
    try {
        if (typeof URLDATABASE !== 'string') return;
        await mongoose.connect(URLDATABASE);
        done();
    } catch (error: any) {
        Logger.error('========================= agenda error ==========================', error);
        done();
    } finally {
        await mongoose.disconnect();
    }
});

export async function startAgenda() {
    Logger.info('========================= agenda   ==========================');
    await agenda.start();
    await agenda.every('1 minute', 'check mongoose connection');
}
