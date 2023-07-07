import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { ReactNode } from 'react'

const NEXT_PUBLIC_END_POINT = process.env.NEXT_PUBLIC_END_POINT
if (!NEXT_PUBLIC_END_POINT) {
  throw new Error('NEXT_PUBLIC_END_POINT is not defined')
}

export const client = new ApolloClient({
  uri: NEXT_PUBLIC_END_POINT,
  cache: new InMemoryCache(),
})

export const ApolloWrapper = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
