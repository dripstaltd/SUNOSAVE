import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

type ResolverContext = {
  req: express.Request;
  userId?: string;
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
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');
      if (context.userId !== userId) throw new Error('Not authorized');

      return prisma.prompt.findMany({
        where: { userId },
        include: { user: true }
      });
    },
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
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');
      if (context.userId !== userId) throw new Error('Not authorized');

      return prisma.lyrics.findMany({
        where: { userId },
        include: { user: true, prompts: true }
      });
    }
  },
  Mutation: {
    createPrompt: (
      _: unknown,
      {
        genre,
        prompt,
        userId
      }: { genre: string; prompt: string; userId: string },
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');
      if (context.userId !== userId) throw new Error('Not authorized');

      return prisma.prompt.create({
        data: { genre, prompt, userId },
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
    createLyrics: async (
      _: unknown,
      { userId, lyrics }: { userId: string; lyrics: string },
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');
      if (context.userId !== userId) throw new Error('Not authorized');

      // First, find or create user
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: 'placeholder@email.com', // You might want to get this from Firebase auth
          name: 'New User'
        }
      });

      return prisma.lyrics.create({
        data: {
          userId: user.id,
          lyrics
        },
        include: { user: true, prompts: true }
      });
    },
    updateLyrics: async (
      _: unknown,
      { id, lyrics }: { id: string; lyrics: string },
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');

      // Check if lyrics belongs to user
      const existing = await prisma.lyrics.findUnique({ where: { id } });
      if (!existing || existing.userId !== context.userId) {
        throw new Error('Not authorized');
      }

      return prisma.lyrics.update({
        where: { id },
        data: { lyrics },
        include: { user: true, prompts: true }
      });
    },
    deleteLyrics: async (
      _: unknown,
      { id }: { id: string },
      context: ResolverContext
    ) => {
      if (!context.userId) throw new Error('Not authenticated');

      // Check if lyrics belongs to user
      const existing = await prisma.lyrics.findUnique({ where: { id } });
      if (!existing || existing.userId !== context.userId) {
        throw new Error('Not authorized');
      }

      return prisma.lyrics.delete({
        where: { id },
        include: { user: true, prompts: true }
      });
    },
    upsertUser: async (
      _: unknown,
      { id, email, name }: { id: string; email: string; name?: string }
    ) => {
      return prisma.user.upsert({
        where: { id },
        update: {
          email,
          name
        },
        create: {
          id,
          email,
          name
        }
      });
    }
  }
};
