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
  id: Scalars['ID'];
  maxTotalLoad?: Maybe<Scalars['Int']>;
  maxWeight?: Maybe<Scalars['Int']>;
  memos?: Maybe<Array<Maybe<Memo>>>;
  movieUrl?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  parts?: Maybe<Array<Part>>;
  trainings?: Maybe<Array<Training>>;
  user: User;
};

export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];
export type Memo = {
  __typename?: 'Memo';
  content: Scalars['String'];
  exercise: Exercise;
  id: Scalars['ID'];
  round: Round;
};

export type Note = {
  __typename?: 'Note';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  parts?: Maybe<Array<Part>>;
  place: Place;
  trainings: Array<Training>;
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
  weight: Scalars['Int'];
};

export type Training = {
  __typename?: 'Training';
  createdAt: Scalars['Date'];
  exercise: Exercise;
  id: Scalars['ID'];
  memo?: Maybe<Scalars['String']>;
  note: Note;
  rounds: Array<Round>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  exercises?: Maybe<Array<Exercise>>;
  gender?: Maybe<Gender>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  password: Scalars['String'];
  places?: Maybe<Array<Place>>;
  updatedAt: Scalars['Date'];
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxTotalLoad?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxWeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  memos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Memo']>>>, ParentType, ContextType>;
  movieUrl?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType>;
  trainings?: Resolver<Maybe<Array<ResolversTypes['Training']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Memo'] = ResolversParentTypes['Memo']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType>;
  place?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  trainings?: Resolver<Array<ResolversTypes['Training']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Part'] = ResolversParentTypes['Part']> = {
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  exercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType, RequireFields<QueryExerciseArgs, 'id'>>;
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType, Partial<QueryExercisesArgs>>;
  note?: Resolver<Maybe<ResolversTypes['Note']>, ParentType, ContextType, RequireFields<QueryNoteArgs, 'date'>>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType, RequireFields<QueryNotesArgs, 'orderBy'>>;
  part?: Resolver<Maybe<ResolversTypes['Part']>, ParentType, ContextType, RequireFields<QueryPartArgs, 'id'>>;
  parts?: Resolver<Maybe<Array<ResolversTypes['Part']>>, ParentType, ContextType, Partial<QueryPartsArgs>>;
  place?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<QueryPlaceArgs, 'id'>>;
  places?: Resolver<Maybe<Array<ResolversTypes['Place']>>, ParentType, ContextType, Partial<QueryPlacesArgs>>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryRoundArgs, 'id'>>;
  rounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Round']>>>, ParentType, ContextType, Partial<QueryRoundsArgs>>;
  training?: Resolver<ResolversTypes['Training'], ParentType, ContextType, RequireFields<QueryTrainingArgs, 'id'>>;
  trainings?: Resolver<Maybe<Array<ResolversTypes['Training']>>, ParentType, ContextType, Partial<QueryTrainingsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['Memo']>, ParentType, ContextType>;
  repetition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  setCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  training?: Resolver<ResolversTypes['Training'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrainingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Training'] = ResolversParentTypes['Training']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  exercise?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['Note'], ParentType, ContextType>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<Array<ResolversTypes['Note']>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  places?: Resolver<Maybe<Array<ResolversTypes['Place']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
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

