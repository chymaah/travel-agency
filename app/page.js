import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-white">

      {/* HERO SECTION */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/70"></div>

        <div className="relative z-10 text-center px-6">
          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
            PREMIUM TRAVEL EXPERIENCE
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6">
            Explore the World <br /> with WanderBlue
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 mb-8">
            Discover breathtaking destinations, curated experiences,
            and unforgettable adventures crafted just for you.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/destinations"
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Destinations
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-900 transition"
            >
              Join Today
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-20 px-10 bg-blue-50">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-900">
            Featured Destinations
          </h2>
          
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              name: "Bali, Indonesia",
              image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              price: "$1299",
            },
            {
              name: "Santorini, Greece",
              image:
                "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
              price: "$1899",
            },
            {
              name: "Paris, France",
              image:
                "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
              price: "$1599",
            },
            {
              name: "Maldives",
              image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              price: "$2499",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  {item.name}
                </h3>
                <p className="text-blue-600 font-bold mt-2">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-blue-200 mb-8">
          Join thousands of happy travelers exploring the world with us.
        </p>

        <Link
          href="/destinations"
          className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          Explore Destinations
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-blue-200 py-14 px-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              WanderBlue
            </h3>
            <p>
              Crafting unforgettable travel experiences since 2015.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/destinations">Destinations</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              Contact
            </h4>
            <p>hello@travelagency.com</p>
            <p>+216 XX XXX XXX</p>
            <p>Tunisia</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              Newsletter
            </h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-blue-800 text-white placeholder-blue-300"
            />
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-sm">
          © 2026 TravelAgency. All rights reserved.
        </div>
      </footer>

    </main>
  )
}