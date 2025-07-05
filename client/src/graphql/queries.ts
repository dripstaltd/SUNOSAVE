import { gql } from '@apollo/client';

export const GET_LYRICS = gql`
  query GetLyrics {
    getLyrics {
      id
      userId
      lyrics
      createdAt
      updatedAt
      prompts {
        id
        genre
        prompt
      }
    }
  }
`;

export const GET_LYRICS_BY_USER = gql`
  query GetLyricsByUser($userId: ID!) {
    getLyricsByUser(userId: $userId) {
      id
      lyrics
      createdAt
      prompts {
        id
        genre
        prompt
      }
    }
  }
`;

export const GET_PROMPTS = gql`
  query GetPrompts {
    getPrompts {
      id
      genre
      prompt
    }
  }
`;

export const GET_PROMPT_BY_ID = gql`
  query GetPromptById($id: ID!) {
    getPromptById(id: $id) {
      id
      genre
      prompt
    }
  }
`;

export const GET_PROMPTS_BY_USER = gql`
  query GetPromptsByUser($userId: ID!) {
    getPromptsByUser(userId: $userId) {
      id
      genre
      prompt
    }
  }
`;




