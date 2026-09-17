import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const main = async () => {
    console.log("Seeding admin account...");

    const hashedPassword = await bcrypt.hash(
      "Admin123!",
      10
    );

    const admin = await prisma.user.upsert({
      where: {
        email: "admin@movieapp.com",
      },
      update: {
        role: "ADMIN",
      },
      create: {
        name: "Movie Admin",
        email: "admin@movieapp.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log(`Admin account ready: ${admin.email}`);
    console.log("Seeding completed!");
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});