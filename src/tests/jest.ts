import { ApolloClient, InMemoryCache } from '@apollo/client'
import { cleanup } from '@testing-library/react'
import type { RequestHandler } from 'msw'
import { setupServer } from 'msw/node'

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers)
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    client.cache.reset()
    cleanup()
  })
  afterAll(() => server.close())
  return server
}
