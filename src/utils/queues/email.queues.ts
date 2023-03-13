import Bull, { Job } from 'bull';
import dotenv from 'dotenv';
import { nodeMailer } from '../../configs/nodemailer.config';
import { EmailDTO } from '../../dtos/email.dto';
import { Logger } from '../logger/winston.logger';

dotenv.config();

const { URLREDIS } = process.env;

export const sendNewEmail = async (data: EmailDTO) => {
    return new Promise((resolve) => {
        try {
            // new queues
            const emailQueue = new Bull<EmailDTO>('email', {
                redis: URLREDIS,
                limiter: {
                    max: 1000,
                    duration: 3000,
                },
            });

            // hanlde process
            emailQueue.process(async (job: Job) => {
                await nodeMailer(job.data);
            });

            //add process into queues
            emailQueue.add(data);

            // hanlde queues
            emailQueue.on('completed', function (job: Job) {
                Logger.info('Completed: Job-' + job.id);
                resolve(true);
            });

            emailQueue.on('failed', async function (job: Job) {
                Logger.info('Failed: Job-' + job.id);
                resolve(false);
            });
        } catch (err: any) {
            Logger.info(err);
            resolve(false);
        }
    });
};
