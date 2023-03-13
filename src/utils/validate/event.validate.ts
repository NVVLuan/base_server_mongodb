import Joi from 'joi';
import { EventDTO } from '../../dtos/event.dto';

export class EventValidate {
    eventId(id: string): string {
        const eventSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = eventSchema.validate({ id });

        if (!error) return 'ok';
        return error.details[0].message;
    }

    eventCreate(data: EventDTO): string {
        const eventSchema = Joi.object({
            date_start: Joi.date().required(),
            date_end: Joi.date().required(),
            maxium: Joi.number().required(),
            name_event: Joi.string().required(),
            createdBy: Joi.string().min(24).required(),
        });
        const { error } = eventSchema.validate(data);

        if (!error) return 'ok';
        return error.details[0].message;
    }
}
