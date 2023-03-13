import { Types } from 'mongoose';
import { VoucherValidate } from './../utils/validate/voucher.validate';
import {
    BadRequestException,
    CreateException,
    NotFundException,
    ResponseSuccess,
} from './../utils/constants/response.contant';
import { voucherService } from './../services/voucher.service';
import { Response, Request } from 'express';
import _ from 'lodash';
import { TransactionValidate } from '../utils/validate/transaction.validate';

export const getVoucherAll = async (req: Request, res: Response) => {
    return res.status(200).json({
        code: 'success',
        data: await voucherService.getVoucherAll(),
    });
};

export const postVoucher = async (req: Request, res: Response) => {
    const { value, event_id } = req.body;
    const createdBy = (req as any).token.payload.id as Types.ObjectId;
    if (
        !_.isEqual(
            new VoucherValidate().voucherCreate({ value, event_id, createdBy: createdBy }),
            'ok'
        )
    )
        return res.status(200).json(new BadRequestException().getError());

    const data = await voucherService.postVoucher(value, event_id, createdBy);

    if (!data) return res.status(200).json(new CreateException().getError());
    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const putVoucher = async (req: Request, res: Response) => {
    const { user_id, voucher_id } = req.body;
    const createdBy = (req as any).token.payload.id as Types.ObjectId;

    const from: string = (req as any).token.payload.email;

    if (
        !_.isEqual(
            new TransactionValidate().transactionCreate({
                user_id,
                voucher_id,
                createdBy: createdBy,
            }),
            'ok'
        )
    )
        return res.status(200).json(new BadRequestException().getError());

    const data = await voucherService.putVoucher(user_id, voucher_id, createdBy, from);

    if (!data) return res.status(200).json(new CreateException().getError());
    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const deleteVoucher = async (req: Request, res: Response) => {
    if (!_.isEqual(new VoucherValidate().voucherId(req.params.id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await voucherService.delteUser(req.params.id);

    if (data != 'delete success') return res.status(200).json(new NotFundException().getError());

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};
