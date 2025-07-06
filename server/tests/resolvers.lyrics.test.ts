import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    lyrics: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      upsert: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

import { resolvers } from "../resolvers";
const prisma = new PrismaClient() as any;
const mockContext = (userId?: string) => ({ req: {} as any, userId });

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Query.getLyrics", () => {
  it("returns lyrics on success", async () => {
    const expected = [{ id: "1" }];
    prisma.lyrics.findMany.mockResolvedValue(expected);
    const result = await resolvers.Query.getLyrics({}, {}, mockContext());
    expect(prisma.lyrics.findMany).toHaveBeenCalledWith({
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.lyrics.findMany.mockRejectedValue(new Error("fail"));
    await expect(
      resolvers.Query.getLyrics({}, {}, mockContext()),
    ).rejects.toThrow("fail");
  });
});

describe("Query.getLyricsByID", () => {
  it("returns lyric when found", async () => {
    const expected = { id: "1" };
    prisma.lyrics.findUnique.mockResolvedValue(expected);
    const result = await resolvers.Query.getLyricsByID(
      {},
      { id: "1" },
      mockContext(),
    );
    expect(prisma.lyrics.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.lyrics.findUnique.mockRejectedValue(new Error("fail"));
    await expect(
      resolvers.Query.getLyricsByID({}, { id: "1" }, mockContext()),
    ).rejects.toThrow("fail");
  });
});

describe("Query.getLyricsByUser", () => {
  it("returns lyrics for authenticated user", async () => {
    const expected = [{ id: "1" }];
    prisma.lyrics.findMany.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const result = await resolvers.Query.getLyricsByUser(
      {},
      { userId: "user1" },
      ctx,
    );
    expect(prisma.lyrics.findMany).toHaveBeenCalledWith({
      where: { userId: "user1" },
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", () => {
    expect(() =>
      resolvers.Query.getLyricsByUser({}, { userId: "user1" }, mockContext()),
    ).toThrow("Not authenticated");
  });

  it("throws when not authorized", () => {
    const ctx = mockContext("other");
    expect(() =>
      resolvers.Query.getLyricsByUser({}, { userId: "user1" }, ctx),
    ).toThrow("Not authorized");
  });
});

describe("Mutation.createLyrics", () => {
  it("creates lyrics for authenticated user", async () => {
    prisma.user.upsert.mockResolvedValue({ id: "user1" });
    const expected = { id: "1" };
    prisma.lyrics.create.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const args = { userId: "user1", lyrics: "foo" };
    const result = await resolvers.Mutation.createLyrics({}, args, ctx);
    expect(prisma.user.upsert).toHaveBeenCalledWith({
      where: { id: "user1" },
      update: {},
      create: {
        id: "user1",
        email: expect.any(String),
        name: "New User",
      },
    });
    expect(prisma.lyrics.create).toHaveBeenCalledWith({
      data: { userId: "user1", lyrics: "foo" },
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", async () => {
    const args = { userId: "user1", lyrics: "foo" };
    await expect(
      resolvers.Mutation.createLyrics({}, args, mockContext()),
    ).rejects.toThrow("Not authenticated");
  });

  it("throws when not authorized", async () => {
    const args = { userId: "user1", lyrics: "foo" };
    const ctx = mockContext("other");
    await expect(
      resolvers.Mutation.createLyrics({}, args, ctx),
    ).rejects.toThrow("Not authorized");
  });
});

describe("Mutation.updateLyrics", () => {
  it("updates lyrics for owner", async () => {
    prisma.lyrics.findUnique.mockResolvedValue({ id: "1", userId: "user1" });
    const expected = { id: "1" };
    prisma.lyrics.update.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const args = { id: "1", lyrics: "bar" };
    const result = await resolvers.Mutation.updateLyrics({}, args, ctx);
    expect(prisma.lyrics.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(prisma.lyrics.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { lyrics: "bar" },
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", async () => {
    const args = { id: "1", lyrics: "bar" };
    await expect(
      resolvers.Mutation.updateLyrics({}, args, mockContext()),
    ).rejects.toThrow("Not authenticated");
  });

  it("throws when not authorized", async () => {
    prisma.lyrics.findUnique.mockResolvedValue({ id: "1", userId: "owner" });
    const args = { id: "1", lyrics: "bar" };
    const ctx = mockContext("user1");
    await expect(
      resolvers.Mutation.updateLyrics({}, args, ctx),
    ).rejects.toThrow("Not authorized");
  });
});

describe("Mutation.deleteLyrics", () => {
  it("deletes lyrics for owner", async () => {
    prisma.lyrics.findUnique.mockResolvedValue({ id: "1", userId: "user1" });
    const expected = { id: "1" };
    prisma.lyrics.delete.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const result = await resolvers.Mutation.deleteLyrics({}, { id: "1" }, ctx);
    expect(prisma.lyrics.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(prisma.lyrics.delete).toHaveBeenCalledWith({
      where: { id: "1" },
      include: { user: true, prompts: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", async () => {
    await expect(
      resolvers.Mutation.deleteLyrics({}, { id: "1" }, mockContext()),
    ).rejects.toThrow("Not authenticated");
  });

  it("throws when not authorized", async () => {
    prisma.lyrics.findUnique.mockResolvedValue({ id: "1", userId: "owner" });
    const ctx = mockContext("user1");
    await expect(
      resolvers.Mutation.deleteLyrics({}, { id: "1" }, ctx),
    ).rejects.toThrow("Not authorized");
  });
});
