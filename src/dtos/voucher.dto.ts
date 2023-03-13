import { Types } from 'mongoose';
export interface VoucherDTO {
    event_id: string;
    value: string;
    createdBy: Types.ObjectId;
}
