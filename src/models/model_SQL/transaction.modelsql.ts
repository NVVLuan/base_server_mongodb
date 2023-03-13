import { Voucher } from './voucher.modelsql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.modelsql';
import { BaseModel } from './base.modelsql/base.modelsql';

@Entity({ name: 'transaction' })
export class Transaction extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;

    @ManyToOne(() => Voucher, (voucher) => voucher.transactions)
    voucher: Voucher;
}
