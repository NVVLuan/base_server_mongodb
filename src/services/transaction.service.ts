import transaction from '../models/model_noSQL/transaction';

const getAll = async () => {
    return await transaction.find();
};

export const transactionService = { getAll };
