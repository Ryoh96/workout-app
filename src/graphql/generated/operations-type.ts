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
  Date: any
}

export type Exercise = {
  __typename?: 'Exercise'
  articleUrl?: Maybe<Array<Scalars['String']>>
  id: Scalars['ID']
  maxTotalLoad?: Maybe<Scalars['Int']>
  maxWeight?: Maybe<Scalars['Int']>
  memos?: Maybe<Array<Maybe<Memo>>>
  movieUrl?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
  parts?: Maybe<Array<Part>>
  trainings?: Maybe<Array<Training>>
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

export type Note = {
  __typename?: 'Note'
  createdAt: Scalars['Date']
  id: Scalars['ID']
  parts?: Maybe<Array<Part>>
  place: Place
  trainings: Array<Training>
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
  exercises?: Maybe<Array<Exercise>>
  note?: Maybe<Note>
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

export type QueryExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryNoteArgs = {
  date: Scalars['Date']
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
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
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
  createdAt: Scalars['Date']
  id: Scalars['ID']
  interval?: Maybe<Scalars['Int']>
  memo?: Maybe<Memo>
  repetition: Scalars['Int']
  setCount: Scalars['Int']
  training: Training
  weight: Scalars['Int']
}

export type Training = {
  __typename?: 'Training'
  createdAt: Scalars['Date']
  exercise: Exercise
  id: Scalars['ID']
  memo?: Maybe<Scalars['String']>
  note: Note
  rounds: Array<Round>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['Date']
  exercises?: Maybe<Array<Exercise>>
  gender?: Maybe<Gender>
  height?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  name: Scalars['String']
  notes?: Maybe<Array<Note>>
  password: Scalars['String']
  places?: Maybe<Array<Place>>
  updatedAt: Scalars['Date']
  weight?: Maybe<Scalars['Int']>
}

export type RoundSetsFragment = {
  __typename?: 'Round'
  setCount: number
  weight: number
  repetition: number
  interval?: number | null
}

export type ExerciseFieldsFragment = {
  __typename?: 'Exercise'
  id: string
  name: string
  user: { __typename?: 'User'; name: string }
  parts?: Array<{ __typename?: 'Part'; name: string }> | null
}

export type GetAllPartsNameQueryVariables = Exact<{ [key: string]: never }>

export type GetAllPartsNameQuery = {
  __typename?: 'Query'
  parts?: Array<{ __typename?: 'Part'; name: string }> | null
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
    parts?: Array<{ __typename?: 'Part'; name: string }> | null
    trainings?: Array<{
      __typename?: 'Training'
      createdAt: any
      rounds: Array<{
        __typename?: 'Round'
        setCount: number
        weight: number
        repetition: number
        interval?: number | null
      }>
    }> | null
    memos?: Array<{
      __typename?: 'Memo'
      content: string
      round: { __typename?: 'Round'; setCount: number; createdAt: any }
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
    }> | null
  } | null
}

export type GetExerciseNamesByPartQueryVariables = Exact<{
  partIds: Scalars['ID']
}>

export type GetExerciseNamesByPartQuery = {
  __typename?: 'Query'
  part?: {
    __typename?: 'Part'
    name: string
    exercises?: Array<{ __typename?: 'Exercise'; name: string }> | null
  } | null
}

export type GetNoteQueryVariables = Exact<{
  date: Scalars['Date']
}>

export type GetNoteQuery = {
  __typename?: 'Query'
  note?: {
    __typename?: 'Note'
    place: { __typename?: 'Place'; name: string }
    parts?: Array<{ __typename?: 'Part'; name: string }> | null
  } | null
}

export type GetNotesByDateQueryVariables = Exact<{
  orderBy: OrderBy
}>

export type GetNotesByDateQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    createdAt: any
    trainings: Array<{
      __typename?: 'Training'
      exercise: {
        __typename?: 'Exercise'
        name: string
        parts?: Array<{ __typename?: 'Part'; name: string }> | null
      }
      rounds: Array<{
        __typename?: 'Round'
        setCount: number
        weight: number
        repetition: number
        interval?: number | null
      }>
    }>
  }> | null
}

export type GetPreviousTrainingQueryVariables = Exact<{
  exerciseID: Scalars['ID']
}>

export type GetPreviousTrainingQuery = {
  __typename?: 'Query'
  training: {
    __typename?: 'Training'
    rounds: Array<{
      __typename?: 'Round'
      setCount: number
      weight: number
      repetition: number
      interval?: number | null
    }>
  }
}

export type GetRoundByTrainingQueryVariables = Exact<{
  trainingId: Scalars['ID']
}>

export type GetRoundByTrainingQuery = {
  __typename?: 'Query'
  training: {
    __typename?: 'Training'
    rounds: Array<{
      __typename?: 'Round'
      setCount: number
      weight: number
      repetition: number
      interval?: number | null
      memo?: { __typename?: 'Memo'; content: string } | null
    }>
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
