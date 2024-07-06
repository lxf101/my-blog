import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {User} from './users'
import { JoinColumn } from 'typeorm/browser';

@Entity({name: 'user_auths'})
export class UserAuth extends BaseEntity{
    @PrimaryGeneratedColumn()
    readonly id!:number;
    
    @Column()
    identity_type!: string;

    @Column()
    identifier!: string;

    @Column()
    credential!: string;

    @ManyToOne(()=> User, {
        cascade: true
    })
    @JoinColumn({name: 'user_id'})
    user!: User
}

