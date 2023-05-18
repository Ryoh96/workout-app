import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'

import { createContext } from '@/graphql/context'
import { resolvers } from '@/graphql/resolvers'

const cors = Cors()

const schema = loadSchemaSync('src/graphql/generated/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const apolloServer = new ApolloServer({
  schema: schemaWithResolvers,
  context: createContext,
})

const startServer = apolloServer
  .start()
  .then((data) => `apollo server started ${data}`)

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

/**
 * Custom config
 * @see {@link https://nextjs.org/docs/pages/building-your-application/routing/api-routes#custom-config}
 */
export const config = {
  api: {
    bodyParser: false,
  },
}
