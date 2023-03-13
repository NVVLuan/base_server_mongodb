import { ControllerConstant } from '../utils/constants/api.constant';
import express from 'express';
const server = express();
import { UserRouting, VoucherRouting, EmailRouting, TransactionRouting, EventRouting } from '../routes';

export const registerController = (expr: typeof server) => {
    expr.use(ControllerConstant.User, UserRouting);
    expr.use(ControllerConstant.Voucher, VoucherRouting);
    expr.use(ControllerConstant.Email, EmailRouting);
    expr.use(ControllerConstant.Transaction, TransactionRouting);
    expr.use(ControllerConstant.Event, EventRouting);
};
