/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type AddRoundInput = {
  exerciseId: Scalars['ID'];
  roundInput: RoundInput;
  trainingId: Scalars['ID'];
};

export type EditRoundInput = {
  id: Scalars['ID'];
  roundInput: RoundInput;
};

export type Exercise = {
  __typename?: 'Exercise';
  articleUrl?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  memos?: Maybe<Array<Maybe<Memo>>>;
  menus?: Maybe<Array<Menu>>;
  movieUrl?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  parts?: Maybe<Array<Part>>;
  trainings?: Maybe<Array<Training>>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];
export type MaxTotalLoadResult = {
  __typename?: 'MaxTotalLoadResult';
  createdAt?: Maybe<Scalars['DateTime']>;
  maxTotalLoad?: Maybe<Scalars['Float']>;
};

export type MaxWeightResult = {
  __typename?: 'MaxWeightResult';
  createdAt?: Maybe<Scalars['DateTime']>;
  maxWeight?: Maybe<Scalars['Float']>;
};

export type Memo = {
  __typename?: 'Memo';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  exercise: Exercise;
  id: Scalars['ID'];
  pin?: Maybe<Scalars['Boolean']>;
  round: Round;
};

export type Menu = {
  __typename?: 'Menu';
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseByPart?: Maybe<Exercise>;
  addRound?: Maybe<Round>;
  createExerciseAtNote?: Maybe<Exercise>;
  createNote: Note;
  createTraining?: Maybe<Training>;
  deleteExercise: Exercise;
  deleteMemo?: Maybe<Memo>;
  deleteMemoAtNote: Note;
  deleteNote: Note;
  editRound?: Maybe<Round>;
  removeRound?: Maybe<Round>;
  removeTraining?: Maybe<Training>;
  renameExercise: Exercise;
  upsertMemoAtNote: Note;
};


export type MutationAddExerciseByPartArgs = {
  name: Scalars['String'];
  partId: Scalars['ID'];
};


export type MutationAddRoundArgs = {
  input: AddRoundInput;
};


