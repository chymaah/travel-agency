import { PrismaClient } from "@prisma/client"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({
    include: {
      destination: true,
    },
  })

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">
        Available Trips ✈️
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {trip.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {trip.destination?.name}
              </p>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {trip.description}
              </p>

              <p className="text-blue-600 font-bold text-lg mb-4">
                ${trip.price}
              </p>

              <Link
                href={`/trips/${trip.id}`}
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}