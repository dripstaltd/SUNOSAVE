import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();
server.applyMiddleware({ app });

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(`GraphQL endpoint: http://localhost:3000${server.graphqlPath}`);
});
