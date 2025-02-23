import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

type ResolverContext = {
  req: express.Request;
};

export const resolvers = {
  Query: {
    getPrompts: (_: unknown, __: unknown, ___: ResolverContext) =>
      prisma.prompt.findMany({
        include: { user: true }
      }),
    getPromptByID: (_: unknown, { id }: { id: string }, __: ResolverContext) =>
      prisma.prompt.findUnique({
        where: { id },
        include: { user: true }
      }),
    getPromptsByUser: (
      _: unknown,
      { userId }: { userId: string },
      __: ResolverContext
    ) =>
      prisma.prompt.findMany({
        where: { userId },
        include: { user: true }
      }),
    getLyrics: (_: unknown, __: unknown, ___: ResolverContext) =>
      prisma.lyrics.findMany({
        include: { user: true, prompts: true }
      }),
    getLyricsByID: (_: unknown, { id }: { id: string }, __: ResolverContext) =>
      prisma.lyrics.findUnique({
        where: { id },
        include: { user: true, prompts: true }
      }),
    getLyricsByUser: (
      _: unknown,
      { userId }: { userId: string },
      __: ResolverContext
    ) =>
      prisma.lyrics.findMany({
        where: { userId },
        include: { user: true, prompts: true }
      })
  },
  Mutation: {
    createPrompt: (
      _: unknown,
      {
        genre,
        prompt,
        userId
      }: { genre: string; prompt: string; userId: string },
      __: ResolverContext
    ) => {
      return prisma.prompt.create({
        data: {
          genre,
          prompt,
          userId
        },
        include: { user: true }
      });
    },
    updatePrompt: (
      _: unknown,
      { id, genre, prompt }: { id: string; genre?: string; prompt?: string },
      __: ResolverContext
    ) => {
      return prisma.prompt.update({
        where: { id },
        data: {
          ...(genre && { genre }),
          ...(prompt && { prompt })
        },
        include: { user: true }
      });
    },
    deletePrompt: (_: unknown, { id }: { id: string }, __: ResolverContext) => {
      return prisma.prompt.delete({
        where: { id },
        include: { user: true }
      });
    },
    createLyrics: (
      _: unknown,
      { userId, lyrics }: { userId: string; lyrics: string },
      __: ResolverContext
    ) => {
      return prisma.lyrics.create({
        data: {
          userId,
          lyrics
        },
        include: { user: true, prompts: true }
      });
    },
    updateLyrics: (
      _: unknown,
      { id, lyrics }: { id: string; lyrics: string },
      __: ResolverContext
    ) => {
      return prisma.lyrics.update({
        where: { id },
        data: { lyrics },
        include: { user: true, prompts: true }
      });
    },
    deleteLyrics: (_: unknown, { id }: { id: string }, __: ResolverContext) => {
      return prisma.lyrics.delete({
        where: { id },
        include: { user: true, prompts: true }
      });
    }
  }
};
