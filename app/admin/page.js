import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export default async function AdminDashboard() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  async function deleteTrip(formData) {
    "use server"

    const id = formData.get("id")

    if (!id) return

    await prisma.trip.delete({
      where: { id: String(id) },
    })

    redirect("/admin")
  }

  // ✅ FIX ICI : ajout reviews dans le tableau
  const [destinationsCount, tripsCount, bookingsCount, trips, reviews] =
    await Promise.all([
      prisma.destination.count(),
      prisma.trip.count(),
      prisma.booking.count(),
      prisma.trip.findMany({
        include: { destination: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Manage your travel agency platform
            </p>
          </div>

          <Link
            href="/admin/trips/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Add Trip
          </Link>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <StatCard title="Destinations" value={destinationsCount} color="text-blue-600" />
          <StatCard title="Trips" value={tripsCount} color="text-green-600" />
          <StatCard title="Bookings" value={bookingsCount} color="text-purple-600" />
        </div>

        {/* TRIPS */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-800">
              All Trips
            </h2>
          </div>

          <div className="divide-y">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-6 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {trip.destination?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-bold text-slate-700">
                    ${trip.price}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/admin/trips/${trip.id}/edit`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                    >
                      Edit
                    </Link>

                    <form action={deleteTrip}>
                      <input type="hidden" name="id" value={trip.id} />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}

            {trips.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No trips found.
              </div>
            )}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-12">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-800">
              Reviews
            </h2>
          </div>

          <div className="divide-y">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <h3 className="font-semibold">{review.userName}</h3>
                <p className="text-slate-600">{review.comment}</p>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No reviews yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      <h2 className={`text-4xl font-bold ${color}`}>{value}</h2>
    </div>
  )
}