import { Types } from 'mongoose';
export interface TransactionDTO {
    user_id: string;
    voucher_id: string;
    createdBy: Types.ObjectId;
}
