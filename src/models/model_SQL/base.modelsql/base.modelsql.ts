import { Column } from 'typeorm';

export class BaseModel {
    @Column('uuid')
    createdBy: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @Column('uuid')
    updatedBy: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
