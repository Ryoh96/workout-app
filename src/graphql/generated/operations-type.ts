export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type AddRoundInput = {
  exerciseId: Scalars['ID']
  roundInput: RoundInput
  trainingId: Scalars['ID']
}

export type EditRoundInput = {
  id: Scalars['ID']
  roundInput: RoundInput
}

export type Exercise = {
  __typename?: 'Exercise'
  articleUrl?: Maybe<Array<Scalars['String']>>
  createdAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  maxTotalLoad?: Maybe<Scalars['Float']>
  maxWeight?: Maybe<Scalars['Float']>
  maxWeightUnit?: Maybe<Unit>
  memos?: Maybe<Array<Maybe<Memo>>>
  menus?: Maybe<Array<Menu>>
  movieUrl?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
  parts?: Maybe<Array<Part>>
  trainings?: Maybe<Array<Training>>
  updatedAt: Scalars['DateTime']
  user: User
}

export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]
export type Memo = {
  __typename?: 'Memo'
  content: Scalars['String']
  exercise: Exercise
  id: Scalars['ID']
  pin?: Maybe<Scalars['Boolean']>
  round: Round
}

export type Menu = {
  __typename?: 'Menu'
  exercises: Array<Exercise>
  id: Scalars['ID']
  user: User
}

export type Mutation = {
  __typename?: 'Mutation'
  addExerciseByPart?: Maybe<Exercise>
  addRound?: Maybe<Round>
  createExerciseAtNote?: Maybe<Exercise>
  createOrGetNoteId: Note
  createOrUpdateTodayNote: Note
  createTraining?: Maybe<Training>
  editRound?: Maybe<Round>
  removeRound?: Maybe<Round>
  removeTraining?: Maybe<Training>
}

export type MutationAddExerciseByPartArgs = {
  name: Scalars['String']
  partId: Scalars['ID']
}

export type MutationAddRoundArgs = {
  input: AddRoundInput
}

export type MutationCreateExerciseAtNoteArgs = {
  name: Scalars['String']
  parts?: InputMaybe<Array<Scalars['String']>>
}

export type MutationCreateTrainingArgs = {
  exerciseId: Scalars['ID']
  id: Scalars['ID']
  noteId: Scalars['ID']
}

export type MutationEditRoundArgs = {
  input: EditRoundInput
}

export type MutationRemoveRoundArgs = {
  id: Scalars['ID']
}

export type MutationRemoveTrainingArgs = {
  id: Scalars['ID']
}

export type Note = {
  __typename?: 'Note'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  parts?: Maybe<Array<Part>>
  place?: Maybe<Place>
  trainings?: Maybe<Array<Training>>
  user: User
}

export const OrderBy = {
  Asc: 'ASC',
  Desc: 'DESC',
} as const

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy]
export type Part = {
  __typename?: 'Part'
  exercises?: Maybe<Array<Exercise>>
  id: Scalars['ID']
  name: Scalars['String']
}

export type Place = {
  __typename?: 'Place'
  id: Scalars['ID']
  name: Scalars['String']
  notes?: Maybe<Array<Note>>
  user: User
}

export type Query = {
  __typename?: 'Query'
  exercise: Exercise
  exerciseByDate?: Maybe<Array<Maybe<Exercise>>>
  exercises?: Maybe<Array<Exercise>>
  note?: Maybe<Note>
  noteById: Note
  notes?: Maybe<Array<Note>>
  part?: Maybe<Part>
  parts?: Maybe<Array<Part>>
  place?: Maybe<Place>
  places?: Maybe<Array<Place>>
  round?: Maybe<Round>
  rounds?: Maybe<Array<Maybe<Round>>>
  training: Training
  trainings?: Maybe<Array<Training>>
  user?: Maybe<User>
}

export type QueryExerciseArgs = {
  id: Scalars['ID']
}

export type QueryExerciseByDateArgs = {
  date: Scalars['DateTime']
}

