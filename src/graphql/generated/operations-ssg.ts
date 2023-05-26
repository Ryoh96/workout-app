/* eslint-disable */
import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'
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
export const RoundSetsFragmentDoc = gql`
  fragment roundSets on Round {
    id
    weight
    repetition
    interval
    unit
  }
`
export const ExerciseFieldsFragmentDoc = gql`
  fragment exerciseFields on Exercise {
    id
    name
    user {
      name
    }
    parts {
      name
    }
  }
`
export const AddExerciseByPartDocument = gql`
  mutation addExerciseByPart($name: String!, $partId: ID!) {
    addExerciseByPart(name: $name, partId: $partId) {
      id
      name
    }
  }
`
export const AddRoundDocument = gql`
  mutation addRound($input: AddRoundInput!) {
    addRound(input: $input) {
      id
      weight
      repetition
      interval
      unit
      memo {
        content
        pin
      }
      createdAt
    }
  }
`
export const CreateExerciseAtNoteDocument = gql`
  mutation createExerciseAtNote($name: String!, $parts: [String!]) {
    createExerciseAtNote(name: $name, parts: $parts) {
      id
      name
      parts {
        name
      }
    }
  }
`
export const CreateOrGetNoteIdDocument = gql`
  mutation createOrGetNoteId {
    createOrGetNoteId {
      id
    }
  }
`
export const CreateOrUpdateTodayNoteDocument = gql`
  mutation createOrUpdateTodayNote {
    createOrUpdateTodayNote {
      id
      trainings {
        id
        exercise {
          id
          name
          parts {
            name
          }
        }
        rounds {
          ...roundSets
          memo {
            content
            pin
          }
        }
      }
      place {
        name
      }
      createdAt
    }
  }
  ${RoundSetsFragmentDoc}
`
export const CreateTrainingDocument = gql`
  mutation createTraining($noteId: ID!, $exerciseId: ID!, $id: ID!) {
    createTraining(noteId: $noteId, exerciseId: $exerciseId, id: $id) {
      id
    }
  }
`
export const EditRoundDocument = gql`
  mutation EditRound($input: EditRoundInput!) {
    editRound(input: $input) {
      id
      weight
      repetition
      interval
      unit
      memo {
        content
        pin
      }
      createdAt
    }
  }
`
export const RemoveRoundDocument = gql`
  mutation removeRound($id: ID!) {
    removeRound(id: $id) {
      id
    }
  }
`
export const RemoveTrainingDocument = gql`
  mutation removeTraining($id: ID!) {
    removeTraining(id: $id) {
      id
    }
  }
`
export const GetAllExercisesMaxDocument = gql`
  query getAllExercisesMax {
    exercises {
      id
      name
      maxWeight
      maxTotalLoad
      maxWeightUnit
      updatedAt
    }
  }
`
export const GetAllPartsNameDocument = gql`
  query getAllPartsName {
    parts {
      id
      name
    }
  }
`
export const GetAllPlacesNameDocument = gql`
  query getAllPlacesName {
    places {
      name
    }
  }
`
export const GetExerciseDocument = gql`
  query getExercise($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      name
      parts {
        name
      }
      trainings {
        rounds {
          ...roundSets
        }
        createdAt
      }
      movieUrl
      articleUrl
      memos {
        content
        round {
          createdAt
        }
      }
      maxWeight
      maxTotalLoad
      maxWeightUnit
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetExerciseMaxByPartsDocument = gql`
  query getExerciseMaxByParts($partId: ID!) {
    part(id: $partId) {
      exercises {
        name
        maxWeight
        maxTotalLoad
        maxWeightUnit
      }
    }
  }
`
export const GetExerciseNameByDateDocument = gql`
  query getExerciseNameByDate($date: DateTime!) {
    exerciseByDate(date: $date) {
      id
      name
    }
  }
`
export const GetExerciseNamesByPartDocument = gql`
  query getExerciseNamesByPart($partIds: ID!) {
    part(id: $partIds) {
      name
      exercises {
        id
        name
      }
    }
  }
