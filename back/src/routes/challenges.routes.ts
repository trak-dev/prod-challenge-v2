import { FastifyInstance } from "fastify";
import Challenge from "../models/challenge.model";
import Challenge_Classe from "../classes/challenge";
import User from "../models/user.model";

async function challengesRoutes(router: FastifyInstance) {
    router.get("/", async (request, reply) => {
        try {
            const challenges = await Challenge_Classe.getAll();
            reply.status(200).send(challenges);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    router.post<{Body: {name: string, description: string}}>("/", async (request, reply) => {
        try {
            if (!request.body) throw new Error("Please provide a body");
            if (!request.body.name) throw new Error("Please provide a name");
            if (!request.body.description) throw new Error("Please provide a description");
            const challenge: Partial<Challenge> = { NAME: request.body.name, DESCRIPTION: request.body.description };
            const challengeId = await Challenge_Classe.create(challenge, request.user.ID);
            reply.status(200).send(challengeId);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    // router.get("/challenges/:id", async (request, reply) => {
    //     try {
    //         const challenge = await Challenge.findByPk(request.params.id);
    //         if (!challenge) throw new Error("Challenge not found");
    //         reply.status(200).send(challenge);
    //     } catch (error) {
    //         console.error(error);
    //         reply.status(500).send({error});
    //     }
    // });


    // router.put("/challenges/:id", async (request, reply) => {
    //     try {
    //         const challenge = await Challenge.findByPk(request.params.id);
    //         if (!challenge) throw new Error("Challenge not found");
    //         challenge.NAME = request.body.name;
    //         challenge.DESCRIPTION = request.body.description;
    //         await challenge.save();
    //         reply.status(200).send(challenge);
    //     } catch (error) {
    //         console.error(error);
    //         reply.status(500).send({error});
    //     }
    // });

    // router.delete("/challenges/:id", async (request, reply) => {
    //     try {
    //         const challenge = await Challenge.findByPk(request.params.id);
    //         if (!challenge) throw new Error("Challenge not found");
    //         await challenge.destroy();
    //         reply.status(200).send(challenge);
    //     } catch (error) {
    //         console.error(error);
    //         reply.status(500).send({error});
    //     }
    // });
}
  
module.exports = challengesRoutes;