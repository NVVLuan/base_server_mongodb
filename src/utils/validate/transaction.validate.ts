import { TransactionDTO } from './../../dtos/transaction.dto';
import Joi from 'joi';

export class TransactionValidate {
    transactionCreate(data: TransactionDTO): string {
        const voucherSchema = Joi.object({
            user_id: Joi.string().required(),
            voucher_id: Joi.string().required(),
            createdBy: Joi.string().min(24).required(),
        });

        const { error } = voucherSchema.validate(data);

        if (!error) return 'ok';
        return error.details[0].message;
    }
}
