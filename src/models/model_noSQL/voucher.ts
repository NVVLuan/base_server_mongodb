import mongoose from 'mongoose';
import { baseEntity } from './base_models/base.model';
const { Schema } = mongoose;

const VoucherSchema = new Schema({
    event_id: String,
    value: String,
    active: { type: Boolean, default: false },
    ...baseEntity,
});

export default mongoose.model('Voucher', VoucherSchema);
