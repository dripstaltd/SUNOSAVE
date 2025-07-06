import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    user: {
      upsert: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

import { resolvers } from "../resolvers";
const prisma = new PrismaClient() as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Mutation.upsertUser", () => {
  it("upserts user", async () => {
    const expected = { id: "1", email: "e", name: "n" };
    prisma.user.upsert.mockResolvedValue(expected);
    const args = { id: "1", email: "e", name: "n" };
    const result = await resolvers.Mutation.upsertUser({}, args);
    expect(prisma.user.upsert).toHaveBeenCalledWith({
      where: { id: "1" },
      update: { email: "e", name: "n" },
      create: { id: "1", email: "e", name: "n" },
    });
    expect(result).toBe(expected);
  });

  it("throws if prisma fails", async () => {
    prisma.user.upsert.mockRejectedValue(new Error("fail"));
    const args = { id: "1", email: "e", name: "n" };
    await expect(resolvers.Mutation.upsertUser({}, args)).rejects.toThrow(
      "fail",
    );
  });
});
