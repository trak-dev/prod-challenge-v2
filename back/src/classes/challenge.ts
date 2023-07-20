import Challenge from '../models/challenge.model';
import Challenge_Core from '../core/challenge';
import { LoginResponse } from '../models/login.model';
import Result_core from "../core/result";

export default class Challenge_Classe {
    
        static async getById(id: number): Promise<Challenge> {
            try {
                const challenge = await Challenge_Core.getById(id);
                return challenge;
            } catch (error) {
                throw error;
            }
        }
    
        static async getAll(): Promise<Challenge[]> {
            try {
                const challenges = await Challenge_Core.getAll();
                return challenges;
            } catch (error) {
                throw error;
            }
        }
    
        static async create(challenge: Partial<Challenge>, creatorId: number): Promise<number> {
            try {
                const newChallenge = await Challenge_Core.create(challenge, creatorId);
                return newChallenge;
            } catch (error) {
                throw error;
            }
        }
}