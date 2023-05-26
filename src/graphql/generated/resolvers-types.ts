/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import {
  User as UserModel,
  Exercise as ExerciseModel,
  Part as PartModel,
  Round as RoundModel,
  Note as NoteModel,
  Training as TrainingModel,
  Place as PlaceModel,
  Memo as MemoModel,
  Unit as UnitModel,
} from '@prisma/client'
import { Context } from '@/graphql/context'
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddRoundInput: AddRoundInput
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  EditRoundInput: EditRoundInput
  Exercise: ResolverTypeWrapper<ExerciseModel>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Gender: Gender
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Memo: ResolverTypeWrapper<MemoModel>
  Menu: ResolverTypeWrapper<
    Omit<Menu, 'exercises' | 'user'> & {
      exercises: Array<ResolversTypes['Exercise']>
      user: ResolversTypes['User']
    }
  >
  Mutation: ResolverTypeWrapper<{}>
  Note: ResolverTypeWrapper<NoteModel>
  OrderBy: OrderBy
  Part: ResolverTypeWrapper<PartModel>
  Place: ResolverTypeWrapper<PlaceModel>
  Query: ResolverTypeWrapper<{}>
  Round: ResolverTypeWrapper<RoundModel>
  RoundInput: RoundInput
  String: ResolverTypeWrapper<Scalars['String']>
  Training: ResolverTypeWrapper<TrainingModel>
  Unit: ResolverTypeWrapper<UnitModel>
  User: ResolverTypeWrapper<UserModel>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddRoundInput: AddRoundInput
  Boolean: Scalars['Boolean']
  DateTime: Scalars['DateTime']
  EditRoundInput: EditRoundInput
  Exercise: ExerciseModel
  Float: Scalars['Float']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Memo: MemoModel
  Menu: Omit<Menu, 'exercises' | 'user'> & {
    exercises: Array<ResolversParentTypes['Exercise']>
    user: ResolversParentTypes['User']
  }
  Mutation: {}
  Note: NoteModel
  Part: PartModel
  Place: PlaceModel
  Query: {}
  Round: RoundModel
  RoundInput: RoundInput
  String: Scalars['String']
  Training: TrainingModel
  User: UserModel
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type ExerciseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']
> = {
  articleUrl?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  maxTotalLoad?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  maxWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  maxWeightUnit?: Resolver<
    Maybe<ResolversTypes['Unit']>,
    ParentType,
    ContextType
  >
  memos?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Memo']>>>,
    ParentType,
    ContextType
  >
  menus?: Resolver<
    Maybe<Array<ResolversTypes['Menu']>>,
    ParentType,
    ContextType
  >
  movieUrl?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  parts?: Resolver<
    Maybe<Array<ResolversTypes['Part']>>,
    ParentType,
    ContextType
  >
  trainings?: Resolver<
    Maybe<Array<ResolversTypes['Training']>>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MemoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Memo'] = ResolversParentTypes['Memo']
> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  exercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  pin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MenuResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']
> = {
  exercises?: Resolver<
    Array<ResolversTypes['Exercise']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addExerciseByPart?: Resolver<
    Maybe<ResolversTypes['Exercise']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddExerciseByPartArgs, 'name' | 'partId'>
  >
  addRound?: Resolver<
    Maybe<ResolversTypes['Round']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddRoundArgs, 'input'>
  >
  createExerciseAtNote?: Resolver<
    Maybe<ResolversTypes['Exercise']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateExerciseAtNoteArgs, 'name'>
  >
  createOrGetNoteId?: Resolver<ResolversTypes['Note'], ParentType, ContextType>
  createOrUpdateTodayNote?: Resolver<
    ResolversTypes['Note'],
    ParentType,
    ContextType
  >
  createTraining?: Resolver<
    Maybe<ResolversTypes['Training']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTrainingArgs, 'exerciseId' | 'id' | 'noteId'>
  >
  editRound?: Resolver<
    Maybe<ResolversTypes['Round']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditRoundArgs, 'input'>
  >
  removeRound?: Resolver<
    Maybe<ResolversTypes['Round']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveRoundArgs, 'id'>
  >
  removeTraining?: Resolver<
    Maybe<ResolversTypes['Training']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveTrainingArgs, 'id'>
  >
}

export type NoteResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  parts?: Resolver<
    Maybe<Array<ResolversTypes['Part']>>,
    ParentType,
    ContextType
  >
  place?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType>
  trainings?: Resolver<
    Maybe<Array<ResolversTypes['Training']>>,
    ParentType,
    ContextType
  >
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PartResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Part'] = ResolversParentTypes['Part']
> = {
  exercises?: Resolver<
    Maybe<Array<ResolversTypes['Exercise']>>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PlaceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  notes?: Resolver<
    Maybe<Array<ResolversTypes['Note']>>,
    ParentType,
    ContextType
  >
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  exercise?: Resolver<
    ResolversTypes['Exercise'],
    ParentType,
    ContextType,
    RequireFields<QueryExerciseArgs, 'id'>
  >
  exerciseByDate?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Exercise']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryExerciseByDateArgs, 'date'>
  >
  exercises?: Resolver<
    Maybe<Array<ResolversTypes['Exercise']>>,
    ParentType,
    ContextType,
    Partial<QueryExercisesArgs>
  >
  note?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    ContextType,
    RequireFields<QueryNoteArgs, 'date'>
  >
  noteById?: Resolver<
    ResolversTypes['Note'],
    ParentType,
    ContextType,
    RequireFields<QueryNoteByIdArgs, 'id'>
  >
  notes?: Resolver<
    Maybe<Array<ResolversTypes['Note']>>,
    ParentType,
    ContextType,
    RequireFields<QueryNotesArgs, 'orderBy'>
  >
  part?: Resolver<
    Maybe<ResolversTypes['Part']>,
    ParentType,
    ContextType,
    RequireFields<QueryPartArgs, 'id'>
  >
  parts?: Resolver<
    Maybe<Array<ResolversTypes['Part']>>,
    ParentType,
    ContextType,
    Partial<QueryPartsArgs>
  >
  place?: Resolver<
    Maybe<ResolversTypes['Place']>,
    ParentType,
    ContextType,
    RequireFields<QueryPlaceArgs, 'id'>
  >
  places?: Resolver<
    Maybe<Array<ResolversTypes['Place']>>,
    ParentType,
    ContextType,
    Partial<QueryPlacesArgs>
  >
  round?: Resolver<
    Maybe<ResolversTypes['Round']>,
    ParentType,
    ContextType,
    RequireFields<QueryRoundArgs, 'id'>
  >
  rounds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Round']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryRoundsArgs, 'trainingId'>
  >
  training?: Resolver<
    ResolversTypes['Training'],
    ParentType,
    ContextType,
    RequireFields<QueryTrainingArgs, 'id'>
  >
  trainings?: Resolver<
    Maybe<Array<ResolversTypes['Training']>>,
    ParentType,
    ContextType,
    Partial<QueryTrainingsArgs>
  >
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type RoundResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  interval?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  memo?: Resolver<Maybe<ResolversTypes['Memo']>, ParentType, ContextType>
  repetition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  training?: Resolver<ResolversTypes['Training'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TrainingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Training'] = ResolversParentTypes['Training']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  exercise?: Resolver<
    Maybe<ResolversTypes['Exercise']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  note?: Resolver<ResolversTypes['Note'], ParentType, ContextType>
  rounds?: Resolver<
    Maybe<Array<ResolversTypes['Round']>>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UnitResolvers = EnumResolverSignature<
  { KG?: any; LB?: any },
  ResolversTypes['Unit']
>

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  exercises?: Resolver<
    Maybe<Array<ResolversTypes['Exercise']>>,
    ParentType,
    ContextType
  >
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  menus?: Resolver<
    Maybe<Array<ResolversTypes['Menu']>>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  notes?: Resolver<
    Maybe<Array<ResolversTypes['Note']>>,
    ParentType,
    ContextType
  >
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  places?: Resolver<
    Maybe<Array<ResolversTypes['Place']>>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType
  Exercise?: ExerciseResolvers<ContextType>
  Memo?: MemoResolvers<ContextType>
  Menu?: MenuResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Note?: NoteResolvers<ContextType>
  Part?: PartResolvers<ContextType>
  Place?: PlaceResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Round?: RoundResolvers<ContextType>
  Training?: TrainingResolvers<ContextType>
  Unit?: UnitResolvers
  User?: UserResolvers<ContextType>
}
