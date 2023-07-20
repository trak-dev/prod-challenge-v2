import Challenge from "../models/challenge.model";

export default class Challenge_core {

    static async getById(id: number): Promise<Challenge> {
        try {
            const challenge = await Challenge.findByPk(id);
            if (!challenge) throw new Error("Challenge not found");
            return challenge;
        } catch (error) {
            throw error;
        }
    }

    static async getAll(): Promise<Challenge[]> {
        try {
            const challenges = await Challenge.findAll();
            return challenges;
        } catch (error) {
            throw error;
        }
    }

    static async create(challenge: Partial<Challenge>, creatorId: number): Promise<number> {
        try {
            const newChallenge = await Challenge.create({ CREATOR_ID: creatorId, NAME: challenge.NAME, DESCRIPTION: challenge.DESCRIPTION});
            return newChallenge.id;
        } catch (error) {
            throw error;
        }
    }
}