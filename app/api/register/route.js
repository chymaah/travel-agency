import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !password) {
      return new Response("Missing fields", { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return new Response("User created", { status: 201 })
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}