import fastify from 'fastify';
import cors from '@fastify/cors'
import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import User from './models/user.model';
import Challenge from './models/challenge.model';
import Result from './models/result.model';
import Question from './models/question.model';


// middlewares
import authMiddleware from './middlewares/auth.middleware';

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

// add user to FastifyInstance
declare module 'fastify' {
  interface FastifyRequest  {
      user: User | null;
  }
}

const router = fastify({ 
  // logger: true,
});

router.register(cors, {
  // put options here
});

router.decorateRequest('user', null);

// hook to check auth on every request except the ones in routesWithoutAuth
router.addHook('onRequest', authMiddleware);


// register the routes

router.register(require('./routes/users.routes'), { prefix: '/users' });
router.register(require('./routes/challenges.routes'), { prefix: '/challenges' });

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