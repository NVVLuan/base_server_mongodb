import mongoose from 'mongoose';
import { baseEntity } from './base_models/base.model';
const { Schema } = mongoose;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: LuanNVV@example.com
 *        username:
 *          type: string
 *          default: LuanNVV
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    ...baseEntity,
});

export default mongoose.model('User', UserSchema);
