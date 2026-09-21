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

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Movie Admin";

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    if (adminPassword.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters");
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    const admin = await prisma.user.upsert({
      where: {
        email: adminEmail.toLowerCase(),
      },
      update: {
        name: adminName,
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        name: adminName,
        email: adminEmail.toLowerCase(),
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