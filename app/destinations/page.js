import { PrismaClient } from "@prisma/client"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany()

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">
        Explore Destinations 
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            href={`/destinations/${destination.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {destination.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {destination.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}