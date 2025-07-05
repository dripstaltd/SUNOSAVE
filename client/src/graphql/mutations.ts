import { gql } from "@apollo/client";

export const CREATE_LYRICS = gql`
  mutation CreateLyrics($userId: String!, $lyrics: String!) {
    createLyrics(userId: $userId, lyrics: $lyrics) {
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

export const CREATE_PROMPT = gql`
  mutation CreatePrompt($userId: String!, $genre: String!, $prompt: String!) {
    createPrompt(userId: $userId, genre: $genre, prompt: $prompt) {
      id
      genre
      prompt
      userId
    }
  }
`;