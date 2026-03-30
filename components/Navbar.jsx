"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition duration-300 
      ${
        pathname === href
          ? "text-white"
          : "text-blue-100 hover:text-white"
      }`}
    >
      {label}
      {pathname === href && (
        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white rounded-full"></span>
      )}
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900/95 to-blue-900/95 text-white shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:scale-105 transition duration-300"
        >
          Travel Agency
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <Link
            href="/reviews"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Laisser un avis
          </Link>

          {navLink("/", "Home")}
          {navLink("/trips", "Trips")}
          {navLink("/destinations", "Destinations")}

          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-md"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-900 transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden md:block text-sm bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                {session.user.email}
              </span>

              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}