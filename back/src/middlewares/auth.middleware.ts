import {FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import User_Core from '../core/user';

const routesWithoutAuth = [];

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {    

    const calledRoute = request.url;

    // check if auth is needed
    if (!checkIfAuthNeeded(calledRoute)) return;

    // check auth
    if (request.headers.authorization) {
      // check if token is valid
      if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
        request.headers.authorization = request.headers.authorization.split(' ')[1];
          const user = await User_Core.getByToken(request.headers.authorization);

          request.user = user;

          if (calledRoute.includes("/challenges")) {
            if (user.ROLE === "STUDENT") return reply.status(401).send({error: "You are not allowed to access this route"});
          }
      } else {
        console.error('Invalid token');
        reply.status(403).send({error: "Invalid token"});
      }
    } else {
      console.error("No token");
      reply.status(401).send({ error: "Please provide a token" });
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send({error});
  }
  };

  const checkIfAuthNeeded = (url: string) => {
    // no auth needed for some routes
    if (routesWithoutAuth.includes(url)) return false;
    // special case for the magic login
    if (url.includes("/users/magicLogin")) return false;
    // special case for the magic login validation
    if (url.includes("/users/magicLogin/validate")) return false;

    return true;
  }


export default authMiddleware;