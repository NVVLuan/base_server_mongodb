import { Request, Response, NextFunction } from 'express';
import {VerifyErrors } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HydratedDocument } from 'mongoose';
import { UserDTO } from '../../dtos/user.dto';

dotenv.config();
const signingKey = process.env.SIGNINGKEY;
interface ResponeRequest extends Request {
    token: HydratedDocument<UserDTO>;
}

const authenToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }

        jwt.verify(token, signingKey as string, (err: VerifyErrors | null, payload) => {
            if (err || payload === undefined) {
                return next(err);
            }
            (req as ResponeRequest).token = payload as HydratedDocument<UserDTO>;
            next();
        });
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};

export { authenToken };
