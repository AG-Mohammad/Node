import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  msg: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Scalars['String'];
  createUser?: Maybe<UserRes>;
  deletePost: Scalars['String'];
  deleteUser: Scalars['String'];
  login?: Maybe<UserRes>;
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Scalars['String']>;
  updateUser: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  options: UserInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float'];
  options: UserInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  getPost?: Maybe<Post>;
  getPosts: Array<Post>;
  getUser?: Maybe<User>;
  getUserByID?: Maybe<User>;
  getUsers: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserRes = {
  __typename?: 'userRes';
  err?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserInfoFragment = { __typename?: 'User', id: number, username: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string }> };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'userRes', err?: Maybe<Array<{ __typename?: 'FieldError', field: string, msg: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<{ __typename?: 'userRes', err?: Maybe<Array<{ __typename?: 'FieldError', field: string, msg: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: number, title: string, createdAt: string, updatedAt: string }> };

export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const LoginUserDocument = gql`
    mutation loginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    err {
      field
      msg
    }
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
  createUser(options: {username: $username, password: $password, email: $email}) {
    err {
      field
      msg
    }
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const PostsDocument = gql`
    query Posts {
  getPosts {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};