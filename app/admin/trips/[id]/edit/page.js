import { PrismaClient } from "@prisma/client"
import { redirect, notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function EditTripPage({ params }) {
  const resolvedParams = await params
  const id = resolvedParams?.id

  if (!id) return notFound()

  const trip = await prisma.trip.findUnique({
    where: { id: String(id) },
  })

  if (!trip) return notFound()

  const destinations = await prisma.destination.findMany()

  async function updateTrip(formData) {
    "use server"

    const title = formData.get("title")
    const description = formData.get("description")
    const price = parseFloat(formData.get("price"))
    const image = formData.get("image")
    const destinationId = formData.get("destinationId")

    await prisma.trip.update({
      where: { id: String(id) },
      data: {
        title,
        description,
        price,
        image,
        destinationId,
      },
    })

    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold mb-8">
          Edit Trip
        </h1>

        <form action={updateTrip} className="flex flex-col gap-6">

          <input
            name="title"
            defaultValue={trip.title}
            required
            className="border p-3 rounded-lg"
          />

          <textarea
            name="description"
            defaultValue={trip.description}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={trip.price}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="image"
            defaultValue={trip.image}
            required
            className="border p-3 rounded-lg"
          />

          <select
            name="destinationId"
            defaultValue={trip.destinationId}
            required
            className="border p-3 rounded-lg"
          >
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
          >
            Update Trip
          </button>

        </form>

      </div>
    </div>
  )
}