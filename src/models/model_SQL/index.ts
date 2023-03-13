import { Supply } from './supply.modelsql';
import { Product } from './product.modelsql';
import { User } from './user.modelsql';
import { Voucher } from './voucher.modelsql';
import { Transaction } from './transaction.modelsql';

export const modelSql = [User, Voucher, Transaction, Product, Supply];