export type MutationCreateExerciseAtNoteArgs = {
  name: Scalars['String'];
  parts?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationCreateNoteArgs = {
  date: Scalars['DateTime'];
};


export type MutationCreateTrainingArgs = {
  exerciseId: Scalars['ID'];
  id: Scalars['ID'];
  noteId: Scalars['ID'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMemoArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMemoAtNoteArgs = {
  id: Scalars['ID'];
  index: Scalars['Int'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['ID'];
};


export type MutationEditRoundArgs = {
  input: EditRoundInput;
};


export type MutationRemoveRoundArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTrainingArgs = {
  id: Scalars['ID'];
};


export type MutationRenameExerciseArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationUpsertMemoAtNoteArgs = {
  id: Scalars['ID'];
  index?: InputMaybe<Scalars['Int']>;
  memo: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  memos?: Maybe<Array<Scalars['String']>>;
  parts?: Maybe<Array<Part>>;
  trainings?: Maybe<Array<Training>>;
  user: User;
};

export const OrderBy = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderBy = typeof OrderBy[keyof typeof OrderBy];
export type Part = {
  __typename?: 'Part';
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  exercise?: Maybe<Exercise>;
  exerciseByDate?: Maybe<Array<Maybe<Exercise>>>;
  exercises?: Maybe<Array<Exercise>>;
  maxTotalLoad?: Maybe<MaxTotalLoadResult>;
  maxWeight?: Maybe<MaxWeightResult>;
  memo?: Maybe<Memo>;
  memos?: Maybe<Array<Maybe<Memo>>>;
  nextTraining?: Maybe<Training>;
  note?: Maybe<Note>;
  noteById?: Maybe<Note>;
  notes?: Maybe<Array<Note>>;
  part?: Maybe<Part>;
  parts?: Maybe<Array<Part>>;
  pinnedMemos?: Maybe<Array<Maybe<Memo>>>;
  previousTrainings?: Maybe<Array<Maybe<Training>>>;
  round?: Maybe<Round>;
  rounds?: Maybe<Array<Maybe<Round>>>;
  training?: Maybe<Training>;
  trainings?: Maybe<Array<Training>>;
  trainingsStat?: Maybe<Array<Maybe<Training>>>;
  user?: Maybe<User>;
};


export type QueryExerciseArgs = {
  id: Scalars['ID'];
};


export type QueryExerciseByDateArgs = {
  date: Scalars['DateTime'];
};


export type QueryExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMaxTotalLoadArgs = {
  exerciseId: Scalars['ID'];
};


export type QueryMaxWeightArgs = {
  exerciseId: Scalars['ID'];
};


export type QueryMemoArgs = {
  id: Scalars['ID'];
};


export type QueryMemosArgs = {
  id: Scalars['ID'];
};


export type QueryNextTrainingArgs = {
  id: Scalars['ID'];
};


export type QueryNoteArgs = {
  date: Scalars['DateTime'];
};


export type QueryNoteByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryNotesArgs = {
  orderBy?: InputMaybe<OrderBy>;
  since?: InputMaybe<Scalars['DateTime']>;
  until?: InputMaybe<Scalars['DateTime']>;
};


export type QueryPartArgs = {
  id: Scalars['ID'];
};


export type QueryPartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPinnedMemosArgs = {
  id: Scalars['ID'];
};


export type QueryPreviousTrainingsArgs = {
  id: Scalars['ID'];
  limit: Scalars['Int'];
};


export type QueryRoundArgs = {
  id: Scalars['ID'];
};


export type QueryRoundsArgs = {
  trainingId: Scalars['ID'];
};


export type QueryTrainingArgs = {
  id: Scalars['ID'];
};


export type QueryTrainingsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTrainingsStatArgs = {
  exerciseId: Scalars['ID'];
  limit: Scalars['Int'];
};

export type Round = {
  __typename?: 'Round';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  interval?: Maybe<Scalars['Int']>;
  memo?: Maybe<Memo>;
  repetition: Scalars['Int'];
  training: Training;
  unit: Unit;
  weight: Scalars['Float'];
};

export type RoundInput = {
  interval?: InputMaybe<Scalars['Int']>;
  isPinned?: InputMaybe<Scalars['Boolean']>;
  memo?: InputMaybe<Scalars['String']>;
  repetition: Scalars['Int'];
  unit: Unit;
  weight: Scalars['Float'];
};

export type Training = {
  __typename?: 'Training';
  createdAt: Scalars['DateTime'];
  exercise?: Maybe<Exercise>;
  id: Scalars['ID'];
  memo?: Maybe<Scalars['String']>;
  note: Note;
  rounds?: Maybe<Array<Round>>;
  totalLoad?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export const Unit = {
  Kg: 'KG',
  Lb: 'LB'
} as const;

export type Unit = typeof Unit[keyof typeof Unit];
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  exercises?: Maybe<Array<Exercise>>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  menus?: Maybe<Array<Menu>>;
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  weight?: Maybe<Scalars['Float']>;
};

export type RoundSetsFragment = { __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit };

export type ExerciseFieldsFragment = { __typename?: 'Exercise', id: string, name: string, user: { __typename?: 'User', name: string }, parts?: Array<{ __typename?: 'Part', name: string }> | null };

export type AddExerciseByPartMutationVariables = Exact<{
  name: Scalars['String'];
  partId: Scalars['ID'];
}>;


export type AddExerciseByPartMutation = { __typename?: 'Mutation', addExerciseByPart?: { __typename?: 'Exercise', id: string, name: string } | null };

export type AddRoundMutationVariables = Exact<{
  input: AddRoundInput;
}>;


export type AddRoundMutation = { __typename?: 'Mutation', addRound?: { __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, createdAt: string, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null } | null };

export type CreateExerciseAtNoteMutationVariables = Exact<{
  name: Scalars['String'];
  parts?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateExerciseAtNoteMutation = { __typename?: 'Mutation', createExerciseAtNote?: { __typename?: 'Exercise', id: string, name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null };

export type CreateNoteMutationVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: string, createdAt: string, trainings?: Array<{ __typename?: 'Training', createdAt: string, id: string, exercise?: { __typename?: 'Exercise', id: string, name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null }> | null }> | null } };

export type CreateTrainingMutationVariables = Exact<{
  noteId: Scalars['ID'];
  exerciseId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type CreateTrainingMutation = { __typename?: 'Mutation', createTraining?: { __typename?: 'Training', id: string } | null };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: { __typename?: 'Exercise', id: string } };

export type DeleteMemoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMemoMutation = { __typename?: 'Mutation', deleteMemo?: { __typename?: 'Memo', id: string } | null };

export type DeleteMemoAtNoteMutationVariables = Exact<{
  id: Scalars['ID'];
  index: Scalars['Int'];
}>;


export type DeleteMemoAtNoteMutation = { __typename?: 'Mutation', deleteMemoAtNote: { __typename?: 'Note', id: string } };

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: { __typename?: 'Note', id: string } };

export type EditRoundMutationVariables = Exact<{
  input: EditRoundInput;
}>;


export type EditRoundMutation = { __typename?: 'Mutation', editRound?: { __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, createdAt: string, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null } | null };

export type RemoveRoundMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveRoundMutation = { __typename?: 'Mutation', removeRound?: { __typename?: 'Round', id: string } | null };

export type RemoveTrainingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveTrainingMutation = { __typename?: 'Mutation', removeTraining?: { __typename?: 'Training', id: string } | null };

export type RenameExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type RenameExerciseMutation = { __typename?: 'Mutation', renameExercise: { __typename?: 'Exercise', id: string } };

export type UpsertMemoAtNoteMutationVariables = Exact<{
  id: Scalars['ID'];
  memo: Scalars['String'];
  index?: InputMaybe<Scalars['Int']>;
}>;


export type UpsertMemoAtNoteMutation = { __typename?: 'Mutation', upsertMemoAtNote: { __typename?: 'Note', id: string, memos?: Array<string> | null } };

export type GetAllExercisesMaxQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExercisesMaxQuery = { __typename?: 'Query', exercises?: Array<{ __typename?: 'Exercise', id: string, name: string, updatedAt: string }> | null };

export type GetAllPartsNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPartsNameQuery = { __typename?: 'Query', parts?: Array<{ __typename?: 'Part', id: string, name: string }> | null };

export type GetExerciseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetExerciseQuery = { __typename?: 'Query', exercise?: { __typename?: 'Exercise', name: string, movieUrl?: Array<string> | null, articleUrl?: Array<string> | null, parts?: Array<{ __typename?: 'Part', name: string }> | null, trainings?: Array<{ __typename?: 'Training', createdAt: string, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null }> | null, memos?: Array<{ __typename?: 'Memo', content: string, round: { __typename?: 'Round', createdAt: string } } | null> | null } | null };

export type GetExerciseMaxByPartsQueryVariables = Exact<{
  partId: Scalars['ID'];
}>;


export type GetExerciseMaxByPartsQuery = { __typename?: 'Query', part?: { __typename?: 'Part', exercises?: Array<{ __typename?: 'Exercise', name: string }> | null } | null };

export type GetExerciseNameByDateQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type GetExerciseNameByDateQuery = { __typename?: 'Query', exerciseByDate?: Array<{ __typename?: 'Exercise', id: string, name: string } | null> | null };

export type GetExerciseNamesByPartQueryVariables = Exact<{
  partIds: Scalars['ID'];
}>;


export type GetExerciseNamesByPartQuery = { __typename?: 'Query', part?: { __typename?: 'Part', name: string, exercises?: Array<{ __typename?: 'Exercise', id: string, name: string }> | null } | null };

export type GetMaxTotalLoadQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type GetMaxTotalLoadQuery = { __typename?: 'Query', maxTotalLoad?: { __typename?: 'MaxTotalLoadResult', maxTotalLoad?: number | null, createdAt?: string | null } | null };

export type GetMaxWeightQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type GetMaxWeightQuery = { __typename?: 'Query', maxWeight?: { __typename?: 'MaxWeightResult', maxWeight?: number | null, createdAt?: string | null } | null };

export type GetMemosByExercisesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMemosByExercisesQuery = { __typename?: 'Query', memos?: Array<{ __typename?: 'Memo', id: string, content: string, createdAt: string } | null> | null };

export type GetNoteQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type GetNoteQuery = { __typename?: 'Query', note?: { __typename?: 'Note', id: string, createdAt: string, trainings?: Array<{ __typename?: 'Training', createdAt: string, id: string, totalLoad?: number | null, exercise?: { __typename?: 'Exercise', id: string, name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null }> | null }> | null } | null };

export type GetNoteByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNoteByIdQuery = { __typename?: 'Query', noteById?: { __typename?: 'Note', id: string, createdAt: string, trainings?: Array<{ __typename?: 'Training', id: string, createdAt: string, exercise?: { __typename?: 'Exercise', id: string, name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null }> | null }> | null } | null };

export type GetNoteMemoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNoteMemoQuery = { __typename?: 'Query', noteById?: { __typename?: 'Note', memos?: Array<string> | null } | null };

export type GetNotesQueryVariables = Exact<{
  since?: InputMaybe<Scalars['DateTime']>;
  until?: InputMaybe<Scalars['DateTime']>;
}>;


export type GetNotesQuery = { __typename?: 'Query', notes?: Array<{ __typename?: 'Note', date: string, createdAt: string, trainings?: Array<{ __typename?: 'Training', createdAt: string, exercise?: { __typename?: 'Exercise', name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null }> | null }> | null };

export type GetPinnedMemosByExercisesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPinnedMemosByExercisesQuery = { __typename?: 'Query', pinnedMemos?: Array<{ __typename?: 'Memo', id: string, content: string, createdAt: string } | null> | null };

export type GetPreviousTrainingsQueryVariables = Exact<{
  id: Scalars['ID'];
  limit: Scalars['Int'];
}>;


export type GetPreviousTrainingsQuery = { __typename?: 'Query', previousTrainings?: Array<{ __typename?: 'Training', id: string, rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null, note: { __typename?: 'Note', date: string } } | null> | null };

export type GetRoundByTrainingQueryVariables = Exact<{
  trainingId: Scalars['ID'];
}>;


export type GetRoundByTrainingQuery = { __typename?: 'Query', training?: { __typename?: 'Training', rounds?: Array<{ __typename?: 'Round', id: string, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string } | null }> | null } | null };

export type GetTrainingStatQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
  limit: Scalars['Int'];
}>;


export type GetTrainingStatQuery = { __typename?: 'Query', trainingsStat?: Array<{ __typename?: 'Training', id: string, createdAt: string, totalLoad?: number | null, rounds?: Array<{ __typename?: 'Round', weight: number, repetition: number, interval?: number | null, unit: Unit }> | null, note: { __typename?: 'Note', date: string } } | null> | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', name: string, gender?: Gender | null, height?: number | null, weight?: number | null } | null };

export const RoundSetsFragmentDoc = gql`
    fragment roundSets on Round {
  id
  weight
  repetition
  interval
  unit
}
    `;
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
    `;
export const AddExerciseByPartDocument = gql`
    mutation addExerciseByPart($name: String!, $partId: ID!) {
  addExerciseByPart(name: $name, partId: $partId) {
    id
    name
  }
}
    `;
export type AddExerciseByPartMutationFn = Apollo.MutationFunction<AddExerciseByPartMutation, AddExerciseByPartMutationVariables>;

/**
 * __useAddExerciseByPartMutation__
 *
 * To run a mutation, you first call `useAddExerciseByPartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseByPartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseByPartMutation, { data, loading, error }] = useAddExerciseByPartMutation({
 *   variables: {
 *      name: // value for 'name'
 *      partId: // value for 'partId'
 *   },
 * });
 */
export function useAddExerciseByPartMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseByPartMutation, AddExerciseByPartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseByPartMutation, AddExerciseByPartMutationVariables>(AddExerciseByPartDocument, options);
      }
export type AddExerciseByPartMutationHookResult = ReturnType<typeof useAddExerciseByPartMutation>;
export type AddExerciseByPartMutationResult = Apollo.MutationResult<AddExerciseByPartMutation>;
export type AddExerciseByPartMutationOptions = Apollo.BaseMutationOptions<AddExerciseByPartMutation, AddExerciseByPartMutationVariables>;
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
    `;
export type AddRoundMutationFn = Apollo.MutationFunction<AddRoundMutation, AddRoundMutationVariables>;

/**
 * __useAddRoundMutation__
 *
 * To run a mutation, you first call `useAddRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRoundMutation, { data, loading, error }] = useAddRoundMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddRoundMutation(baseOptions?: Apollo.MutationHookOptions<AddRoundMutation, AddRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRoundMutation, AddRoundMutationVariables>(AddRoundDocument, options);
      }
