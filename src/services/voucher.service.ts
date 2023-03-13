import user from '../models/model_noSQL/user';
import { ClientSession, Types } from 'mongoose';
import voucher from '../models/model_noSQL/voucher';
import mongoose from 'mongoose';
import transaction from '../models/model_noSQL/transaction';
import { Logger } from '../utils/logger/winston.logger';
import { emailQueue } from '../utils/queues';
import event from '../models/model_noSQL/event';
import { setTimeout } from 'timers/promises';

const getVoucherAll = async () => {
    return await voucher.find();
};

interface VoucherBase {
    event_id: string;
    value: string;
    createdBy: Types.ObjectId;
}

const postVoucher = async (
    value: string,
    event_id: string,
    createdBy: Types.ObjectId
): Promise<boolean> => {
    let result = true;

    // eslint-disable-next-line no-constant-condition
    for (let i = 0; i < 5; i++) {
        const session: ClientSession = await mongoose.startSession();
        session.startTransaction();
        try {
            const events = await event.findOneAndUpdate(
                { _id: event_id, quantity: { $gt: 0 } },
                { $inc: { quantity: -1 } },
                { session }
            );
            if (events === null) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                result = false;
                break;
            }

            const newVoucher: VoucherBase = {
                event_id: event_id,
                value: value,
                createdBy: createdBy,
            };

            await voucher.create([{ ...newVoucher }], { session });

            Logger.info('=== voucher created: ');

            await session.commitTransaction();

            break;
        } catch (error) {
            // Rollback any changes made in the database
            await session.abortTransaction();
            setTimeout(1000);
            Logger.error('============ error transaction ====================');
            continue;
            // Rethrow the error
        } finally {
            // Ending the session
            session.endSession();

            Logger.info('============= finally ===============================');
        }
    }

    return result;
};

const putVoucher = async (
    user_id: string,
    voucher_id: string,
    createdBy: Types.ObjectId,
    from: string
) => {
    const userFind = await user.findOne({ _id: user_id });
    const transactionFind = await transaction.findOne({ voucherId: voucher_id, userId: user_id });
    if (transactionFind) {
        throw new Error('use not accept ');
    }
    if (!userFind) {
        throw new Error('user or voucher not fund');
    }

    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();

    try {
        // TODO Add your statement here

        const transactionCreated = await transaction.create(
            [{ voucherId: voucher_id, userId: user_id, createdBy }],
            {
                session,
                new: true,
            }
        );

        Logger.info('=== transactionCreated: ', transactionCreated);

        const voucherUpdated = await voucher.findOneAndUpdate(
            { id: voucher_id, active: false },
            { active: true },
            { session, new: true }
        );
        Logger.info('=== voucherUpdated: ', voucherUpdated);
        // Commit the changes
        await session.commitTransaction();
    } catch (error) {
        // Rollback any changes made in the database
        await session.abortTransaction();
        Logger.error('============ error transaction ====================');
        // Rethrow the error
        return false;
    } finally {
        // Ending the session
        session.endSession();
    }

    //send mail for user
    try {
        const voucherFind = await voucher.findOne({ id: voucher_id });
        await emailQueue.sendNewEmail({
            from: from,
            to: userFind.email as string,
            subject: 'voucher for you',
            title: 'Voucher for you',
            content: `Code voucher: ${voucherFind?.value}`,
        });
        await transaction.findOneAndUpdate(
            { voucherId: voucher_id, userId: user_id, createdBy },
            { isSend: true }
        );
        return true;
    } catch (err) {
        Logger.error('========= error send mail ====================');
        return false;
    }
};

const delteUser = async (id: string) => {
    return new Promise((resolve) => {
        voucher.findByIdAndRemove(id, function (err: any) {
            if (err) resolve(err);
            resolve('delete success');
        });
    });
};

export const voucherService = {
    getVoucherAll,
    postVoucher,
    putVoucher,
    delteUser,
};
