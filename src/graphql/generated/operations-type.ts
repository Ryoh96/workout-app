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
export type MaxTotalLoadResult = {
  __typename?: 'MaxTotalLoadResult'
  createdAt?: Maybe<Scalars['DateTime']>
  maxTotalLoad?: Maybe<Scalars['Float']>
}

export type MaxWeightResult = {
  __typename?: 'MaxWeightResult'
  createdAt?: Maybe<Scalars['DateTime']>
  maxWeight?: Maybe<Scalars['Float']>
}

export type Memo = {
  __typename?: 'Memo'
  content: Scalars['String']
  createdAt: Scalars['DateTime']
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
  changeExercisePart: Exercise
  createExerciseAtNote?: Maybe<Exercise>
  createNote: Note
  createTraining?: Maybe<Training>
  deleteExercise: Exercise
  deleteMemo?: Maybe<Memo>
  deleteMemoAtNote: Note
  deleteNote: Note
  editRound?: Maybe<Round>
  pinOutMemo?: Maybe<Memo>
  removeRound?: Maybe<Round>
  removeTraining?: Maybe<Training>
  renameExercise: Exercise
  upsertMemoAtNote: Note
}

export type MutationAddExerciseByPartArgs = {
  name: Scalars['String']
  partId: Scalars['ID']
}

export type MutationAddRoundArgs = {
  input: AddRoundInput
}

export type MutationChangeExercisePartArgs = {
  exerciseId: Scalars['ID']
  partId: Scalars['ID']
}

export type MutationCreateExerciseAtNoteArgs = {
  name: Scalars['String']
  parts?: InputMaybe<Array<Scalars['String']>>
}

export type MutationCreateNoteArgs = {
  date: Scalars['DateTime']
}

export type MutationCreateTrainingArgs = {
  exerciseId: Scalars['ID']
  id: Scalars['ID']
  noteId: Scalars['ID']
}

export type MutationDeleteExerciseArgs = {
  id: Scalars['ID']
}

export type MutationDeleteMemoArgs = {
  id: Scalars['ID']
}

export type MutationDeleteMemoAtNoteArgs = {
  id: Scalars['ID']
  index: Scalars['Int']
}

export type MutationDeleteNoteArgs = {
  id: Scalars['ID']
}

export type MutationEditRoundArgs = {
  input: EditRoundInput
}

export type MutationPinOutMemoArgs = {
  id: Scalars['ID']
}

export type MutationRemoveRoundArgs = {
  id: Scalars['ID']
}

export type MutationRemoveTrainingArgs = {
  id: Scalars['ID']
}

export type MutationRenameExerciseArgs = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type MutationUpsertMemoAtNoteArgs = {
  id: Scalars['ID']
  index?: InputMaybe<Scalars['Int']>
  memo: Scalars['String']
}

