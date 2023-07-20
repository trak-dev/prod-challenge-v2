import { FastifyInstance } from "fastify";
import User from "../models/user.model";
import User_Classe from "../classes/user";

async function userRoutes(router: FastifyInstance) {

    router.get<{Params: { email: string, challengeId: string }}>('/magicLogin/:email/:challengeId', async (request, reply) => {
        try {
            if (!request.params.email) throw new Error("Please provide an email");
            const email = request.params.email;
            const challengeId = parseInt(request.params.challengeId) || -1;
            const link = await User_Classe.magicLogin(email, challengeId);
            reply.status(200).send(link);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    router.get<{Params: { magicLink: string, challengeId: string}}>('/magicLogin/validate/:magicLink/:challengeId', async (request, reply) => {
        try {
            if (!request.params.magicLink) throw new Error("Please provide a magic link");
            const magicLink = request.params.magicLink;
            const challengeId = parseInt(request.params.challengeId) || -1;
            const loginObject = await User_Classe.loginWithMagicLink(magicLink, challengeId);
            reply.status(200).send(loginObject);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });
}
  
module.exports = userRoutes;