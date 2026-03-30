import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function TripDetails({ params }) {
  const resolvedParams = await params
  const id = resolvedParams?.id

  if (!id) return notFound()

  const trip = await prisma.trip.findUnique({
    where: { id: String(id) },
    include: {
      destination: true,
    },
  })

  if (!trip) return notFound()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      {/* HERO IMAGE */}
      <div className="relative h-96 w-full">
        <img
          src={trip.image}
          alt={trip.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold">{trip.title}</h1>
          <p className="text-lg mt-2">
            {trip.destination?.name}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            About this trip
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {trip.description}
          </p>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-lg font-semibold text-blue-900">
              Price per person
            </p>
            <p className="text-3xl font-bold text-blue-600">
              ${trip.price}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE BOOKING CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border flex flex-col justify-between">

          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Ready to explore?
            </h2>

            <p className="text-gray-600 mb-6">
              Book this trip now and secure your spot.
            </p>
          </div>

          <Link
            href={`/trips/${trip.id}/book`}
            className="w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Book This Trip
          </Link>

        </div>

      </div>

    </main>
  )
}