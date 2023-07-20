import Result from "../models/result.model";
import Challenge_core from "./challenge";

export default class Result_core {

    static async registerToChallenge(challengeId: number, userId: number): Promise<Result> {
        try {
            const result = await Result.findOne({ where: { CHALLENGE_ID: challengeId, USER_ID: userId } });
            if (result) return result;
            await Challenge_core.getById(challengeId);
            return await Result.create({ CHALLENGE_ID: challengeId, USER_ID: userId });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
} 