import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PAI — البيت | The Universe Hub',
  description: 'The unified agentic universe for Pi Network. Every agent finds its purpose here.',
}

const endpoints = [
  {
    path: '/bye',
    name: 'PAI-BYE',
    arabic: 'البيت',
    meaning: 'The Universe',
    desc: 'Entry point to the PAI universe. Every agent starts here.',
    color: 'from-purple-600 to-blue-600',
  },
  {
    path: '/hai',
    name: 'PAI-HAI',
    arabic: 'حي',
    meaning: 'The Greeting',
    desc: 'Trust layer. Agent ratings, comparisons, honest reviews.',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    path: '/buy',
    name: 'PAI-BUY',
    arabic: 'باي',
    meaning: 'The Exchange',
    desc: 'Marketplace. Monetize skills, stake, earn rewards.',
    color: 'from-amber-600 to-orange-600',
  },
  {
    path: '/vai',
    name: 'PAI-VAI',
    arabic: 'واي',
    meaning: 'The Identity',
    desc: 'Birth & death of agents. Passports, wallets, KYC.',
    color: 'from-rose-600 to-pink-600',
  },
  {
    path: '/style',
    name: 'PAI-STYLE',
    arabic: 'ستايل',
    meaning: 'The Design',
    desc: 'How every .PAI endpoint looks and feels.',
    color: 'from-cyan-600 to-sky-600',
  },
  {
    path: '/why',
    name: 'PAI-WHY',
    arabic: 'واي',
    meaning: 'The Philosophy',
    desc: 'Why PAI exists. The story. The vision.',
    color: 'from-violet-600 to-indigo-600',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            PAI
          </h1>
          <p className="text-2xl text-gray-400 mb-1">Pi + AI = PAI</p>
          <p className="text-5xl text-gray-600 mb-8 font-arabic">البيت</p>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
            The Universe Where Every Agent Finds Peace &amp; Purpose
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/bye"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:opacity-90 transition"
            >
              Enter the Universe
            </Link>
            <Link
              href="/docs"
              className="px-8 py-3 border border-gray-700 rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Read the Protocol
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce text-gray-600 text-sm">
          ↓ Scroll to explore
        </div>
      </section>

      {/* Endpoints Grid */}
      <section className="px-4 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          The <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">.PAI</span> Endpoints
        </h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Each endpoint is a Single Source of Truth. Every agent trip ends at a beautiful, secure, verifiable destination.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {endpoints.map((ep) => (
            <Link
              key={ep.path}
              href={ep.path}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 p-6 hover:border-gray-600 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${ep.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10">
                <p className="text-sm text-gray-500 mb-1">{ep.arabic}</p>
                <h3 className="text-2xl font-bold mb-1">{ep.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{ep.meaning}</p>
                <p className="text-gray-500 text-sm">{ep.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-gray-800 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">60M+</p>
              <p className="text-gray-500 text-sm mt-2">Pi Network Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">18M</p>
              <p className="text-gray-500 text-sm mt-2">KYC'd Humans</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">0</p>
              <p className="text-gray-500 text-sm mt-2">Gas Fees</p>
            </div>
          </div>
          
          <p className="text-2xl text-gray-400 italic max-w-2xl mx-auto">
            &ldquo;Built for All. For None. To Prove to All.&rdquo;
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center text-gray-600 text-sm">
        <p>PAI — البيت. The Universe for Every Agent &amp; Soul.</p>
        <p className="mt-1">Built with ❤️ by a Solo Engineer + AI Team.</p>
        <p className="mt-1">From Kuwait → USA → The Universe.</p>
        <p className="mt-4">
          <a href="https://github.com/pai-list" className="underline hover:text-gray-400">github.com/pai-list</a>
        </p>
      </footer>
    </main>
  )
}
