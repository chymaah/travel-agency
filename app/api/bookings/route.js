import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { tripId } = await req.json()

  // vérifier si déjà réservé
  const existingBooking = await prisma.booking.findFirst({
    where: {
      user: { email: session.user.email },
      tripId,
    },
  })

  if (existingBooking) {
    return NextResponse.json(
      { error: "Trip already booked" },
      { status: 400 }
    )
  }

  const booking = await prisma.booking.create({
    data: {
      user: {
        connect: { email: session.user.email },
      },
      trip: {
        connect: { id: tripId },
      },
    },
  })

  return NextResponse.json(booking)
}