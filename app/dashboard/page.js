import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const bookings = await prisma.booking.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      trip: {
        include: {
          destination: true,
        },
      },
    },
  })

  const totalBookings = bookings.length

  return (
    <main className="min-h-[80vh] pt-24 px-8 bg-gradient-to-br from-blue-50 to-blue-100">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome back 👋
        </h1>
        <p className="text-blue-700 mt-2">
          Logged in as <span className="font-semibold">{session.user.email}</span>
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">
            My Bookings
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {totalBookings}
          </p>
          <p className="text-blue-700 text-sm">Trips reserved</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">
            Account Role
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {session.user.role || "USER"}
          </p>
          <p className="text-blue-700 text-sm">User access level</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">
            Profile Status
          </h2>
          <p className="text-3xl font-bold text-green-600">
            Active
          </p>
          <p className="text-blue-700 text-sm">Account verified</p>
        </div>

      </div>

      {/* BOOKINGS LIST */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-blue-900">
          My Trips
        </h2>

        {bookings.length === 0 ? (
          <p className="text-blue-700">
            You havent booked any trips yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={booking.trip.image}
                  alt={booking.trip.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-blue-900">
                    {booking.trip.title}
                  </h3>

                  <p className="text-blue-700 text-sm mt-1">
                    {booking.trip.destination.name}
                  </p>

                  <p className="text-blue-800 font-bold mt-2">
                    ${booking.trip.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-900">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Explore Trips
          </Link>

          <Link
            href="/profile"
            className="px-6 py-3 bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>

    </main>
  )
}