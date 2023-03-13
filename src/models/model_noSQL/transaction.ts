import mongoose from 'mongoose';
import { baseEntity } from './base_models/base.model';
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    userId: { type: String },
    voucherId: { type: String },
    isSend: { type: Boolean, default: false },
    ...baseEntity,
});

export default mongoose.model('Transaction', TransactionSchema);
