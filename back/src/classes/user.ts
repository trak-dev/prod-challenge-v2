import User from '../models/user.model';
import User_Core from '../core/user';
import { LoginResponse } from '../models/login.model';


export default class User_Classe {
    static async magicLogin(email: string): Promise<string> {
        try {
            const user = await User_Core.getByEmail(email);
            let link = "";
            if (!user) {
                const newUser = await User_Core.createUser(email, "STUDENT");
                link = await User_Core.generateMagicLink(newUser);
            } else {
                link = await User_Core.generateMagicLink(user);
            }
            return link;
        } catch (error) {
            throw error;
        }
    }

    static async loginWithMagicLink(magicLink: string): Promise<LoginResponse> {
        try {
            const loginResponse = await User_Core.validateMagicLink(magicLink); 
            return loginResponse;
        } catch (error) {
            throw error;
        }
    }
}