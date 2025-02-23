import { gql } from 'graphql-tag';

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

  type Lyrics {
    id: ID!
    userId: String!
    lyrics: String!
    prompts: [Prompt!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPrompts: [Prompt!]!
    getPromptByID(id: ID!): Prompt
    getPromptsByUser(userId: ID!): [Prompt!]!
    getLyrics: [Lyrics!]!
    getLyricsByID(id: ID!): Lyrics
    getLyricsByUser(userId: ID!): [Lyrics!]!
  }

  type Mutation {
    createPrompt(genre: String!, prompt: String!, userId: String!): Prompt!
    updatePrompt(id: ID!, genre: String, prompt: String): Prompt!
    deletePrompt(id: ID!): Prompt!
    createLyrics(userId: String!, lyrics: String!): Lyrics!
    updateLyrics(id: ID!, lyrics: String!): Lyrics!
    deleteLyrics(id: ID!): Lyrics!
    upsertUser(id: String!, email: String!, name: String): User!
  }
`;
