import { Schema } from 'mongoose';

export const baseEntity = {
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId },
    updatedAt: { type: Date, default: Date.now },
};
