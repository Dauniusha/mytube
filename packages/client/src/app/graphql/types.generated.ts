import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** Scalar type for void return value */
  Void: any;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  lastSignIn: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  refresh: AuthResult;
  signIn: AuthResult;
  signOut?: Maybe<SignOut>;
  signUp: AuthResult;
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  signUpData: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAuthUser: AuthUser;
};

export type SignOut = {
  __typename?: 'SignOut';
  data?: Maybe<Scalars['Void']>;
};

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut?: { __typename?: 'SignOut', data?: any | null } | null };

export type SignUpMutationVariables = Exact<{
  signUpData: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export const RefreshDocument = gql`
    mutation refresh($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshGQL extends Apollo.Mutation<RefreshMutation, RefreshMutationVariables> {
    override document = RefreshDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
    override document = SignInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignOutDocument = gql`
    mutation signOut {
  signOut {
    data
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignOutGQL extends Apollo.Mutation<SignOutMutation, SignOutMutationVariables> {
    override document = SignOutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignUpDocument = gql`
    mutation signUp($signUpData: CreateUserInput!) {
  signUp(signUpData: $signUpData) {
    accessToken
    refreshToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
    override document = SignUpDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }