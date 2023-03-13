import { EmailDTO } from './../../dtos/email.dto';
import Joi from 'joi';

export class EmailValidate {
    emailCreate(data: EmailDTO): string {
        const emailSchema = Joi.object({
            from: Joi.string().email().lowercase().required(),
            to: Joi.string().email().lowercase().required(),
            subject: Joi.string().required(),
            title: Joi.string().required(),
            content: Joi.string().required(),
        });

        const { error } = emailSchema.validate(data);

        if (!error) return 'ok';
        return error.details[0].message;
    }
}