export type AddRoundMutationHookResult = ReturnType<typeof useAddRoundMutation>;
export type AddRoundMutationResult = Apollo.MutationResult<AddRoundMutation>;
export type AddRoundMutationOptions = Apollo.BaseMutationOptions<AddRoundMutation, AddRoundMutationVariables>;
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
    `;
export type CreateExerciseAtNoteMutationFn = Apollo.MutationFunction<CreateExerciseAtNoteMutation, CreateExerciseAtNoteMutationVariables>;

/**
 * __useCreateExerciseAtNoteMutation__
 *
 * To run a mutation, you first call `useCreateExerciseAtNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseAtNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseAtNoteMutation, { data, loading, error }] = useCreateExerciseAtNoteMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parts: // value for 'parts'
 *   },
 * });
 */
export function useCreateExerciseAtNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseAtNoteMutation, CreateExerciseAtNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseAtNoteMutation, CreateExerciseAtNoteMutationVariables>(CreateExerciseAtNoteDocument, options);
      }
export type CreateExerciseAtNoteMutationHookResult = ReturnType<typeof useCreateExerciseAtNoteMutation>;
export type CreateExerciseAtNoteMutationResult = Apollo.MutationResult<CreateExerciseAtNoteMutation>;
export type CreateExerciseAtNoteMutationOptions = Apollo.BaseMutationOptions<CreateExerciseAtNoteMutation, CreateExerciseAtNoteMutationVariables>;
export const CreateNoteDocument = gql`
    mutation createNote($date: DateTime!) {
  createNote(date: $date) {
    id
    trainings {
      createdAt
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
    createdAt
  }
}
    ${RoundSetsFragmentDoc}`;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const CreateTrainingDocument = gql`
    mutation createTraining($noteId: ID!, $exerciseId: ID!, $id: ID!) {
  createTraining(noteId: $noteId, exerciseId: $exerciseId, id: $id) {
    id
  }
}
    `;
