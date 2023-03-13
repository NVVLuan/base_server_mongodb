import { emailQueue } from '../utils/queues';

const sendNewEmail = async (
    from: string,
    to: string,
    subject: string,
    title: string,
    content: string
) => {
    const checkEmailQueue = await emailQueue.sendNewEmail({ from, to, subject, title, content });
    if (checkEmailQueue) return true;
    return false;
};

export const emailService = { sendNewEmail };
