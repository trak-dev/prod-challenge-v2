import { Table, Model, Column, AllowNull } from 'sequelize-typescript'

interface UserModel {
    ID: number;
    EMAIL: string;
    FIRSTNAME: string;
    LASTNAME: string;
    ROLE: "STUDENT" | "PROFESSOR" | "ADMIN";
    MAGICLINK: string;
    VALID_UNTIL: Date;
}

@Table
export default class User extends Model implements UserModel {
    @AllowNull(true)
    @Column
    ID!: number;

    @AllowNull(false)
    @Column
    EMAIL!: string;

    @AllowNull(true)
    @Column
    FIRSTNAME!: string;

    @AllowNull(true)
    @Column
    LASTNAME!: string;

    @AllowNull(false)
    @Column
    ROLE!: "STUDENT" | "PROFESSOR" | "ADMIN";

    @AllowNull(true)
    @Column
    MAGICLINK!: string;

    @AllowNull(true)
    @Column
    VALID_UNTIL!: Date;
}
