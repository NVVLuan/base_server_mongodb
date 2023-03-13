import jwt from 'jsonwebtoken';
import { jwtToken } from '../constants/jwt.constant';
import { UseTokenDTO } from '../../dtos/user.dto';
import dotenv from 'dotenv';
import { client } from '../../configs/redis.config';
import { TokenDTO } from '../../dtos/token.dto';
dotenv.config();

const signingKey = process.env.SIGNINGKEY;
const refeshSigningKey = process.env.REFESH_SIGNINGKEY;
const expires = process.env.EXPIRES;

export const generateToken = async (
    user: UseTokenDTO,
    expiresTemp?: string | undefined
): Promise<TokenDTO | null> => {
    //create refeshtoken
    return new Promise((resolve, reject) => {
        jwt.sign(
            { payload: user },
            refeshSigningKey as string,
            { expiresIn: expiresTemp ? expiresTemp : expires },
            (err, data) => {
                if (err) {
                    reject(null);
                }

                client.set(user.username.toString(), data as string);
                client.expire(user.username.toString(), 30 * 24 * 60 * 60);

                const token: TokenDTO = {
                    tokenType: jwtToken.BEARER,
                    accessToken: jwt.sign({ payload: user }, signingKey as string, {
                        expiresIn: expires ? expires : '10s',
                    }),
                    refeshToken: data as string,
                };

                resolve(token);
            }
        );
    });
};

export const varifyrefeshToken = async (refeshToken: string): Promise<null | UseTokenDTO> => {
    try {
        return new Promise((resolve) => {
            jwt.verify(refeshToken, refeshSigningKey as string, (err, data) => {
                if (err || !data) {
                    return resolve(null);
                }
                client
                    .get(typeof data === 'string' ? data : data.payload.username)
                    .then((response) => {
                        if (response !== refeshToken) return resolve(null);
                        return resolve(typeof data === 'string' ? data : data.payload);
                    });
            });
        });
    } catch {
        return null;
    }
};
