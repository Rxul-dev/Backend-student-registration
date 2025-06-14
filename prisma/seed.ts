import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      first_name: "Edgar",
      second_name: "Alberto",
      last_name: "Lopez",
      second_last_name: "Estrada",
      carnet_number: "210134"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: "Jane",
      second_name: "Alice",
      last_name: "Sanchez",
      second_last_name: "Smith",
      carnet_number: "220135"
    }
  });

  console.log("Created users:", { user1, user2 });

// Create some courses
  const course1 = await prisma.course.create({
    data: {
        name: "Redes",
        code: "RED103"
    }
  });
  const course2 = await prisma.course.create({
    data: {
        name: "Programacion",
        code: "PROG101"
    }
  });
  console.log("Created courses:", { course1, course2 });

}

main()
  .then(() => {
    console.log("🌱 Seed executed successfully.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    return prisma.$disconnect();
  });