export type CreateTrainingMutationFn = Apollo.MutationFunction<CreateTrainingMutation, CreateTrainingMutationVariables>;

/**
 * __useCreateTrainingMutation__
 *
 * To run a mutation, you first call `useCreateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainingMutation, { data, loading, error }] = useCreateTrainingMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *      exerciseId: // value for 'exerciseId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateTrainingMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrainingMutation, CreateTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrainingMutation, CreateTrainingMutationVariables>(CreateTrainingDocument, options);
      }
export type CreateTrainingMutationHookResult = ReturnType<typeof useCreateTrainingMutation>;
export type CreateTrainingMutationResult = Apollo.MutationResult<CreateTrainingMutation>;
export type CreateTrainingMutationOptions = Apollo.BaseMutationOptions<CreateTrainingMutation, CreateTrainingMutationVariables>;
export const DeleteExerciseDocument = gql`
    mutation deleteExercise($id: ID!) {
  deleteExercise(id: $id) {
    id
  }
}
    `;
export type DeleteExerciseMutationFn = Apollo.MutationFunction<DeleteExerciseMutation, DeleteExerciseMutationVariables>;

/**
 * __useDeleteExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseMutation, { data, loading, error }] = useDeleteExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, options);
      }
export type DeleteExerciseMutationHookResult = ReturnType<typeof useDeleteExerciseMutation>;
export type DeleteExerciseMutationResult = Apollo.MutationResult<DeleteExerciseMutation>;
export type DeleteExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>;
export const DeleteMemoDocument = gql`
    mutation deleteMemo($id: ID!) {
  deleteMemo(id: $id) {
    id
  }
}
    `;
export type DeleteMemoMutationFn = Apollo.MutationFunction<DeleteMemoMutation, DeleteMemoMutationVariables>;

/**
 * __useDeleteMemoMutation__
 *
 * To run a mutation, you first call `useDeleteMemoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemoMutation, { data, loading, error }] = useDeleteMemoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMemoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMemoMutation, DeleteMemoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMemoMutation, DeleteMemoMutationVariables>(DeleteMemoDocument, options);
      }
export type DeleteMemoMutationHookResult = ReturnType<typeof useDeleteMemoMutation>;
export type DeleteMemoMutationResult = Apollo.MutationResult<DeleteMemoMutation>;
export type DeleteMemoMutationOptions = Apollo.BaseMutationOptions<DeleteMemoMutation, DeleteMemoMutationVariables>;
export const DeleteMemoAtNoteDocument = gql`
    mutation deleteMemoAtNote($id: ID!, $index: Int!) {
  deleteMemoAtNote(id: $id, index: $index) {
    id
  }
}
    `;
export type DeleteMemoAtNoteMutationFn = Apollo.MutationFunction<DeleteMemoAtNoteMutation, DeleteMemoAtNoteMutationVariables>;

/**
 * __useDeleteMemoAtNoteMutation__
 *
 * To run a mutation, you first call `useDeleteMemoAtNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemoAtNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemoAtNoteMutation, { data, loading, error }] = useDeleteMemoAtNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useDeleteMemoAtNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMemoAtNoteMutation, DeleteMemoAtNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMemoAtNoteMutation, DeleteMemoAtNoteMutationVariables>(DeleteMemoAtNoteDocument, options);
      }
export type DeleteMemoAtNoteMutationHookResult = ReturnType<typeof useDeleteMemoAtNoteMutation>;
export type DeleteMemoAtNoteMutationResult = Apollo.MutationResult<DeleteMemoAtNoteMutation>;
export type DeleteMemoAtNoteMutationOptions = Apollo.BaseMutationOptions<DeleteMemoAtNoteMutation, DeleteMemoAtNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation deleteNote($id: ID!) {
  deleteNote(id: $id) {
    id
  }
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
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
    `;
export type EditRoundMutationFn = Apollo.MutationFunction<EditRoundMutation, EditRoundMutationVariables>;

/**
 * __useEditRoundMutation__
 *
 * To run a mutation, you first call `useEditRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRoundMutation, { data, loading, error }] = useEditRoundMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditRoundMutation(baseOptions?: Apollo.MutationHookOptions<EditRoundMutation, EditRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRoundMutation, EditRoundMutationVariables>(EditRoundDocument, options);
      }
export type EditRoundMutationHookResult = ReturnType<typeof useEditRoundMutation>;
export type EditRoundMutationResult = Apollo.MutationResult<EditRoundMutation>;
export type EditRoundMutationOptions = Apollo.BaseMutationOptions<EditRoundMutation, EditRoundMutationVariables>;
export const RemoveRoundDocument = gql`
    mutation removeRound($id: ID!) {
  removeRound(id: $id) {
    id
  }
}
    `;
export type RemoveRoundMutationFn = Apollo.MutationFunction<RemoveRoundMutation, RemoveRoundMutationVariables>;

/**
 * __useRemoveRoundMutation__
 *
 * To run a mutation, you first call `useRemoveRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRoundMutation, { data, loading, error }] = useRemoveRoundMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveRoundMutation(baseOptions?: Apollo.MutationHookOptions<RemoveRoundMutation, RemoveRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveRoundMutation, RemoveRoundMutationVariables>(RemoveRoundDocument, options);
      }
export type RemoveRoundMutationHookResult = ReturnType<typeof useRemoveRoundMutation>;
export type RemoveRoundMutationResult = Apollo.MutationResult<RemoveRoundMutation>;
export type RemoveRoundMutationOptions = Apollo.BaseMutationOptions<RemoveRoundMutation, RemoveRoundMutationVariables>;
export const RemoveTrainingDocument = gql`
    mutation removeTraining($id: ID!) {
  removeTraining(id: $id) {
    id
  }
}
    `;
export type RemoveTrainingMutationFn = Apollo.MutationFunction<RemoveTrainingMutation, RemoveTrainingMutationVariables>;

/**
 * __useRemoveTrainingMutation__
 *
 * To run a mutation, you first call `useRemoveTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTrainingMutation, { data, loading, error }] = useRemoveTrainingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTrainingMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTrainingMutation, RemoveTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTrainingMutation, RemoveTrainingMutationVariables>(RemoveTrainingDocument, options);
      }
export type RemoveTrainingMutationHookResult = ReturnType<typeof useRemoveTrainingMutation>;
export type RemoveTrainingMutationResult = Apollo.MutationResult<RemoveTrainingMutation>;
export type RemoveTrainingMutationOptions = Apollo.BaseMutationOptions<RemoveTrainingMutation, RemoveTrainingMutationVariables>;
export const RenameExerciseDocument = gql`
    mutation renameExercise($id: ID!, $name: String!) {
  renameExercise(id: $id, name: $name) {
    id
  }
}
    `;
export type RenameExerciseMutationFn = Apollo.MutationFunction<RenameExerciseMutation, RenameExerciseMutationVariables>;

/**
 * __useRenameExerciseMutation__
 *
 * To run a mutation, you first call `useRenameExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameExerciseMutation, { data, loading, error }] = useRenameExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameExerciseMutation(baseOptions?: Apollo.MutationHookOptions<RenameExerciseMutation, RenameExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameExerciseMutation, RenameExerciseMutationVariables>(RenameExerciseDocument, options);
      }
export type RenameExerciseMutationHookResult = ReturnType<typeof useRenameExerciseMutation>;
export type RenameExerciseMutationResult = Apollo.MutationResult<RenameExerciseMutation>;
export type RenameExerciseMutationOptions = Apollo.BaseMutationOptions<RenameExerciseMutation, RenameExerciseMutationVariables>;
export const UpsertMemoAtNoteDocument = gql`
    mutation upsertMemoAtNote($id: ID!, $memo: String!, $index: Int) {
  upsertMemoAtNote(id: $id, memo: $memo, index: $index) {
    id
    memos
  }
}
    `;
export type UpsertMemoAtNoteMutationFn = Apollo.MutationFunction<UpsertMemoAtNoteMutation, UpsertMemoAtNoteMutationVariables>;

/**
 * __useUpsertMemoAtNoteMutation__
 *
 * To run a mutation, you first call `useUpsertMemoAtNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertMemoAtNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertMemoAtNoteMutation, { data, loading, error }] = useUpsertMemoAtNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      memo: // value for 'memo'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useUpsertMemoAtNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpsertMemoAtNoteMutation, UpsertMemoAtNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertMemoAtNoteMutation, UpsertMemoAtNoteMutationVariables>(UpsertMemoAtNoteDocument, options);
      }
export type UpsertMemoAtNoteMutationHookResult = ReturnType<typeof useUpsertMemoAtNoteMutation>;
export type UpsertMemoAtNoteMutationResult = Apollo.MutationResult<UpsertMemoAtNoteMutation>;
export type UpsertMemoAtNoteMutationOptions = Apollo.BaseMutationOptions<UpsertMemoAtNoteMutation, UpsertMemoAtNoteMutationVariables>;
export const GetAllExercisesMaxDocument = gql`
    query getAllExercisesMax {
  exercises {
    id
    name
    updatedAt
  }
}
    `;

/**
 * __useGetAllExercisesMaxQuery__
 *
 * To run a query within a React component, call `useGetAllExercisesMaxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExercisesMaxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExercisesMaxQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExercisesMaxQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>(GetAllExercisesMaxDocument, options);
      }
export function useGetAllExercisesMaxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>(GetAllExercisesMaxDocument, options);
        }
export type GetAllExercisesMaxQueryHookResult = ReturnType<typeof useGetAllExercisesMaxQuery>;
export type GetAllExercisesMaxLazyQueryHookResult = ReturnType<typeof useGetAllExercisesMaxLazyQuery>;
export type GetAllExercisesMaxQueryResult = Apollo.QueryResult<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>;
export const GetAllPartsNameDocument = gql`
    query getAllPartsName {
  parts {
    id
    name
  }
}
    `;

/**
 * __useGetAllPartsNameQuery__
 *
 * To run a query within a React component, call `useGetAllPartsNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPartsNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPartsNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPartsNameQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>(GetAllPartsNameDocument, options);
      }
export function useGetAllPartsNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>(GetAllPartsNameDocument, options);
        }
export type GetAllPartsNameQueryHookResult = ReturnType<typeof useGetAllPartsNameQuery>;
export type GetAllPartsNameLazyQueryHookResult = ReturnType<typeof useGetAllPartsNameLazyQuery>;
export type GetAllPartsNameQueryResult = Apollo.QueryResult<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>;
export const GetExerciseDocument = gql`
    query getExercise($id: ID!) {
  exercise(id: $id) {
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
  }
}
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetExerciseQuery__
 *
 * To run a query within a React component, call `useGetExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExerciseQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, options);
      }
export function useGetExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, options);
        }
export type GetExerciseQueryHookResult = ReturnType<typeof useGetExerciseQuery>;
export type GetExerciseLazyQueryHookResult = ReturnType<typeof useGetExerciseLazyQuery>;
export type GetExerciseQueryResult = Apollo.QueryResult<GetExerciseQuery, GetExerciseQueryVariables>;
export const GetExerciseMaxByPartsDocument = gql`
    query getExerciseMaxByParts($partId: ID!) {
  part(id: $partId) {
    exercises {
      name
    }
  }
}
    `;

/**
 * __useGetExerciseMaxByPartsQuery__
 *
 * To run a query within a React component, call `useGetExerciseMaxByPartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseMaxByPartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseMaxByPartsQuery({
 *   variables: {
 *      partId: // value for 'partId'
 *   },
 * });
 */
export function useGetExerciseMaxByPartsQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>(GetExerciseMaxByPartsDocument, options);
      }
export function useGetExerciseMaxByPartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>(GetExerciseMaxByPartsDocument, options);
        }
export type GetExerciseMaxByPartsQueryHookResult = ReturnType<typeof useGetExerciseMaxByPartsQuery>;
export type GetExerciseMaxByPartsLazyQueryHookResult = ReturnType<typeof useGetExerciseMaxByPartsLazyQuery>;
export type GetExerciseMaxByPartsQueryResult = Apollo.QueryResult<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>;
export const GetExerciseNameByDateDocument = gql`
    query getExerciseNameByDate($date: DateTime!) {
  exerciseByDate(date: $date) {
    id
    name
  }
}
    `;

/**
 * __useGetExerciseNameByDateQuery__
 *
 * To run a query within a React component, call `useGetExerciseNameByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseNameByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseNameByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetExerciseNameByDateQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseNameByDateQuery, GetExerciseNameByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseNameByDateQuery, GetExerciseNameByDateQueryVariables>(GetExerciseNameByDateDocument, options);
      }
export function useGetExerciseNameByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseNameByDateQuery, GetExerciseNameByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseNameByDateQuery, GetExerciseNameByDateQueryVariables>(GetExerciseNameByDateDocument, options);
        }
export type GetExerciseNameByDateQueryHookResult = ReturnType<typeof useGetExerciseNameByDateQuery>;
export type GetExerciseNameByDateLazyQueryHookResult = ReturnType<typeof useGetExerciseNameByDateLazyQuery>;
export type GetExerciseNameByDateQueryResult = Apollo.QueryResult<GetExerciseNameByDateQuery, GetExerciseNameByDateQueryVariables>;
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
    `;

/**
 * __useGetExerciseNamesByPartQuery__
 *
 * To run a query within a React component, call `useGetExerciseNamesByPartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseNamesByPartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseNamesByPartQuery({
 *   variables: {
 *      partIds: // value for 'partIds'
 *   },
 * });
 */
export function useGetExerciseNamesByPartQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>(GetExerciseNamesByPartDocument, options);
      }
export function useGetExerciseNamesByPartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>(GetExerciseNamesByPartDocument, options);
        }
export type GetExerciseNamesByPartQueryHookResult = ReturnType<typeof useGetExerciseNamesByPartQuery>;
export type GetExerciseNamesByPartLazyQueryHookResult = ReturnType<typeof useGetExerciseNamesByPartLazyQuery>;
export type GetExerciseNamesByPartQueryResult = Apollo.QueryResult<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>;
export const GetMaxTotalLoadDocument = gql`
    query getMaxTotalLoad($exerciseId: ID!) {
  maxTotalLoad(exerciseId: $exerciseId) {
    maxTotalLoad
    createdAt
  }
}
    `;

/**
 * __useGetMaxTotalLoadQuery__
 *
 * To run a query within a React component, call `useGetMaxTotalLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaxTotalLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaxTotalLoadQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useGetMaxTotalLoadQuery(baseOptions: Apollo.QueryHookOptions<GetMaxTotalLoadQuery, GetMaxTotalLoadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaxTotalLoadQuery, GetMaxTotalLoadQueryVariables>(GetMaxTotalLoadDocument, options);
      }
export function useGetMaxTotalLoadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaxTotalLoadQuery, GetMaxTotalLoadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaxTotalLoadQuery, GetMaxTotalLoadQueryVariables>(GetMaxTotalLoadDocument, options);
        }
export type GetMaxTotalLoadQueryHookResult = ReturnType<typeof useGetMaxTotalLoadQuery>;
export type GetMaxTotalLoadLazyQueryHookResult = ReturnType<typeof useGetMaxTotalLoadLazyQuery>;
export type GetMaxTotalLoadQueryResult = Apollo.QueryResult<GetMaxTotalLoadQuery, GetMaxTotalLoadQueryVariables>;
export const GetMaxWeightDocument = gql`
    query getMaxWeight($exerciseId: ID!) {
  maxWeight(exerciseId: $exerciseId) {
    maxWeight
    createdAt
  }
}
    `;

/**
 * __useGetMaxWeightQuery__
 *
 * To run a query within a React component, call `useGetMaxWeightQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaxWeightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaxWeightQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useGetMaxWeightQuery(baseOptions: Apollo.QueryHookOptions<GetMaxWeightQuery, GetMaxWeightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaxWeightQuery, GetMaxWeightQueryVariables>(GetMaxWeightDocument, options);
      }
export function useGetMaxWeightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaxWeightQuery, GetMaxWeightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaxWeightQuery, GetMaxWeightQueryVariables>(GetMaxWeightDocument, options);
        }
export type GetMaxWeightQueryHookResult = ReturnType<typeof useGetMaxWeightQuery>;
export type GetMaxWeightLazyQueryHookResult = ReturnType<typeof useGetMaxWeightLazyQuery>;
export type GetMaxWeightQueryResult = Apollo.QueryResult<GetMaxWeightQuery, GetMaxWeightQueryVariables>;
export const GetMemosByExercisesDocument = gql`
    query getMemosByExercises($id: ID!) {
  memos(id: $id) {
    id
    content
    createdAt
  }
}
    `;

/**
 * __useGetMemosByExercisesQuery__
 *
 * To run a query within a React component, call `useGetMemosByExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemosByExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemosByExercisesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMemosByExercisesQuery(baseOptions: Apollo.QueryHookOptions<GetMemosByExercisesQuery, GetMemosByExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemosByExercisesQuery, GetMemosByExercisesQueryVariables>(GetMemosByExercisesDocument, options);
      }
export function useGetMemosByExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemosByExercisesQuery, GetMemosByExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemosByExercisesQuery, GetMemosByExercisesQueryVariables>(GetMemosByExercisesDocument, options);
        }
export type GetMemosByExercisesQueryHookResult = ReturnType<typeof useGetMemosByExercisesQuery>;
export type GetMemosByExercisesLazyQueryHookResult = ReturnType<typeof useGetMemosByExercisesLazyQuery>;
export type GetMemosByExercisesQueryResult = Apollo.QueryResult<GetMemosByExercisesQuery, GetMemosByExercisesQueryVariables>;
export const GetNoteDocument = gql`
    query getNote($date: DateTime!) {
  note(date: $date) {
    id
    trainings {
      createdAt
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
      totalLoad
    }
    createdAt
  }
}
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetNoteQuery__
 *
 * To run a query within a React component, call `useGetNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetNoteQuery(baseOptions: Apollo.QueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, options);
      }
export function useGetNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteQuery, GetNoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument, options);
        }
export type GetNoteQueryHookResult = ReturnType<typeof useGetNoteQuery>;
export type GetNoteLazyQueryHookResult = ReturnType<typeof useGetNoteLazyQuery>;
export type GetNoteQueryResult = Apollo.QueryResult<GetNoteQuery, GetNoteQueryVariables>;
export const GetNoteByIdDocument = gql`
    query getNoteById($id: ID!) {
  noteById(id: $id) {
    id
    trainings {
      id
      createdAt
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
    createdAt
  }
}
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetNoteByIdQuery__
 *
 * To run a query within a React component, call `useGetNoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
      }
export function useGetNoteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
        }
export type GetNoteByIdQueryHookResult = ReturnType<typeof useGetNoteByIdQuery>;
export type GetNoteByIdLazyQueryHookResult = ReturnType<typeof useGetNoteByIdLazyQuery>;
export type GetNoteByIdQueryResult = Apollo.QueryResult<GetNoteByIdQuery, GetNoteByIdQueryVariables>;
export const GetNoteMemoDocument = gql`
    query getNoteMemo($id: ID!) {
  noteById(id: $id) {
    memos
  }
}
    `;

/**
 * __useGetNoteMemoQuery__
 *
 * To run a query within a React component, call `useGetNoteMemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteMemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteMemoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteMemoQuery(baseOptions: Apollo.QueryHookOptions<GetNoteMemoQuery, GetNoteMemoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteMemoQuery, GetNoteMemoQueryVariables>(GetNoteMemoDocument, options);
      }
export function useGetNoteMemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteMemoQuery, GetNoteMemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteMemoQuery, GetNoteMemoQueryVariables>(GetNoteMemoDocument, options);
        }
export type GetNoteMemoQueryHookResult = ReturnType<typeof useGetNoteMemoQuery>;
export type GetNoteMemoLazyQueryHookResult = ReturnType<typeof useGetNoteMemoLazyQuery>;
export type GetNoteMemoQueryResult = Apollo.QueryResult<GetNoteMemoQuery, GetNoteMemoQueryVariables>;
export const GetNotesDocument = gql`
    query getNotes($since: DateTime, $until: DateTime) {
  notes(since: $since, until: $until) {
    date
    trainings {
      createdAt
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
    createdAt
  }
}
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      since: // value for 'since'
 *      until: // value for 'until'
 *   },
 * });
 */
