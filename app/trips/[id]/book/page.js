"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function BookPage() {
  const params = useParams()
  const router = useRouter()

  const [trip, setTrip] = useState(null)
  const [loadingTrip, setLoadingTrip] = useState(true)

  const [formData, setFormData] = useState({
    persons: 1,
    date: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // FETCH TRIP DATA
  useEffect(() => {
    if (!params?.id) return

    async function fetchTrip() {
      try {
        const res = await fetch(`/api/trips/${params.id}`)

        if (!res.ok) {
          throw new Error("Failed to fetch trip")
        }

        const data = await res.json()
        setTrip(data)
      } catch (err) {
        console.error(err)
        setTrip(null)
      } finally {
        setLoadingTrip(false)
      }
    }

    fetchTrip()
  }, [params?.id])

  if (loadingTrip) {
    return <div className="p-10">Loading...</div>
  }

  if (!trip) {
    return <div className="p-10">Trip not found</div>
  }

  const totalPrice = trip.price * formData.persons

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          persons: formData.persons,
          date: formData.date,
        }),
      })

      if (res.ok) {
        router.push("/dashboard")
      } else {
        const data = await res.json()
        setError(data.error || "Something went wrong")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      {/* HERO */}
      <div className="relative h-80">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6">
          <Link
            href={`/trips/${trip.id}`}
            className="text-white flex items-center gap-2 text-sm mb-3"
          >
            <ArrowLeft size={16} />
            Back to Details
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Book {trip.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Trip Overview
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {trip.description}
          </p>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-lg font-semibold text-blue-900">
              Price per person
            </p>
            <p className="text-2xl font-bold text-blue-600">
              ${trip.price}
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border">

          <h2 className="text-xl font-bold text-blue-900 mb-6">
            Complete Your Booking
          </h2>

          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Number of Travelers
              </label>
              <input
                type="number"
                min="1"
                value={formData.persons}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    persons: parseInt(e.target.value),
                  })
                }
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Travel Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>
                  ${trip.price} × {formData.persons}
                </span>
                <span className="font-bold text-blue-900">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Booking..." : `Book Now - $${totalPrice}`}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}