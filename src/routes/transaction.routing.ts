import { routerConstant } from '../utils/constants/api.constant';
import express from 'express';
import { transactionController } from '../controllers';
import { authenToken } from '../utils/middleware/jwt.middleware';

const TransactionRouting = express.Router();

TransactionRouting.get(`${routerConstant.GET_TRANSACTION_ALL}`, authenToken, transactionController.getTransactionAll);

export { TransactionRouting };
