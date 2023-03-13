import { Request, Response } from 'express';
import { transactionService } from '../services';

export const getTransactionAll = async (req: Request, res: Response) => {
    return res.status(200).json({
        data: await transactionService.getAll(),
    });
};