export type QueryExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryNoteArgs = {
  date: Scalars['DateTime']
}

export type QueryNoteByIdArgs = {
  id: Scalars['ID']
}

export type QueryNotesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy: OrderBy
}

export type QueryPartArgs = {
  id: Scalars['ID']
}

export type QueryPartsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryPlaceArgs = {
  id: Scalars['ID']
}

export type QueryPlacesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryRoundArgs = {
  id: Scalars['ID']
}

export type QueryRoundsArgs = {
  trainingId: Scalars['ID']
}

export type QueryTrainingArgs = {
  id: Scalars['ID']
}

export type QueryTrainingsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type Round = {
  __typename?: 'Round'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  interval?: Maybe<Scalars['Int']>
  memo?: Maybe<Memo>
  repetition: Scalars['Int']
  training: Training
  unit: Unit
  weight: Scalars['Float']
}

export type RoundInput = {
  interval?: InputMaybe<Scalars['Int']>
  isPinned?: InputMaybe<Scalars['Boolean']>
  memo?: InputMaybe<Scalars['String']>
  repetition: Scalars['Int']
  unit: Unit
  weight: Scalars['Float']
}

export type Training = {
  __typename?: 'Training'
  createdAt: Scalars['DateTime']
  exercise?: Maybe<Exercise>
  id: Scalars['ID']
  memo?: Maybe<Scalars['String']>
  note: Note
  rounds?: Maybe<Array<Round>>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export const Unit = {
  Kg: 'KG',
  Lb: 'LB',
} as const

export type Unit = (typeof Unit)[keyof typeof Unit]
export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  exercises?: Maybe<Array<Exercise>>
  gender?: Maybe<Gender>
  height?: Maybe<Scalars['Float']>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  menus?: Maybe<Array<Menu>>
  name: Scalars['String']
  notes?: Maybe<Array<Note>>
  password: Scalars['String']
  places?: Maybe<Array<Place>>
  updatedAt: Scalars['DateTime']
  weight?: Maybe<Scalars['Float']>
}

export type RoundSetsFragment = {
  __typename?: 'Round'
  id: string
  weight: number
  repetition: number
  interval?: number | null
  unit: Unit
}

export type ExerciseFieldsFragment = {
  __typename?: 'Exercise'
  id: string
  name: string
  user: { __typename?: 'User'; name: string }
  parts?: Array<{ __typename?: 'Part'; name: string }> | null
}

export type AddExerciseByPartMutationVariables = Exact<{
  name: Scalars['String']
  partId: Scalars['ID']
}>

export type AddExerciseByPartMutation = {
  __typename?: 'Mutation'
  addExerciseByPart?: {
    __typename?: 'Exercise'
    id: string
    name: string
  } | null
}

export type AddRoundMutationVariables = Exact<{
  input: AddRoundInput
}>

export type AddRoundMutation = {
  __typename?: 'Mutation'
  addRound?: {
    __typename?: 'Round'
    id: string
    weight: number
    repetition: number
    interval?: number | null
    unit: Unit
    createdAt: string
    memo?: { __typename?: 'Memo'; content: string; pin?: boolean | null } | null
  } | null
}

export type CreateExerciseAtNoteMutationVariables = Exact<{
  name: Scalars['String']
  parts?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
}>

export type CreateExerciseAtNoteMutation = {
  __typename?: 'Mutation'
  createExerciseAtNote?: {
    __typename?: 'Exercise'
    id: string
    name: string
    parts?: Array<{ __typename?: 'Part'; name: string }> | null
  } | null
}

export type CreateOrGetNoteIdMutationVariables = Exact<{ [key: string]: never }>

export type CreateOrGetNoteIdMutation = {
  __typename?: 'Mutation'
  createOrGetNoteId: { __typename?: 'Note'; id: string }
}

