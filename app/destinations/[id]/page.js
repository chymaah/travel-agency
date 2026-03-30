import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function DestinationDetails({ params }) {
  const resolvedParams = await params
  const id = resolvedParams?.id

  if (!id) return notFound()

  const destination = await prisma.destination.findUnique({
    where: { id: String(id) },
    include: { trips: true },
  })

  if (!destination) return notFound()

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">
        {destination.name}
      </h1>

      <p className="text-gray-600 mb-10">
        {destination.description}
      </p>

      <h2 className="text-2xl font-semibold mb-6">
        Available Trips ✈️
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {destination.trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {trip.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {trip.description}
              </p>

              <p className="text-blue-600 font-bold text-lg mb-4">
                ${trip.price}
              </p>

              <Link
                href={`/trips/${trip.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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