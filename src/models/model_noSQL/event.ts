import mongoose from 'mongoose';
import { baseEntity } from './base_models/base.model';
import dotenv from 'dotenv';
import { BaseEntity } from 'typeorm';
dotenv.config();
const { QUANTITY } = process.env;
const { Schema } = mongoose;

export interface EventInterface extends BaseEntity {
    quantity: number;
    maxium: number;
    name_event: string;
    date_start: Date;
    date_end: Date;
    by_editing: string;
    date_edited: Date;
}

const EventSchema = new Schema<EventInterface>({
    quantity: { type: Number, default: +(QUANTITY as string) },
    maxium: { type: Number, required: true },
    name_event: { type: String },
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    by_editing: { type: String },
    date_edited: { type: Date, default: new Date() },
    ...baseEntity,
});

EventSchema.path('date_end').validate(function () {
    if (this.get('date_end') > this.get('date_start') || this.get('quanlity') <= 10) {
        return true;
    }
    return false;
});

export default mongoose.model('Event', EventSchema);
