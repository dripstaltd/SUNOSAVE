import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    prompts: [Prompt!]!
    createdAt: String!
    updatedAt: String!
  }

  type Prompt {
    id: ID!
    genre: String!
    prompt: String!
    userId: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    prompts: [Prompt!]!
    prompt(id: ID!): Prompt
    userPrompts(userId: ID!): [Prompt!]!
  }

  type Mutation {
    createPrompt(genre: String!, prompt: String!, userId: String!): Prompt!
    updatePrompt(id: ID!, genre: String, prompt: String): Prompt!
    deletePrompt(id: ID!): Prompt!
  }
`;