export type CreateOrUpdateTodayNoteMutationVariables = Exact<{
  [key: string]: never
}>

export type CreateOrUpdateTodayNoteMutation = {
  __typename?: 'Mutation'
  createOrUpdateTodayNote: {
    __typename?: 'Note'
    id: string
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      id: string
      exercise?: {
        __typename?: 'Exercise'
        id: string
        name: string
        parts?: Array<{ __typename?: 'Part'; name: string }> | null
      } | null
      rounds?: Array<{
        __typename?: 'Round'
        id: string
        weight: number
        repetition: number
        interval?: number | null
        unit: Unit
        memo?: {
          __typename?: 'Memo'
          content: string
          pin?: boolean | null
        } | null
      }> | null
    }> | null
    place?: { __typename?: 'Place'; name: string } | null
  }
}

export type CreateTrainingMutationVariables = Exact<{
  noteId: Scalars['ID']
  exerciseId: Scalars['ID']
  id: Scalars['ID']
}>

export type CreateTrainingMutation = {
  __typename?: 'Mutation'
  createTraining?: { __typename?: 'Training'; id: string } | null
}

export type EditRoundMutationVariables = Exact<{
  input: EditRoundInput
}>

export type EditRoundMutation = {
  __typename?: 'Mutation'
  editRound?: {
    __typename?: 'Round'
    id: string
    weight: number
    repetition: number
    interval?: number | null
    unit: Unit
    createdAt: string
    memo?: { __typename?: 'Memo'; content: string; pin?: boolean | null } | null
  } | null
}

export type RemoveRoundMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type RemoveRoundMutation = {
  __typename?: 'Mutation'
  removeRound?: { __typename?: 'Round'; id: string } | null
}

export type RemoveTrainingMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type RemoveTrainingMutation = {
  __typename?: 'Mutation'
  removeTraining?: { __typename?: 'Training'; id: string } | null
}

export type GetAllExercisesMaxQueryVariables = Exact<{ [key: string]: never }>

export type GetAllExercisesMaxQuery = {
  __typename?: 'Query'
  exercises?: Array<{
    __typename?: 'Exercise'
    id: string
    name: string
    maxWeight?: number | null
    maxTotalLoad?: number | null
    maxWeightUnit?: Unit | null
    updatedAt: string
  }> | null
}

export type GetAllPartsNameQueryVariables = Exact<{ [key: string]: never }>

export type GetAllPartsNameQuery = {
  __typename?: 'Query'
  parts?: Array<{ __typename?: 'Part'; id: string; name: string }> | null
}

export type GetAllPlacesNameQueryVariables = Exact<{ [key: string]: never }>

export type GetAllPlacesNameQuery = {
  __typename?: 'Query'
  places?: Array<{ __typename?: 'Place'; name: string }> | null
}

export type GetExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID']
}>

export type GetExerciseQuery = {
  __typename?: 'Query'
  exercise: {
    __typename?: 'Exercise'
    name: string
    movieUrl?: Array<string> | null
    articleUrl?: Array<string> | null
    maxWeight?: number | null
    maxTotalLoad?: number | null
    maxWeightUnit?: Unit | null
    parts?: Array<{ __typename?: 'Part'; name: string }> | null
    trainings?: Array<{
      __typename?: 'Training'
      createdAt: string
      rounds?: Array<{
        __typename?: 'Round'
        id: string
        weight: number
        repetition: number
        interval?: number | null
        unit: Unit
      }> | null
    }> | null
    memos?: Array<{
      __typename?: 'Memo'
      content: string
      round: { __typename?: 'Round'; createdAt: string }
    } | null> | null
  }
}

export type GetExerciseMaxByPartsQueryVariables = Exact<{
  partId: Scalars['ID']
}>

export type GetExerciseMaxByPartsQuery = {
  __typename?: 'Query'
  part?: {
    __typename?: 'Part'
    exercises?: Array<{
      __typename?: 'Exercise'
      name: string
      maxWeight?: number | null
      maxTotalLoad?: number | null
      maxWeightUnit?: Unit | null
    }> | null
  } | null
}

