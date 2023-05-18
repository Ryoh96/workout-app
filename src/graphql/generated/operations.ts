/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Exercise = {
  __typename?: 'Exercise';
  articleUrl?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  maxTotalLoad?: Maybe<Scalars['Float']>;
  maxWeight?: Maybe<Scalars['Float']>;
  maxWeightUnit?: Maybe<Unit>;
  memos?: Maybe<Array<Maybe<Memo>>>;
  menus?: Maybe<Array<Menu>>;
  movieUrl?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  parts?: Maybe<Array<Part>>;
  trainings?: Maybe<Array<Training>>;
  updatedAt: Scalars['Date'];
  user: User;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Memo = {
  __typename?: 'Memo';
  content: Scalars['String'];
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
  addRound?: Maybe<Round>;
  createExerciseAtNote?: Maybe<Exercise>;
};


export type MutationAddRoundArgs = {
  input?: InputMaybe<RoundInput>;
};


export type MutationCreateExerciseAtNoteArgs = {
  name: Scalars['String'];
  parts?: InputMaybe<Array<Scalars['String']>>;
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  parts?: Maybe<Array<Part>>;
  place?: Maybe<Place>;
  trainings: Array<Training>;
  user: User;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Part = {
  __typename?: 'Part';
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  exercise: Exercise;
  exercises?: Maybe<Array<Exercise>>;
  note?: Maybe<Note>;
  notes?: Maybe<Array<Note>>;
  part?: Maybe<Part>;
  parts?: Maybe<Array<Part>>;
  place?: Maybe<Place>;
  places?: Maybe<Array<Place>>;
  round?: Maybe<Round>;
  rounds?: Maybe<Array<Maybe<Round>>>;
  training: Training;
  trainings?: Maybe<Array<Training>>;
  user?: Maybe<User>;
};


export type QueryExerciseArgs = {
  id: Scalars['ID'];
};


export type QueryExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNoteArgs = {
  date: Scalars['Date'];
};


export type QueryNotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy: OrderBy;
};


export type QueryPartArgs = {
  id: Scalars['ID'];
};


export type QueryPartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRoundArgs = {
  id: Scalars['ID'];
};


export type QueryRoundsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTrainingArgs = {
  id: Scalars['ID'];
};


export type QueryTrainingsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Round = {
  __typename?: 'Round';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  interval?: Maybe<Scalars['Int']>;
  memo?: Maybe<Memo>;
  repetition: Scalars['Int'];
  setCount: Scalars['Int'];
  training: Training;
  unit: Unit;
  weight: Scalars['Float'];
};

export type RoundInput = {
  interval?: InputMaybe<Scalars['Int']>;
  isPinned?: InputMaybe<Scalars['Boolean']>;
  memo?: InputMaybe<Scalars['String']>;
  repetition: Scalars['Int'];
  setCount: Scalars['Int'];
  weight: Scalars['Int'];
};

export type Training = {
  __typename?: 'Training';
  createdAt: Scalars['Date'];
  exercise: Exercise;
  id: Scalars['ID'];
  memo?: Maybe<Scalars['String']>;
  note: Note;
  rounds?: Maybe<Array<Round>>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum Unit {
  Kg = 'KG',
  Lb = 'LB'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  exercises?: Maybe<Array<Exercise>>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  menus?: Maybe<Array<Menu>>;
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  password: Scalars['String'];
  places?: Maybe<Array<Place>>;
  updatedAt: Scalars['Date'];
  weight?: Maybe<Scalars['Float']>;
};

export type RoundSetsFragment = { __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit };

export type ExerciseFieldsFragment = { __typename?: 'Exercise', id: string, name: string, user: { __typename?: 'User', name: string }, parts?: Array<{ __typename?: 'Part', name: string }> | null };

export type AddRoundMutationVariables = Exact<{
  input?: InputMaybe<RoundInput>;
}>;


export type AddRoundMutation = { __typename?: 'Mutation', addRound?: { __typename?: 'Round', id: string, setCount: number, weight: number, repetition: number, interval?: number | null, createdAt: any, memo?: { __typename?: 'Memo', content: string, pin?: boolean | null } | null } | null };

export type CreateExerciseAtNoteMutationVariables = Exact<{
  name: Scalars['String'];
  parts?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateExerciseAtNoteMutation = { __typename?: 'Mutation', createExerciseAtNote?: { __typename?: 'Exercise', id: string, name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null } | null };

export type GetAllExercisesMaxQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExercisesMaxQuery = { __typename?: 'Query', exercises?: Array<{ __typename?: 'Exercise', id: string, name: string, maxWeight?: number | null, maxTotalLoad?: number | null, maxWeightUnit?: Unit | null, updatedAt: any }> | null };

export type GetAllPartsNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPartsNameQuery = { __typename?: 'Query', parts?: Array<{ __typename?: 'Part', name: string }> | null };

export type GetAllPlacesNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlacesNameQuery = { __typename?: 'Query', places?: Array<{ __typename?: 'Place', name: string }> | null };

export type GetExerciseQueryVariables = Exact<{
  exerciseId: Scalars['ID'];
}>;


export type GetExerciseQuery = { __typename?: 'Query', exercise: { __typename?: 'Exercise', name: string, movieUrl?: Array<string> | null, articleUrl?: Array<string> | null, maxWeight?: number | null, maxTotalLoad?: number | null, maxWeightUnit?: Unit | null, parts?: Array<{ __typename?: 'Part', name: string }> | null, trainings?: Array<{ __typename?: 'Training', createdAt: any, rounds?: Array<{ __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null }> | null, memos?: Array<{ __typename?: 'Memo', content: string, round: { __typename?: 'Round', setCount: number, createdAt: any } } | null> | null } };

export type GetExerciseMaxByPartsQueryVariables = Exact<{
  partId: Scalars['ID'];
}>;


export type GetExerciseMaxByPartsQuery = { __typename?: 'Query', part?: { __typename?: 'Part', exercises?: Array<{ __typename?: 'Exercise', name: string, maxWeight?: number | null, maxTotalLoad?: number | null, maxWeightUnit?: Unit | null }> | null } | null };

export type GetExerciseNamesByPartQueryVariables = Exact<{
  partIds: Scalars['ID'];
}>;


export type GetExerciseNamesByPartQuery = { __typename?: 'Query', part?: { __typename?: 'Part', name: string, exercises?: Array<{ __typename?: 'Exercise', name: string }> | null } | null };

export type GetNoteQueryVariables = Exact<{
  date: Scalars['Date'];
}>;


export type GetNoteQuery = { __typename?: 'Query', note?: { __typename?: 'Note', createdAt: any, trainings: Array<{ __typename?: 'Training', id: string, exercise: { __typename?: 'Exercise', name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null }, rounds?: Array<{ __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string } | null }> | null }>, place?: { __typename?: 'Place', name: string } | null } | null };

export type GetNotesByDateQueryVariables = Exact<{
  orderBy: OrderBy;
}>;


export type GetNotesByDateQuery = { __typename?: 'Query', notes?: Array<{ __typename?: 'Note', createdAt: any, trainings: Array<{ __typename?: 'Training', exercise: { __typename?: 'Exercise', name: string, parts?: Array<{ __typename?: 'Part', name: string }> | null }, rounds?: Array<{ __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null }>, place?: { __typename?: 'Place', name: string } | null }> | null };

export type GetPreviousTrainingQueryVariables = Exact<{
  exerciseID: Scalars['ID'];
}>;


export type GetPreviousTrainingQuery = { __typename?: 'Query', training: { __typename?: 'Training', rounds?: Array<{ __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit }> | null } };

export type GetRoundByTrainingQueryVariables = Exact<{
  trainingId: Scalars['ID'];
}>;


export type GetRoundByTrainingQuery = { __typename?: 'Query', training: { __typename?: 'Training', rounds?: Array<{ __typename?: 'Round', setCount: number, weight: number, repetition: number, interval?: number | null, unit: Unit, memo?: { __typename?: 'Memo', content: string } | null }> | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', name: string, gender?: Gender | null, height?: number | null, weight?: number | null } | null };

export const RoundSetsFragmentDoc = `
    fragment roundSets on Round {
  setCount
  weight
  repetition
  interval
  unit
}
    `;
export const ExerciseFieldsFragmentDoc = `
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
export const AddRoundDocument = `
    mutation addRound($input: RoundInput) {
  addRound(input: $input) {
    id
    setCount
    weight
    repetition
    interval
    memo {
      content
      pin
    }
    createdAt
  }
}
    `;
export const useAddRoundMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddRoundMutation, TError, AddRoundMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddRoundMutation, TError, AddRoundMutationVariables, TContext>(
      ['addRound'],
      (variables?: AddRoundMutationVariables) => fetcher<AddRoundMutation, AddRoundMutationVariables>(client, AddRoundDocument, variables, headers)(),
      options
    );
export const CreateExerciseAtNoteDocument = `
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
export const useCreateExerciseAtNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateExerciseAtNoteMutation, TError, CreateExerciseAtNoteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateExerciseAtNoteMutation, TError, CreateExerciseAtNoteMutationVariables, TContext>(
      ['createExerciseAtNote'],
      (variables?: CreateExerciseAtNoteMutationVariables) => fetcher<CreateExerciseAtNoteMutation, CreateExerciseAtNoteMutationVariables>(client, CreateExerciseAtNoteDocument, variables, headers)(),
      options
    );
export const GetAllExercisesMaxDocument = `
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
    `;
export const useGetAllExercisesMaxQuery = <
      TData = GetAllExercisesMaxQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllExercisesMaxQueryVariables,
      options?: UseQueryOptions<GetAllExercisesMaxQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllExercisesMaxQuery, TError, TData>(
      variables === undefined ? ['getAllExercisesMax'] : ['getAllExercisesMax', variables],
      fetcher<GetAllExercisesMaxQuery, GetAllExercisesMaxQueryVariables>(client, GetAllExercisesMaxDocument, variables, headers),
      options
    );

useGetAllExercisesMaxQuery.getKey = (variables?: GetAllExercisesMaxQueryVariables) => variables === undefined ? ['getAllExercisesMax'] : ['getAllExercisesMax', variables];
;

export const GetAllPartsNameDocument = `
    query getAllPartsName {
  parts {
    name
  }
}
    `;
export const useGetAllPartsNameQuery = <
      TData = GetAllPartsNameQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllPartsNameQueryVariables,
      options?: UseQueryOptions<GetAllPartsNameQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllPartsNameQuery, TError, TData>(
      variables === undefined ? ['getAllPartsName'] : ['getAllPartsName', variables],
      fetcher<GetAllPartsNameQuery, GetAllPartsNameQueryVariables>(client, GetAllPartsNameDocument, variables, headers),
      options
    );

useGetAllPartsNameQuery.getKey = (variables?: GetAllPartsNameQueryVariables) => variables === undefined ? ['getAllPartsName'] : ['getAllPartsName', variables];
;

export const GetAllPlacesNameDocument = `
    query getAllPlacesName {
  places {
    name
  }
}
    `;
export const useGetAllPlacesNameQuery = <
      TData = GetAllPlacesNameQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllPlacesNameQueryVariables,
      options?: UseQueryOptions<GetAllPlacesNameQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllPlacesNameQuery, TError, TData>(
      variables === undefined ? ['getAllPlacesName'] : ['getAllPlacesName', variables],
      fetcher<GetAllPlacesNameQuery, GetAllPlacesNameQueryVariables>(client, GetAllPlacesNameDocument, variables, headers),
      options
    );

useGetAllPlacesNameQuery.getKey = (variables?: GetAllPlacesNameQueryVariables) => variables === undefined ? ['getAllPlacesName'] : ['getAllPlacesName', variables];
;

export const GetExerciseDocument = `
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
        setCount
        createdAt
      }
    }
    maxWeight
    maxTotalLoad
    maxWeightUnit
  }
}
    ${RoundSetsFragmentDoc}`;
export const useGetExerciseQuery = <
      TData = GetExerciseQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetExerciseQueryVariables,
      options?: UseQueryOptions<GetExerciseQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetExerciseQuery, TError, TData>(
      ['getExercise', variables],
      fetcher<GetExerciseQuery, GetExerciseQueryVariables>(client, GetExerciseDocument, variables, headers),
      options
    );

useGetExerciseQuery.getKey = (variables: GetExerciseQueryVariables) => ['getExercise', variables];
;

export const GetExerciseMaxByPartsDocument = `
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
    `;
export const useGetExerciseMaxByPartsQuery = <
      TData = GetExerciseMaxByPartsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetExerciseMaxByPartsQueryVariables,
      options?: UseQueryOptions<GetExerciseMaxByPartsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetExerciseMaxByPartsQuery, TError, TData>(
      ['getExerciseMaxByParts', variables],
      fetcher<GetExerciseMaxByPartsQuery, GetExerciseMaxByPartsQueryVariables>(client, GetExerciseMaxByPartsDocument, variables, headers),
      options
    );

useGetExerciseMaxByPartsQuery.getKey = (variables: GetExerciseMaxByPartsQueryVariables) => ['getExerciseMaxByParts', variables];
;

export const GetExerciseNamesByPartDocument = `
    query getExerciseNamesByPart($partIds: ID!) {
  part(id: $partIds) {
    name
    exercises {
      name
    }
  }
}
    `;
export const useGetExerciseNamesByPartQuery = <
      TData = GetExerciseNamesByPartQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetExerciseNamesByPartQueryVariables,
      options?: UseQueryOptions<GetExerciseNamesByPartQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetExerciseNamesByPartQuery, TError, TData>(
      ['getExerciseNamesByPart', variables],
      fetcher<GetExerciseNamesByPartQuery, GetExerciseNamesByPartQueryVariables>(client, GetExerciseNamesByPartDocument, variables, headers),
      options
    );

useGetExerciseNamesByPartQuery.getKey = (variables: GetExerciseNamesByPartQueryVariables) => ['getExerciseNamesByPart', variables];
;

export const GetNoteDocument = `
    query getNote($date: Date!) {
  note(date: $date) {
    trainings {
      id
      exercise {
        name
        parts {
          name
        }
      }
      rounds {
        ...roundSets
        memo {
          content
        }
      }
    }
    place {
      name
    }
    createdAt
  }
}
    ${RoundSetsFragmentDoc}`;
export const useGetNoteQuery = <
      TData = GetNoteQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetNoteQueryVariables,
      options?: UseQueryOptions<GetNoteQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetNoteQuery, TError, TData>(
      ['getNote', variables],
      fetcher<GetNoteQuery, GetNoteQueryVariables>(client, GetNoteDocument, variables, headers),
      options
    );

useGetNoteQuery.getKey = (variables: GetNoteQueryVariables) => ['getNote', variables];
;

export const GetNotesByDateDocument = `
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
    ${RoundSetsFragmentDoc}`;
export const useGetNotesByDateQuery = <
      TData = GetNotesByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetNotesByDateQueryVariables,
      options?: UseQueryOptions<GetNotesByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetNotesByDateQuery, TError, TData>(
      ['getNotesByDate', variables],
      fetcher<GetNotesByDateQuery, GetNotesByDateQueryVariables>(client, GetNotesByDateDocument, variables, headers),
      options
    );

useGetNotesByDateQuery.getKey = (variables: GetNotesByDateQueryVariables) => ['getNotesByDate', variables];
;

export const GetPreviousTrainingDocument = `
    query getPreviousTraining($exerciseID: ID!) {
  training(id: $exerciseID) {
    rounds {
      ...roundSets
    }
  }
}
    ${RoundSetsFragmentDoc}`;
export const useGetPreviousTrainingQuery = <
      TData = GetPreviousTrainingQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPreviousTrainingQueryVariables,
      options?: UseQueryOptions<GetPreviousTrainingQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPreviousTrainingQuery, TError, TData>(
      ['getPreviousTraining', variables],
      fetcher<GetPreviousTrainingQuery, GetPreviousTrainingQueryVariables>(client, GetPreviousTrainingDocument, variables, headers),
      options
    );

useGetPreviousTrainingQuery.getKey = (variables: GetPreviousTrainingQueryVariables) => ['getPreviousTraining', variables];
;

export const GetRoundByTrainingDocument = `
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
export const useGetRoundByTrainingQuery = <
      TData = GetRoundByTrainingQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetRoundByTrainingQueryVariables,
      options?: UseQueryOptions<GetRoundByTrainingQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRoundByTrainingQuery, TError, TData>(
      ['getRoundByTraining', variables],
      fetcher<GetRoundByTrainingQuery, GetRoundByTrainingQueryVariables>(client, GetRoundByTrainingDocument, variables, headers),
      options
    );

useGetRoundByTrainingQuery.getKey = (variables: GetRoundByTrainingQueryVariables) => ['getRoundByTraining', variables];
;

export const GetUserDocument = `
    query getUser {
  user {
    name
    gender
    height
    weight
  }
}
    `;
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      variables === undefined ? ['getUser'] : ['getUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
      options
    );

useGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['getUser'] : ['getUser', variables];
;
