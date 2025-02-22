import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    prompts: () =>
      prisma.prompt.findMany({
        include: { user: true }
      }),
    prompt: (_, { id }) =>
      prisma.prompt.findUnique({
        where: { id },
        include: { user: true }
      }),
    userPrompts: (_, { userId }) =>
      prisma.prompt.findMany({
        where: { userId },
        include: { user: true }
      })
  },
  Mutation: {
    createPrompt: (_, { genre, prompt, userId }) => {
      return prisma.prompt.create({
        data: {
          genre,
          prompt,
          userId
        },
        include: { user: true }
      });
    },
    updatePrompt: (_, { id, genre, prompt }) => {
      return prisma.prompt.update({
        where: { id },
        data: {
          ...(genre && { genre }),
          ...(prompt && { prompt })
        },
        include: { user: true }
      });
    },
    deletePrompt: (_, { id }) => {
      return prisma.prompt.delete({
        where: { id },
        include: { user: true }
      });
    }
  }
};
