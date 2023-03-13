import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.modelsql/base.modelsql';
import { Transaction } from './transaction.modelsql';

@Entity({ name: 'voucher' })
export class Voucher extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Transaction, (transaction) => transaction.voucher)
    transactions: Transaction[];

    @Column()
    name_voucher: string;

    @Column({ type: 'integer', default: 0 })
    value: number;

    @Column({ type: 'timestamptz', nullable: true })
    date_start: Date;

    @Column({ type: 'timestamptz', nullable: true })
    date_end: Date;
}
