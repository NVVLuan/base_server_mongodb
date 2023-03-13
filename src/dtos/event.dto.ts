import { Types } from 'mongoose';
export interface EventDTO {
    name_event: string;
    date_start: Date;
    date_end: Date;
    maxium: number;
    createdBy: Types.ObjectId;
}
