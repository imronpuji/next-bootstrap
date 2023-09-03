const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    await prisma.role_type.createMany({
      data: [
        {
          role: "admin",
        },
        {
          role: "user",
        },
        {
          role: "employee",
        },
      ],
    })

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDatabase()
