import fastify from 'fastify';
import cors from '@fastify/cors'
import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import User from './models/user.model';
import Challenge from './models/challenge.model';
import Result from './models/result.model';
import Question from './models/question.model';
import User_Core from './core/user';

const dbuser = config.database.user;
const host = config.database.host;
const database = config.database.name;
const password = config.database.password;
const portdb = config.database.port;
const port = config.port;

// Create a new Sequelize instance
const sequelize = new Sequelize({
    database,
    username: dbuser,
    password,
    host: host,
    port: portdb, 
    dialect: 'postgres',
    models: [User, Challenge, Result, Question], // Add your models here,
    quoteIdentifiers: false,
    timezone: '+02:00',
    define: {
      timestamps: false,
    }
  });

const routesWithoutAuth = ["/users/magicLogin"];

const router = fastify({
  // logger: true
});

router.register(cors, {
  // put options here
});

// hook to check auth on every request except the ones in routesWithoutAuth
router.addHook('onRequest', async (request, reply) => {
    try {    

      // no auth needed for some routes
      if (routesWithoutAuth.includes(request.raw.url!)) return;
      // special case for the magic login
      if (request.raw.url!.includes("/users/magicLogin")) return;
      // special case for the magic login validation
      if (request.raw.url!.includes("/users/magicLogin/validate")) return;

      // check auth
      if (request.headers.authorization) {
        // check if token is valid
        if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
          request.headers.authorization = request.headers.authorization.split(' ')[1];
            await User_Core.getByToken(request.headers.authorization);
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
  });

// register the routes

router.register(require('./routes/users.routes'), { prefix: '/users' });

// start the server
router.listen({ port }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);

  try {
    await sequelize.authenticate();
    // const tables = [User, Challenge, Result, Question];
    // await sequelize.sync();
    // await Promise.all(tables.map((table) => table.sync({ alter: false })));
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});