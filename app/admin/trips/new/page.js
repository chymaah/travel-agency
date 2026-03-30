import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export default async function NewTripPage() {
  const destinations = await prisma.destination.findMany()

  async function createTrip(formData) {
    "use server"

    const title = formData.get("title")
    const description = formData.get("description")
    const price = parseFloat(formData.get("price"))
    const image = formData.get("image")
    const destinationId = formData.get("destinationId")

    await prisma.trip.create({
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
          Add New Trip
        </h1>

        <form action={createTrip} className="flex flex-col gap-6">

          <input
            name="title"
            placeholder="Trip Title"
            required
            className="border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="image"
            placeholder="Image URL"
            required
            className="border p-3 rounded-lg"
          />

          <select
            name="destinationId"
            required
            className="border p-3 rounded-lg"
          >
            <option value="">Select Destination</option>
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Trip
          </button>

        </form>

      </div>
    </div>
  )
}