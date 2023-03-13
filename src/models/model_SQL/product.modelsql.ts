import { Voucher } from './voucher.modelsql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseModel } from './base.modelsql/base.modelsql';

@Entity({ name: 'product' })
export class Product extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'float', default: 0 })
    price: number;

    @ManyToMany(() => Voucher)
    @JoinTable()
    vouchers: Voucher[];
}
