import { DateTimeResolver } from 'graphql-scalars'

import type { Resolvers } from '../generated/resolvers-types'
import { Exercise, Note, Part, Round, Training } from './model'
import { Mutation } from './mutations'
import { Query } from './queries'

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Part,
  Note,
  Exercise,
  Training,
  Round,
  Query,
  Mutation
}