`
export const GetNoteDocument = gql`
  query getNote($date: DateTime!) {
    note(date: $date) {
      id
      trainings {
        id
        exercise {
          id
          name
          parts {
            name
          }
        }
        rounds {
          ...roundSets
          memo {
            content
            pin
          }
        }
      }
      place {
        name
      }
      createdAt
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetNoteByIdDocument = gql`
  query getNoteById($id: ID!) {
    noteById(id: $id) {
      id
      trainings {
        id
        exercise {
          id
          name
          parts {
            name
          }
        }
        rounds {
          ...roundSets
          memo {
            content
            pin
          }
        }
      }
      place {
        name
      }
      createdAt
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetNotesByDateDocument = gql`
  query getNotesByDate($orderBy: OrderBy!) {
    notes(orderBy: $orderBy) {
      trainings {
        exercise {
          name
          parts {
            name
          }
        }
        rounds {
          ...roundSets
        }
      }
      place {
        name
      }
      createdAt
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetPreviousTrainingDocument = gql`
  query getPreviousTraining($exerciseID: ID!) {
    training(id: $exerciseID) {
      rounds {
        ...roundSets
      }
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetRoundByTrainingDocument = gql`
  query getRoundByTraining($trainingId: ID!) {
    training(id: $trainingId) {
      rounds {
        ...roundSets
        memo {
          content
        }
      }
    }
  }
  ${RoundSetsFragmentDoc}
`
export const GetUserDocument = gql`
  query getUser {
    user {
      name
      gender
      height
      weight
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    addExerciseByPart(
      variables: AddExerciseByPartMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<AddExerciseByPartMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddExerciseByPartMutation>(
            AddExerciseByPartDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'addExerciseByPart',
        'mutation'
      )
    },
    addRound(
      variables: AddRoundMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<AddRoundMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddRoundMutation>(AddRoundDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'addRound',
        'mutation'
      )
    },
    createExerciseAtNote(
      variables: CreateExerciseAtNoteMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<CreateExerciseAtNoteMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateExerciseAtNoteMutation>(
            CreateExerciseAtNoteDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createExerciseAtNote',
        'mutation'
      )
    },
    createOrGetNoteId(
      variables?: CreateOrGetNoteIdMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<CreateOrGetNoteIdMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrGetNoteIdMutation>(
            CreateOrGetNoteIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createOrGetNoteId',
        'mutation'
      )
    },
    createOrUpdateTodayNote(
      variables?: CreateOrUpdateTodayNoteMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<CreateOrUpdateTodayNoteMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrUpdateTodayNoteMutation>(
            CreateOrUpdateTodayNoteDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createOrUpdateTodayNote',
        'mutation'
      )
    },
    createTraining(
      variables: CreateTrainingMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<CreateTrainingMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateTrainingMutation>(
            CreateTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createTraining',
        'mutation'
      )
    },
    EditRound(
      variables: EditRoundMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<EditRoundMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditRoundMutation>(EditRoundDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'EditRound',
        'mutation'
      )
    },
    removeRound(
      variables: RemoveRoundMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<RemoveRoundMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveRoundMutation>(RemoveRoundDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'removeRound',
        'mutation'
      )
    },
    removeTraining(
      variables: RemoveTrainingMutationVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<RemoveTrainingMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveTrainingMutation>(
            RemoveTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'removeTraining',
        'mutation'
      )
    },
    getAllExercisesMax(
      variables?: GetAllExercisesMaxQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetAllExercisesMaxQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllExercisesMaxQuery>(
            GetAllExercisesMaxDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getAllExercisesMax',
        'query'
      )
    },
    getAllPartsName(
      variables?: GetAllPartsNameQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetAllPartsNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllPartsNameQuery>(
            GetAllPartsNameDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getAllPartsName',
        'query'
      )
    },
    getAllPlacesName(
      variables?: GetAllPlacesNameQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetAllPlacesNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllPlacesNameQuery>(
            GetAllPlacesNameDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getAllPlacesName',
        'query'
      )
    },
    getExercise(
      variables: GetExerciseQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetExerciseQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetExerciseQuery>(GetExerciseDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getExercise',
        'query'
      )
    },
    getExerciseMaxByParts(
      variables: GetExerciseMaxByPartsQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetExerciseMaxByPartsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetExerciseMaxByPartsQuery>(
            GetExerciseMaxByPartsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getExerciseMaxByParts',
        'query'
      )
    },
    getExerciseNameByDate(
      variables: GetExerciseNameByDateQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetExerciseNameByDateQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetExerciseNameByDateQuery>(
            GetExerciseNameByDateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getExerciseNameByDate',
        'query'
      )
    },
    getExerciseNamesByPart(
      variables: GetExerciseNamesByPartQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetExerciseNamesByPartQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetExerciseNamesByPartQuery>(
            GetExerciseNamesByPartDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getExerciseNamesByPart',
        'query'
      )
    },
    getNote(
      variables: GetNoteQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetNoteQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetNoteQuery>(GetNoteDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getNote',
        'query'
      )
    },
    getNoteById(
      variables: GetNoteByIdQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetNoteByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetNoteByIdQuery>(GetNoteByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getNoteById',
        'query'
      )
    },
    getNotesByDate(
      variables: GetNotesByDateQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetNotesByDateQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetNotesByDateQuery>(
            GetNotesByDateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getNotesByDate',
        'query'
      )
    },
    getPreviousTraining(
      variables: GetPreviousTrainingQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetPreviousTrainingQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPreviousTrainingQuery>(
            GetPreviousTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getPreviousTraining',
        'query'
      )
    },
    getRoundByTraining(
      variables: GetRoundByTrainingQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetRoundByTrainingQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRoundByTrainingQuery>(
            GetRoundByTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getRoundByTraining',
        'query'
      )
    },
    getUser(
      variables?: GetUserQueryVariables,
      requestHeaders?: RequestInit['headers']
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getUser',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
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