export type Note = {
  __typename?: 'Note'
  createdAt: Scalars['DateTime']
  date: Scalars['DateTime']
  id: Scalars['ID']
  memos?: Maybe<Array<Scalars['String']>>
  parts?: Maybe<Array<Part>>
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

export type Query = {
  __typename?: 'Query'
  exercise?: Maybe<Exercise>
  exerciseByDate?: Maybe<Array<Maybe<Exercise>>>
  exercises?: Maybe<Array<Exercise>>
  maxTotalLoad?: Maybe<MaxTotalLoadResult>
  maxWeight?: Maybe<MaxWeightResult>
  memo?: Maybe<Memo>
  memos?: Maybe<Array<Maybe<Memo>>>
  nextTraining?: Maybe<Training>
  note?: Maybe<Note>
  noteById?: Maybe<Note>
  notes?: Maybe<Array<Note>>
  part?: Maybe<Part>
  parts?: Maybe<Array<Part>>
  pinnedMemos?: Maybe<Array<Maybe<Memo>>>
  previousTrainings?: Maybe<Array<Maybe<Training>>>
  round?: Maybe<Round>
  rounds?: Maybe<Array<Maybe<Round>>>
  training?: Maybe<Training>
  trainings?: Maybe<Array<Training>>
  trainingsStat?: Maybe<Array<Maybe<Training>>>
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

export type QueryMaxTotalLoadArgs = {
  exerciseId: Scalars['ID']
}

export type QueryMaxWeightArgs = {
  exerciseId: Scalars['ID']
}

export type QueryMemoArgs = {
  id: Scalars['ID']
}

export type QueryMemosArgs = {
  id: Scalars['ID']
}

export type QueryNextTrainingArgs = {
  id: Scalars['ID']
}

export type QueryNoteArgs = {
  date: Scalars['DateTime']
}

export type QueryNoteByIdArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryNotesArgs = {
  orderBy?: InputMaybe<OrderBy>
  since?: InputMaybe<Scalars['DateTime']>
  until?: InputMaybe<Scalars['DateTime']>
}

export type QueryPartArgs = {
  id: Scalars['ID']
}

export type QueryPartsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryPinnedMemosArgs = {
  id: Scalars['ID']
}

export type QueryPreviousTrainingsArgs = {
  id: Scalars['ID']
  limit: Scalars['Int']
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

export type QueryTrainingsStatArgs = {
  exerciseId: Scalars['ID']
  limit?: InputMaybe<Scalars['Int']>
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
  totalLoad?: Maybe<Scalars['Float']>
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

export type ChangeExercisePartMutationVariables = Exact<{
  exerciseId: Scalars['ID']
  partId: Scalars['ID']
}>

export type ChangeExercisePartMutation = {
  __typename?: 'Mutation'
  changeExercisePart: { __typename?: 'Exercise'; id: string }
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

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteExerciseMutation = {
  __typename?: 'Mutation'
  deleteExercise: { __typename?: 'Exercise'; id: string }
}

export type RenameExerciseMutationVariables = Exact<{
  id: Scalars['ID']
  name: Scalars['String']
}>

export type RenameExerciseMutation = {
  __typename?: 'Mutation'
  renameExercise: { __typename?: 'Exercise'; id: string }
}

export type DeleteMemoMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteMemoMutation = {
  __typename?: 'Mutation'
  deleteMemo?: { __typename?: 'Memo'; id: string } | null
}

export type PinOutMemoMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type PinOutMemoMutation = {
  __typename?: 'Mutation'
  pinOutMemo?: { __typename?: 'Memo'; id: string } | null
}

export type CreateNoteMutationVariables = Exact<{
  date: Scalars['DateTime']
}>

export type CreateNoteMutation = {
  __typename?: 'Mutation'
  createNote: {
    __typename?: 'Note'
    id: string
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      createdAt: string
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
  }
}

export type DeleteMemoAtNoteMutationVariables = Exact<{
  id: Scalars['ID']
  index: Scalars['Int']
}>

export type DeleteMemoAtNoteMutation = {
  __typename?: 'Mutation'
  deleteMemoAtNote: { __typename?: 'Note'; id: string }
}

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteNoteMutation = {
  __typename?: 'Mutation'
  deleteNote: { __typename?: 'Note'; id: string }
}

export type UpsertMemoAtNoteMutationVariables = Exact<{
  id: Scalars['ID']
  memo: Scalars['String']
  index?: InputMaybe<Scalars['Int']>
}>

export type UpsertMemoAtNoteMutation = {
  __typename?: 'Mutation'
  upsertMemoAtNote: {
    __typename?: 'Note'
    id: string
    memos?: Array<string> | null
  }
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

export type CreateTrainingMutationVariables = Exact<{
  noteId: Scalars['ID']
  exerciseId: Scalars['ID']
  id: Scalars['ID']
}>

export type CreateTrainingMutation = {
  __typename?: 'Mutation'
  createTraining?: { __typename?: 'Training'; id: string } | null
}

export type RemoveTrainingMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type RemoveTrainingMutation = {
  __typename?: 'Mutation'
  removeTraining?: { __typename?: 'Training'; id: string } | null
}

export type GetExerciseQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetExerciseQuery = {
  __typename?: 'Query'
  exercise?: {
    __typename?: 'Exercise'
    name: string
    movieUrl?: Array<string> | null
    articleUrl?: Array<string> | null
    parts?: Array<{ __typename?: 'Part'; id: string; name: string }> | null
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
    exercises?: Array<{
      __typename?: 'Exercise'
      id: string
      name: string
    }> | null
  } | null
}

export type GetPinnedMemosByExercisesQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetPinnedMemosByExercisesQuery = {
  __typename?: 'Query'
  pinnedMemos?: Array<{
    __typename?: 'Memo'
    id: string
    content: string
    createdAt: string
  } | null> | null
}

export type GetExerciseNameByNoteQueryVariables = Exact<{
  since?: InputMaybe<Scalars['DateTime']>
  until?: InputMaybe<Scalars['DateTime']>
}>

export type GetExerciseNameByNoteQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    trainings?: Array<{
      __typename?: 'Training'
      id: string
      exercise?: {
        __typename?: 'Exercise'
        name: string
        id: string
        parts?: Array<{ __typename?: 'Part'; name: string; id: string }> | null
      } | null
    }> | null
  }> | null
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
      createdAt: string
      id: string
      totalLoad?: number | null
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
  } | null
}

export type GetNoteMemoQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetNoteMemoQuery = {
  __typename?: 'Query'
  noteById?: { __typename?: 'Note'; memos?: Array<string> | null } | null
}

export type GetNotesQueryVariables = Exact<{
  since?: InputMaybe<Scalars['DateTime']>
  until?: InputMaybe<Scalars['DateTime']>
}>

export type GetNotesQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    date: string
    createdAt: string
    trainings?: Array<{
      __typename?: 'Training'
      totalLoad?: number | null
      createdAt: string
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
  }> | null
}

export type GetTotalLoadByNoteQueryVariables = Exact<{
  since?: InputMaybe<Scalars['DateTime']>
  until?: InputMaybe<Scalars['DateTime']>
}>

export type GetTotalLoadByNoteQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    date: string
    trainings?: Array<{
      __typename?: 'Training'
      id: string
      totalLoad?: number | null
      exercise?: {
        __typename?: 'Exercise'
        id: string
        parts?: Array<{ __typename?: 'Part'; id: string; name: string }> | null
      } | null
    }> | null
  }> | null
}

