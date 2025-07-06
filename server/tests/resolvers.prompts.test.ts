import { resolvers } from "../resolvers";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    prompt: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const mockContext = (userId?: string) => ({ req: {} as any, userId });

const prisma = new PrismaClient() as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Query.getPrompts", () => {
  it("returns prompts on success", async () => {
    const expected = [{ id: "1" }];
    prisma.prompt.findMany.mockResolvedValue(expected);
    const result = await resolvers.Query.getPrompts({}, {}, mockContext());
    expect(prisma.prompt.findMany).toHaveBeenCalledWith({
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma throws", async () => {
    prisma.prompt.findMany.mockRejectedValue(new Error("fail"));
    await expect(
      resolvers.Query.getPrompts({}, {}, mockContext()),
    ).rejects.toThrow("fail");
  });
});

describe("Query.getPromptByID", () => {
  it("returns prompt when found", async () => {
    const expected = { id: "1" };
    prisma.prompt.findUnique.mockResolvedValue(expected);
    const result = await resolvers.Query.getPromptByID(
      {},
      { id: "1" },
      mockContext(),
    );
    expect(prisma.prompt.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.prompt.findUnique.mockRejectedValue(new Error("fail"));
    await expect(
      resolvers.Query.getPromptByID({}, { id: "1" }, mockContext()),
    ).rejects.toThrow("fail");
  });
});

describe("Query.getPromptsByUser", () => {
  it("returns prompts for authenticated user", async () => {
    const expected = [{ id: "1" }];
    prisma.prompt.findMany.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const result = await resolvers.Query.getPromptsByUser(
      {},
      { userId: "user1" },
      ctx,
    );
    expect(prisma.prompt.findMany).toHaveBeenCalledWith({
      where: { userId: "user1" },
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", () => {
    expect(() =>
      resolvers.Query.getPromptsByUser({}, { userId: "user1" }, mockContext()),
    ).toThrow("Not authenticated");
  });

  it("throws when not authorized", () => {
    const ctx = mockContext("other");
    expect(() =>
      resolvers.Query.getPromptsByUser({}, { userId: "user1" }, ctx),
    ).toThrow("Not authorized");
  });
});

describe("Mutation.createPrompt", () => {
  it("creates prompt for authenticated user", async () => {
    const expected = { id: "1" };
    prisma.prompt.create.mockResolvedValue(expected);
    const ctx = mockContext("user1");
    const args = { genre: "rock", prompt: "foo", userId: "user1" };
    const result = await resolvers.Mutation.createPrompt({}, args, ctx);
    expect(prisma.prompt.create).toHaveBeenCalledWith({
      data: args,
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws when not authenticated", () => {
    const args = { genre: "rock", prompt: "foo", userId: "user1" };
    expect(() =>
      resolvers.Mutation.createPrompt({}, args, mockContext()),
    ).toThrow("Not authenticated");
  });

  it("throws when not authorized", () => {
    const args = { genre: "rock", prompt: "foo", userId: "user1" };
    const ctx = mockContext("other");
    expect(() => resolvers.Mutation.createPrompt({}, args, ctx)).toThrow(
      "Not authorized",
    );
  });
});

describe("Mutation.updatePrompt", () => {
  it("updates prompt", async () => {
    const expected = { id: "1" };
    prisma.prompt.update.mockResolvedValue(expected);
    const args = { id: "1", genre: "pop", prompt: "bar" };
    const result = await resolvers.Mutation.updatePrompt(
      {},
      args,
      mockContext(),
    );
    expect(prisma.prompt.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { genre: "pop", prompt: "bar" },
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.prompt.update.mockRejectedValue(new Error("fail"));
    const args = { id: "1", genre: "pop" };
    await expect(
      resolvers.Mutation.updatePrompt({}, args, mockContext()),
    ).rejects.toThrow("fail");
  });
});

describe("Mutation.deletePrompt", () => {
  it("deletes prompt", async () => {
    const expected = { id: "1" };
    prisma.prompt.delete.mockResolvedValue(expected);
    const result = await resolvers.Mutation.deletePrompt(
      {},
      { id: "1" },
      mockContext(),
    );
    expect(prisma.prompt.delete).toHaveBeenCalledWith({
      where: { id: "1" },
      include: { user: true },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.prompt.delete.mockRejectedValue(new Error("fail"));
    await expect(
      resolvers.Mutation.deletePrompt({}, { id: "1" }, mockContext()),
    ).rejects.toThrow("fail");
  });
});