export function useGetNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
      }
export function useGetNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
        }
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>;
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>;
export type GetNotesQueryResult = Apollo.QueryResult<GetNotesQuery, GetNotesQueryVariables>;
export const GetPinnedMemosByExercisesDocument = gql`
    query getPinnedMemosByExercises($id: ID!) {
  pinnedMemos(id: $id) {
    id
    content
    createdAt
  }
}
    `;

/**
 * __useGetPinnedMemosByExercisesQuery__
 *
 * To run a query within a React component, call `useGetPinnedMemosByExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPinnedMemosByExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPinnedMemosByExercisesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPinnedMemosByExercisesQuery(baseOptions: Apollo.QueryHookOptions<GetPinnedMemosByExercisesQuery, GetPinnedMemosByExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPinnedMemosByExercisesQuery, GetPinnedMemosByExercisesQueryVariables>(GetPinnedMemosByExercisesDocument, options);
      }
export function useGetPinnedMemosByExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPinnedMemosByExercisesQuery, GetPinnedMemosByExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPinnedMemosByExercisesQuery, GetPinnedMemosByExercisesQueryVariables>(GetPinnedMemosByExercisesDocument, options);
        }
export type GetPinnedMemosByExercisesQueryHookResult = ReturnType<typeof useGetPinnedMemosByExercisesQuery>;
export type GetPinnedMemosByExercisesLazyQueryHookResult = ReturnType<typeof useGetPinnedMemosByExercisesLazyQuery>;
export type GetPinnedMemosByExercisesQueryResult = Apollo.QueryResult<GetPinnedMemosByExercisesQuery, GetPinnedMemosByExercisesQueryVariables>;
export const GetPreviousTrainingsDocument = gql`
    query getPreviousTrainings($id: ID!, $limit: Int!) {
  previousTrainings(id: $id, limit: $limit) {
    id
    rounds {
      ...roundSets
    }
    note {
      date
    }
  }
}
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetPreviousTrainingsQuery__
 *
 * To run a query within a React component, call `useGetPreviousTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreviousTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreviousTrainingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPreviousTrainingsQuery(baseOptions: Apollo.QueryHookOptions<GetPreviousTrainingsQuery, GetPreviousTrainingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreviousTrainingsQuery, GetPreviousTrainingsQueryVariables>(GetPreviousTrainingsDocument, options);
      }
export function useGetPreviousTrainingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreviousTrainingsQuery, GetPreviousTrainingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreviousTrainingsQuery, GetPreviousTrainingsQueryVariables>(GetPreviousTrainingsDocument, options);
        }
export type GetPreviousTrainingsQueryHookResult = ReturnType<typeof useGetPreviousTrainingsQuery>;
export type GetPreviousTrainingsLazyQueryHookResult = ReturnType<typeof useGetPreviousTrainingsLazyQuery>;
export type GetPreviousTrainingsQueryResult = Apollo.QueryResult<GetPreviousTrainingsQuery, GetPreviousTrainingsQueryVariables>;
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
    ${RoundSetsFragmentDoc}`;

/**
 * __useGetRoundByTrainingQuery__
 *
 * To run a query within a React component, call `useGetRoundByTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoundByTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoundByTrainingQuery({
 *   variables: {
 *      trainingId: // value for 'trainingId'
 *   },
 * });
 */