export type GetExerciseNameByDateQueryVariables = Exact<{
  date: Scalars['DateTime']
}>

export type GetExerciseNameByDateQuery = {
  __typename?: 'Query'
  exerciseByDate?: Array<{
    __typename?: 'Exercise'
    id: string
    name: string
  } | null> | null
}

export type GetExerciseNamesByPartQueryVariables = Exact<{
  partIds: Scalars['ID']
}>

export type GetExerciseNamesByPartQuery = {
  __typename?: 'Query'
  part?: {
    __typename?: 'Part'
    name: string
    exercises?: Array<{
      __typename?: 'Exercise'
      id: string
      name: string
    }> | null
  } | null
}

export type GetNoteQueryVariables = Exact<{
  date: Scalars['DateTime']
}>

export type GetNoteQuery = {
  __typename?: 'Query'
  note?: {
    __typename?: 'Note'
    id: string
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      id: string
      exercise?: {
        __typename?: 'Exercise'
        id: string
        name: string
        parts?: Array<{ __typename?: 'Part'; name: string }> | null
      } | null
      rounds?: Array<{
        __typename?: 'Round'
        id: string
        weight: number
        repetition: number
        interval?: number | null
        unit: Unit
        memo?: {
          __typename?: 'Memo'
          content: string
          pin?: boolean | null
        } | null
      }> | null
    }> | null
    place?: { __typename?: 'Place'; name: string } | null
  } | null
}

export type GetNoteByIdQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetNoteByIdQuery = {
  __typename?: 'Query'
  noteById: {
    __typename?: 'Note'
    id: string
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      id: string
      exercise?: {
        __typename?: 'Exercise'
        id: string
        name: string
        parts?: Array<{ __typename?: 'Part'; name: string }> | null
      } | null
      rounds?: Array<{
        __typename?: 'Round'
        id: string
        weight: number
        repetition: number
        interval?: number | null
        unit: Unit
        memo?: {
          __typename?: 'Memo'
          content: string
          pin?: boolean | null
        } | null
      }> | null
    }> | null
    place?: { __typename?: 'Place'; name: string } | null
  }
}

export type GetNotesByDateQueryVariables = Exact<{
  orderBy: OrderBy
}>

export type GetNotesByDateQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      exercise?: {
        __typename?: 'Exercise'
        name: string
        parts?: Array<{ __typename?: 'Part'; name: string }> | null
      } | null
      rounds?: Array<{
        __typename?: 'Round'
        id: string
        weight: number
        repetition: number
        interval?: number | null
        unit: Unit
      }> | null
    }> | null
    place?: { __typename?: 'Place'; name: string } | null
  }> | null
}

export type GetPreviousTrainingQueryVariables = Exact<{
  exerciseID: Scalars['ID']
}>

export type GetPreviousTrainingQuery = {
  __typename?: 'Query'
  training: {
    __typename?: 'Training'
    rounds?: Array<{
      __typename?: 'Round'
      id: string
      weight: number
      repetition: number
      interval?: number | null
      unit: Unit
    }> | null
  }
}

export type GetRoundByTrainingQueryVariables = Exact<{
  trainingId: Scalars['ID']
}>

export type GetRoundByTrainingQuery = {
  __typename?: 'Query'
  training: {
    __typename?: 'Training'
    rounds?: Array<{
      __typename?: 'Round'
      id: string
      weight: number
      repetition: number
      interval?: number | null
      unit: Unit
      memo?: { __typename?: 'Memo'; content: string } | null
    }> | null
  }
}

export type GetUserQueryVariables = Exact<{ [key: string]: never }>

export type GetUserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    name: string
    gender?: Gender | null
    height?: number | null
    weight?: number | null
  } | null
}
