import { UserValidate } from './../utils/validate/user.validate';
import {
    NotFundException,
    ResponseSuccess,
    BadRequestException,
    ForbiddenException,
} from './../utils/constants/response.contant';
import _ from 'lodash';
import { userService } from '../services';
import { Response, Request } from 'express';
import { Logger } from '../utils/logger/winston.logger';

export const getAllUsers = async (req: Request, res: Response) => {
    return res.status(200).json({
        data: await userService.getAllUser(),
    });
};

export const postUser = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    if (!_.isEqual(new UserValidate().userLogin({ username, password, email }), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }
    const data = await userService.postUser(req.body.username, req.body.password, req.body.email);

    if (data === null)
        return res.status(200).json({
            status: 'error',
            message: 'Username exit',
        });

    return res.status(200).json(new ResponseSuccess(data).getSuccess());
};

export const getUser = async (req: Request, res: Response) => {
    if (!_.isEqual(new UserValidate().userId(req.params.id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await userService.getUserById(req.params.id);

    if (data === null) return res.status(200).json(new NotFundException().getError());

    return res.status(200).json(new ResponseSuccess(data).getSuccess());
};

export const postUserLogin = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    if (!_.isEqual(new UserValidate().userLogin({ username, password, email }), 'ok')) {
        Logger.error('==================== User login error  ====================');
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await userService.postUserLogin(
        req.body.username,
        req.body.password,
        req.body.email
    );

    if (data === null) {
        Logger.error('==================== User login error  ====================');
        return res.status(200).json(new NotFundException().getError());
    }

    Logger.info('==================== User login success ====================');
    return res.status(200).json(new ResponseSuccess(data as object).getSuccess());
};

export const putUser = async (req: Request, res: Response) => {
    if (!_.isEqual(new UserValidate().userId(req.params.id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError);
    }

    const data = await userService.putUser(req.body);

    if (data === null) return res.status(200).json(new NotFundException().getError());

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const deleteUser = async (req: Request, res: Response) => {
    if (!_.isEqual(new UserValidate().userId(req.params.id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await userService.delteUser(req.params.id);

    if (data === null) return res.status(200).json(new NotFundException().getError());

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const postUserRefeshtoken = async (req: Request, res: Response) => {
    if (!_.isEqual(new UserValidate().userAuth(req.body.refreshToken), 'ok'))
        return res.status(200).json(new BadRequestException().getError);

    const payload = await userService.postUserRefeshtoken(req.body.refreshToken);
    if (payload === null) {
        return res.status(403).json(new ForbiddenException().getError());
    }
    return res.status(200).json(new ResponseSuccess(payload as object).getSuccess());
};
