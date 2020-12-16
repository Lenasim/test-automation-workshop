import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import WilderResolver from './resolvers/WilderResolver';

export async function getApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [WilderResolver],
  });
  const server = new ApolloServer({ schema });
  return server;
}
