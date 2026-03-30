"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn("credentials", { ...form, redirect: false })
    if (res.ok) router.push("/")
    else alert("Invalid credentials")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg">
            Login
          </button>
        </form>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-300 w-full"></div>
       </div>

        <button
          onClick={() => signIn("google")}
          className="mt-4 w-full border border-gray-300 bg-white hover:bg-gray-100 transition text-gray-700 font-medium py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
         />
         Continue with Google
        </button>


        <p className="text-gray-500 text-sm mt-4 text-center">
          Dont have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}