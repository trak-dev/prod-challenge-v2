import { Table, Model, Column, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';
import Challenge from './challenge.model';

interface ResultModel {
    CHALLENGE_ID: number;
    GRADE: number;
    USER_ID: number;
    STEPS_VALIDATED: number;
    DATABASE_CREDENTIALS: { 
        host: string,
        port: number,
        user: string,
        password: string,
        database: string
    };
}

@Table
export default class Result extends Model implements ResultModel {
    @AllowNull(false)
    @ForeignKey(() => Challenge)
    @Column
    CHALLENGE_ID!: number;

    @Column
    GRADE!: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    USER_ID!: number;

    @Column
    STEPS_VALIDATED!: number;

    DATABASE_CREDENTIALS!: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string
    };

    @BelongsTo(() => Challenge)
    CHALLENGE!: Challenge;

    @BelongsTo(() => User)
    USER!: User;
}