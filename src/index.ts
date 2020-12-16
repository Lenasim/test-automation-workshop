import 'reflect-metadata';
import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { getApolloServer } from './server'

import WilderResolver from './resolvers/WilderResolver'; // add this

const main = async () => {
  await createConnection();
  const server = await getApolloServer();
  
  //   const schema = await buildSchema({
  //   resolvers: [WilderResolver],
  // });
  // const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  console.log('Server has started!');
};

main();
