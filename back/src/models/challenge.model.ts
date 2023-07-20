import { Table, Model, Column, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

interface ChallengeModel {
    ID: number;
    NAME: string;
    CREATOR_ID: number;
    STATUS: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    TOTAL: number;
    DESCRIPTION: string;
}

@Table
export default class Challenge extends Model implements ChallengeModel {
    @AllowNull(true)
    @Column
    ID!: number;

    @AllowNull(false)
    @Column
    NAME!: string;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    CREATOR_ID!: number;

    @AllowNull(true)
    @Column
    STATUS!: "DRAFT" | "PUBLISHED" | "ARCHIVED";

    @AllowNull(true)
    @Column
    TOTAL!: number;

    @BelongsTo(() => User)
    CREATOR!: User;

    @Column
    DESCRIPTION!: string;
}