import { Table, Model, Column, AllowNull } from 'sequelize-typescript'

interface  UserModel {
    ID: number;
    EMAIL: string;
    FIRSTNAME: string;
    LASTNAME: string;
    ROLE: "STUDENT" | "PROFESSOR" | "ADMIN";
}

@Table
export default class User extends Model implements UserModel {
    @AllowNull(false)
    @Column
    ID!: number;

    @AllowNull(false)
    @Column
    EMAIL!: string;

    @AllowNull(false)
    @Column
    FIRSTNAME!: string;

    @AllowNull(false)
    @Column
    LASTNAME!: string;

    @AllowNull(false)
    @Column
    ROLE!: "STUDENT" | "PROFESSOR" | "ADMIN";
}
