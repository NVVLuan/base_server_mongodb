import { Product } from './product.modelsql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseModel } from './base.modelsql/base.modelsql';

@Entity({ name: 'supply' })
export class Supply extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
}
