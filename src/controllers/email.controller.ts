import { SendEmailException } from './../utils/constants/response.contant';
import { Response, Request } from 'express';
import _ from 'lodash';
import { emailService } from '../services';
import { BadRequestException, ResponseSuccess } from '../utils/constants/response.contant';
import { EmailValidate } from '../utils/validate/email.validate';

export const postEmail = async (req: Request, res: Response) => {
    const { from, to, subject, title, content } = req.body;

    if (!_.isEqual(new EmailValidate().emailCreate({ from, to, subject, title, content }), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await emailService.sendNewEmail(from, to, subject, title, content);

    if (!data) {
        return res.status(200).json(new SendEmailException().getError());
    }

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};
