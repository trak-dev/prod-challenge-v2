import { Table, Model, Column, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Challenge from './challenge.model';

interface QuestionModel {
    ID: number;
    CHALLENGE_ID: number;
    QUESTION: string;
    EXPECTED_ANSWER: string;
    COMMAND: string;
    VALUE: number;
}

@Table
export default class Question extends Model implements QuestionModel {
    @AllowNull(false)
    @Column
    ID!: number;

    @AllowNull(false)
    @ForeignKey(() => Challenge)
    @Column
    CHALLENGE_ID!: number;

    @AllowNull(false)
    @Column
    QUESTION!: string;

    @AllowNull(false)
    @Column
    EXPECTED_ANSWER!: string;

    @AllowNull(false)
    @Column
    COMMAND!: string;

    @AllowNull(false)
    @Column
    VALUE!: number;

    @BelongsTo(() => Challenge)
    CHALLENGE!: Challenge;
}