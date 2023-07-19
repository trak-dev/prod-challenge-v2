import { FastifyInstance } from "fastify";
import User from "../models/user.model";
import User_Classe from "../classes/user";

async function userRoutes(router: FastifyInstance) {

    // router.get('/', async (request, reply) => {
    //     try {
    //         const users = await User.findAll();
    //         reply.status(200).send(users);
    //     } catch (error) {
    //         console.error(error);
    //         reply.status(500).send({error: error.name});
    //     }
    // });

    router.get<{Params: { email: string}}>('/magicLogin/:email', async (request, reply) => {
        try {
            if (!request.params.email) throw new Error("Please provide an email");
            const email = request.params.email;
            const link = await User_Classe.magicLogin(email);
            reply.status(200).send(link);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error.name});
        }
    });

    router.get<{Params: { magicLink: string}}>('/magicLogin/validate/:magicLink', async (request, reply) => {
        try {
            if (!request.params.magicLink) throw new Error("Please provide a magic link");
            const magicLink = request.params.magicLink;
            const loginObject = await User_Classe.loginWithMagicLink(magicLink);
            reply.status(200).send(loginObject);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error.name});
        }
    });
}
  
module.exports = userRoutes;