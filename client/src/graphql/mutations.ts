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