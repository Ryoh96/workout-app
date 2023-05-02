/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  id?: Maybe<Scalars['ID']>;
  maxTotalLoad?: Maybe<Scalars['Int']>;
  maxWeight?: Maybe<Scalars['Int']>;
  memos?: Maybe<Array<Maybe<Memo>>>;
  movieUrl?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  parts?: Maybe<Array<Part>>;
  trainings?: Maybe<Array<Training>>;
  user?: Maybe<User>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Memo = {
  __typename?: 'Memo';
  content?: Maybe<Scalars['String']>;
  exercise?: Maybe<Exercise>;
  round?: Maybe<Round>;
};

export type Note = {
  __typename?: 'Note';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  parts?: Maybe<Array<Part>>;
  place?: Maybe<Place>;
  trainings?: Maybe<Array<Training>>;
  user?: Maybe<User>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Part = {
  __typename?: 'Part';
  exercises?: Maybe<Array<Exercise>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<Note>>;
  user?: Maybe<User>;
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
  partId?: InputMaybe<Scalars['ID']>;
};


export type QueryExercisesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNoteArgs = {
  date?: InputMaybe<Scalars['Date']>;
};


export type QueryNotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy: OrderBy;
};


export type QueryPartArgs = {
  partId: Scalars['ID'];
};


export type QueryPartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPlaceArgs = {
  noteId: Scalars['ID'];
};


export type QueryPlacesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRoundArgs = {
  trainingId: Scalars['ID'];
};


export type QueryRoundsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTrainingArgs = {
  trainingId: Scalars['ID'];
};


export type QueryTrainingsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Round = {
  __typename?: 'Round';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  interval?: Maybe<Scalars['Int']>;
  memo?: Maybe<Memo>;
  repetition?: Maybe<Scalars['Int']>;
  setCount?: Maybe<Scalars['Int']>;
  training?: Maybe<Training>;
  weight?: Maybe<Scalars['Int']>;
};

export type Training = {
  __typename?: 'Training';
  createdAt?: Maybe<Scalars['Date']>;
  exercise?: Maybe<Exercise>;
  id?: Maybe<Scalars['ID']>;
  memo?: Maybe<Scalars['String']>;
  note?: Maybe<Note>;
  rounds?: Maybe<Array<Round>>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  exercises?: Maybe<Array<Exercise>>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<Note>>;
  password?: Maybe<Scalars['String']>;
  places?: Maybe<Array<Place>>;
  updatedAt?: Maybe<Scalars['Date']>;
  weight?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Exercise: ResolverTypeWrapper<Exercise>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Memo: ResolverTypeWrapper<Memo>;
  Note: ResolverTypeWrapper<Note>;
  OrderBy: OrderBy;
  Part: ResolverTypeWrapper<Part>;
  Place: ResolverTypeWrapper<Place>;
  Query: ResolverTypeWrapper<{}>;
  Round: ResolverTypeWrapper<Round>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Training: ResolverTypeWrapper<Training>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Exercise: Exercise;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Memo: Memo;
  Note: Note;
  Part: Part;
  Place: Place;
  Query: {};
  Round: Round;
  String: Scalars['String'];
  Training: Training;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ExerciseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = {
  articleUrl?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  maxTotalLoad?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxWeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  memos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Memo']>>>, ParentType, ContextType>;
  movieUrl?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType>;
  trainings?: Resolver<Maybe<Array<ResolversTypes['Training']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Memo'] = ResolversParentTypes['Memo']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType>;
  place?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType>;
  trainings?: Resolver<Maybe<Array<ResolversTypes['Training']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Part'] = ResolversParentTypes['Part']> = {
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  exercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType, Partial<QueryExerciseArgs>>;
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType, Partial<QueryExercisesArgs>>;
  note?: Resolver<Maybe<ResolversTypes['Note']>, ParentType, ContextType, Partial<QueryNoteArgs>>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType, RequireFields<QueryNotesArgs, 'orderBy'>>;
  part?: Resolver<Maybe<ResolversTypes['Part']>, ParentType, ContextType, RequireFields<QueryPartArgs, 'partId'>>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType, Partial<QueryPartsArgs>>;
  place?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<QueryPlaceArgs, 'noteId'>>;
  places?: Resolver<Maybe<Array<ResolversTypes['Place']>>, ParentType, ContextType, Partial<QueryPlacesArgs>>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryRoundArgs, 'trainingId'>>;
  rounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Round']>>>, ParentType, ContextType, Partial<QueryRoundsArgs>>;
  training?: Resolver<ResolversTypes['Training'], ParentType, ContextType, RequireFields<QueryTrainingArgs, 'trainingId'>>;
  trainings?: Resolver<Maybe<Array<ResolversTypes['Training']>>, ParentType, ContextType, Partial<QueryTrainingsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['Memo']>, ParentType, ContextType>;
  repetition?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  setCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  training?: Resolver<Maybe<ResolversTypes['Training']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrainingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Training'] = ResolversParentTypes['Training']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  exercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['Note']>, ParentType, ContextType>;
  rounds?: Resolver<Maybe<Array<ResolversTypes['Round']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  places?: Resolver<Maybe<Array<ResolversTypes['Place']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Exercise?: ExerciseResolvers<ContextType>;
  Memo?: MemoResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  Part?: PartResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  Training?: TrainingResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