export function useGetRoundByTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>(GetRoundByTrainingDocument, options);
      }
export function useGetRoundByTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>(GetRoundByTrainingDocument, options);
        }
export type GetRoundByTrainingQueryHookResult = ReturnType<typeof useGetRoundByTrainingQuery>;
export type GetRoundByTrainingLazyQueryHookResult = ReturnType<typeof useGetRoundByTrainingLazyQuery>;
export type GetRoundByTrainingQueryResult = Apollo.QueryResult<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>;
export const GetTrainingStatDocument = gql`
    query getTrainingStat($exerciseId: ID!, $limit: Int!) {
  trainingsStat(exerciseId: $exerciseId, limit: $limit) {
    id
    createdAt
    rounds {
      weight
      repetition
      interval
      unit
    }
    note {
      date
    }
    totalLoad
  }
}
    `;

/**
 * __useGetTrainingStatQuery__
 *
 * To run a query within a React component, call `useGetTrainingStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrainingStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrainingStatQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTrainingStatQuery(baseOptions: Apollo.QueryHookOptions<GetTrainingStatQuery, GetTrainingStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrainingStatQuery, GetTrainingStatQueryVariables>(GetTrainingStatDocument, options);
      }
export function useGetTrainingStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrainingStatQuery, GetTrainingStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrainingStatQuery, GetTrainingStatQueryVariables>(GetTrainingStatDocument, options);
        }
export type GetTrainingStatQueryHookResult = ReturnType<typeof useGetTrainingStatQuery>;
export type GetTrainingStatLazyQueryHookResult = ReturnType<typeof useGetTrainingStatLazyQuery>;
export type GetTrainingStatQueryResult = Apollo.QueryResult<GetTrainingStatQuery, GetTrainingStatQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    name
    gender
    height
    weight
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;