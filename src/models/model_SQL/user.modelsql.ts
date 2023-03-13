import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.modelsql/base.modelsql';
import { Transaction } from './transaction.modelsql';

@Entity({ name: 'user' })
export class User extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];
}
