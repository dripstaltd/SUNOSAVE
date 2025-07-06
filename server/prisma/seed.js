import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a mock user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  // Create some mock prompts
  await prisma.prompt.createMany({
    data: [
      {
        genre: "Metal",
        prompt: "Metal song, pop vocals, heavy drums, guitar riffs",
        userId: user.id,
      },
      {
        genre: "Pop",
        prompt: "dark pop song, electronic drums, synth, pop vocals",
        userId: user.id,
      },
      {
        genre: "Metal",
        prompt: "Metalcore song about a girl who is a vampire",
        userId: user.id,
      },
    ],
  });

  // Add some mock lyrics
  await prisma.lyrics.create({
    data: {
      userId: user.id,
      lyrics:
        "Sample lyrics for a metal song...\nSecond line of lyrics\nThird line of lyrics",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
