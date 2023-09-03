const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10)

async function seedDatabase() {
  try {
    const password = await bcrypt.hash("password5", salt)
    // Seed your data here using Prisma client
    const createAdminResponse = await prisma.user.create({
      data: {
        nickname: "admin5",
        password,
        phone_number: "085882843339",
      },
    })
    const createRolesResponse = await prisma.user_Role.createMany({
      data: [
        {
          user_id: parseInt(createAdminResponse.id),
          role_id: 1,
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
