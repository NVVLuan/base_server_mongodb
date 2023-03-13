import { UserDTO } from './../../dtos/user.dto';
import Joi from 'joi';
import ObjectId from 'mongoose';

export class UserValidate {
    userLogin(data: UserDTO): string {
        const userSchema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = userSchema.validate(data);
        if (!error) return 'ok';
        return error.details[0].message;
    }

    userId(id: string): string {
        const schema = Joi.object({
            id: Joi.string().custom((value, helpers) => {
                if (!ObjectId.Types.ObjectId.isValid(value)) {
                    return helpers.error('any.invalid');
                }
                return value;
            }, 'ObjectID'),
        });
        const { error } = schema.validate({ id });
        if (!error) return 'ok';
        return error.details[0].message;
    }

    userAuth(refeshToken: string): string {
        const refreshTokenSchema = Joi.object({
            refreshToken: Joi.string()
                .regex(/^[\w-]{128}$/)
                .required(),
        });
        const { error } = refreshTokenSchema.validate(refeshToken);
        if (!error) return 'ok';
        return error.details[0].message;
    }
}