export type GetPartNameQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetPartNameQuery = {
  __typename?: 'Query'
  part?: { __typename?: 'Part'; id: string; name: string } | null
}

export type GetAllPartsNameQueryVariables = Exact<{ [key: string]: never }>

export type GetAllPartsNameQuery = {
  __typename?: 'Query'
  parts?: Array<{ __typename?: 'Part'; id: string; name: string }> | null
}

export type GetMaxTotalLoadQueryVariables = Exact<{
  exerciseId: Scalars['ID']
}>

export type GetMaxTotalLoadQuery = {
  __typename?: 'Query'
  maxTotalLoad?: {
    __typename?: 'MaxTotalLoadResult'
    maxTotalLoad?: number | null
    createdAt?: string | null
  } | null
}

export type GetMaxWeightQueryVariables = Exact<{
  exerciseId: Scalars['ID']
}>

export type GetMaxWeightQuery = {
  __typename?: 'Query'
  maxWeight?: {
    __typename?: 'MaxWeightResult'
    maxWeight?: number | null
    createdAt?: string | null
  } | null
}

export type GetAllTrainingsInNoteQueryVariables = Exact<{
  [key: string]: never
}>

export type GetAllTrainingsInNoteQuery = {
  __typename?: 'Query'
  notes?: Array<{
    __typename?: 'Note'
    date: string
    trainings?: Array<{
      __typename?: 'Training'
      exercise?: { __typename?: 'Exercise'; id: string } | null
    }> | null
  }> | null
}

export type GetPreviousTrainingsQueryVariables = Exact<{
  id: Scalars['ID']
  limit: Scalars['Int']
}>

export type GetPreviousTrainingsQuery = {
  __typename?: 'Query'
  previousTrainings?: Array<{
    __typename?: 'Training'
    id: string
    rounds?: Array<{
      __typename?: 'Round'
      id: string
      weight: number
      repetition: number
      interval?: number | null
      unit: Unit
    }> | null
    note: { __typename?: 'Note'; date: string }
  } | null> | null
}

export type GetTrainingStatQueryVariables = Exact<{
  exerciseId: Scalars['ID']
  limit?: InputMaybe<Scalars['Int']>
}>

export type GetTrainingStatQuery = {
  __typename?: 'Query'
  trainingsStat?: Array<{
    __typename?: 'Training'
    id: string
    createdAt: string
    totalLoad?: number | null
    rounds?: Array<{
      __typename?: 'Round'
      weight: number
      repetition: number
      interval?: number | null
      unit: Unit
    }> | null
    note: { __typename?: 'Note'; date: string }
  } | null> | null
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
