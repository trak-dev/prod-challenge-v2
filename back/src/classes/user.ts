import User from '../models/user.model';
import User_Core from '../core/user';
import { LoginResponse } from '../models/login.model';
import Result_core from "../core/result";

export default class User_Classe {
    static async magicLogin(email: string, challengeId: number): Promise<string> {
        try {
            let user = await User_Core.getByEmail(email);
            if (!user) {
                if (challengeId === -1) throw new Error("Please provide a challengeId");
                user = await User_Core.createUser(email, "STUDENT");
            }
            if (challengeId !== -1) await Result_core.registerToChallenge(challengeId, user.ID);
            await User_Core.generateMagicLink(user, challengeId);
            return "link sent";
        } catch (error) {
            throw error;
        }
    }

    static async loginWithMagicLink(magicLink: string, challengeId: number): Promise<LoginResponse> {
        try {
            const loginResponse = await User_Core.validateMagicLink(magicLink, challengeId); 
            return loginResponse;
        } catch (error) {
            throw error;
        }
    }
}