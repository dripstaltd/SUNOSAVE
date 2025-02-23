import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

type ApolloContext = {
  req: express.Request;
  userId?: string;
};

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173', // Your client URL
      credentials: true
    })
  );
  app.use(express.json());

  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split('Bearer ')[1];
        // If token exists, use it as userId
        return { req, userId: token };
      }
    })
  );

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
