"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReviewPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [comment, setComment] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        comment,
      }),
    })

    setUserName("")
    setComment("")

    router.push("/admin") // ou homepage si tu veux
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6">
          Ajouter un avis
        </h1>

        <input
          type="text"
          placeholder="Ton nom"
          className="w-full border p-3 rounded mb-4"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <textarea
          placeholder="Ton commentaire"
          className="w-full border p-3 rounded mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}