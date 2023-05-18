import { DateResolver } from 'graphql-scalars'

import type { Resolvers } from '../generated/resolvers-types'

export let resolvers: Resolvers = {
  Date: DateResolver,
}
