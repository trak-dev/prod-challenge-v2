import User from "../models/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { LoginResponse } from "../models/login.model";
import moment from 'moment';
import nodemailer from 'nodemailer';

const { jwtSecret, mail } = config;

export default class User_Core {
    static async getByToken(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
            const user = await User.findByPk(decoded.id);
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getByEmail(email: string): Promise<User> {
        try {
            const user = await User.findOne({ where: { EMAIL: email } });
            if (!user) return null;
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async createUser(email: string, role: "STUDENT" | "PROFESSOR" | "ADMIN"): Promise<User> {
        try {
            const emailName = email.split('@')[0];
            const firstName = emailName.split('.')[0];
            const lastName = emailName.split('.')[1] || '';
            const user = await User.create({ EMAIL: email, ROLE: role, FIRSTNAME: firstName, LASTNAME: lastName });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async generateMagicLink(user: User): Promise<string> {
        try {
            // generate a random string
            const magicLink = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            // set the magic link and the expiration date in the database
            const expirationDate = moment().add(1, "hour").toDate();
            await User.update({ MAGICLINK: magicLink, VALID_UNTIL: expirationDate }, { where: { ID: user.ID } });

            const mailOptions = {
                from: mail.from, // sender address 
                to: user.EMAIL, // recipient address
                subject: 'Your magic link',
                text: 'hey ! here is your magic link: ' + magicLink + ' it will expire in 1 hour',
              };

            // send the magic link by email
            const transporter = nodemailer.createTransport({
                host: mail.host,
                port: mail.port,
                secure: mail.secure,

                auth: {
                    user: mail.user,
                    pass: mail.password
                },
            });

            await transporter.sendMail(mailOptions);

            return "email sent";
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async validateMagicLink(magicLink: string): Promise<LoginResponse> {
        try {
            // get the user
            const user = await User.findOne({ where: { MAGICLINK: magicLink } });
            if (!user) throw new Error("User not found");

            // check if the magic link is still valid with moment
            const now = moment();
            const validUntil = moment(user.VALID_UNTIL);
            if (now.isAfter(validUntil)) throw new Error("Magic link expired");

            // generate a token
            const token = jwt.sign({ id: user.ID, email: user.EMAIL, role: user.ROLE }, jwtSecret, { expiresIn: '1h' });

            // reset the magic link and the expiration date
            await User.update({ MAGICLINK: null, VALID_UNTIL: null }, { where: { ID: user.ID } });

            // return the token
            return { token, email: user.EMAIL, role: user.ROLE };
        } catch (error) {
            throw error;
        }
    }

}