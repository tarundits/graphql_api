import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './utils/connectDB.js';
import app from './app.js';
import { typeDefs } from './graphql/typeDefs/index.js';
import cookieParser from 'cookie-parser';

import { resolvers } from './graphql/resolvers/index.js';
import dotenv from 'dotenv';

dotenv.config();

const httpServer = http.createServer(app);

(async function () {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	// CONNECT DB
	await connectDB();

	await server.start();

	app.use('/graphql',cookieParser(),expressMiddleware(server , {
        context: async ({ req , res }) => {
         return {req, res}  
		},
      }));

	await new Promise((resolve) => httpServer.listen(process.env.PORT, '0.0.0.0', resolve));
	console.log(
		`🔥Server started at http://localhost:${process.env.PORT}/graphql`
	);
})();