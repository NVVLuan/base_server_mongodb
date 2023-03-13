import ObjectId from 'mongoose';
import { VoucherDTO } from './../../dtos/voucher.dto';
import Joi from 'joi';

export class VoucherValidate {
    voucherCreate(data: VoucherDTO): string {
        const voucherSchema = Joi.object({
            event_id: Joi.string().min(24).required(),
            value: Joi.string().required(),
            createdBy: Joi.string().min(24).required(),
        });
        const { error } = voucherSchema.validate(data);
        if (!error) return 'ok';
        return error.details[0].message;
    }

    voucherId(id: string): string {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate({ id });
        if (!error) return 'ok';
        return error.details[0].message;
    }
}
