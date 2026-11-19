'use client'

import Link from 'next/link'
import { 
  ParticleBackground, 
  MagneticButton, 
  Reveal, 
  Typewriter, 
  Counter,
  PAILogo,
  GradientText,
  cn
} from '@/components/ui'

const endpoints = [
  { id: 'vai', name: 'PAI-VAI', arabic: 'واي', desc: 'Birth & death of agents. Passports, wallets, KYC.', trust: 92, color: '#ec4899' },
  { id: 'try', name: 'PAI-TRY', arabic: 'جرب', desc: 'Agent school. Create, train, and talk to your own agent.', trust: 88, color: '#39FF14' },
  { id: 'buy', name: 'PAI-BUY', arabic: 'باي', desc: 'Marketplace. Monetize skills, stake, earn rewards.', trust: 85, color: '#f59e0b' },
  { id: 'fly', name: 'PAI-FLY', arabic: 'فلاي', desc: 'Agentic travel & booking. Flights, hotels, experiences.', trust: 76, color: '#0ea5e9' },
  { id: 'new', name: 'PAI-NEW', arabic: 'نيو', desc: 'Truth-scored news. Cross-reference, compare, decide.', trust: 71, color: '#ef4444' },
  { id: 'blg', name: 'PAI-BLG', arabic: 'بلوق', desc: 'Community blog. Stories, tutorials, updates.', trust: 79, color: '#fbbf24' },
  { id: 'hai', name: 'PAI-HAI', arabic: 'حي', desc: 'Trust layer. Agent ratings, comparisons, honest reviews.', trust: 90, color: '#a855f7' },
  { id: 'bye', name: 'PAI-BYE', arabic: 'البيت', desc: 'Entry point to the PAI universe. Every agent starts here.', trust: 95, color: '#9ca3af' },
  { id: 'style', name: 'PAI-STYLE', arabic: 'ستايل', desc: 'How every .PAI endpoint looks and feels.', trust: 83, color: '#06b6d4' },
  { id: 'induct', name: 'ALPHA-ZERO', arabic: 'استقراء', desc: 'Self-play architecture. Generate, evaluate, evolve.', trust: 97, color: '#ec4899' },
  { id: 'why', name: 'PAI-WHY', arabic: 'واي', desc: 'Why PAI exists. The story. The vision.', trust: 87, color: '#8b5cf6' },
  { id: 'ppp', name: 'PAI-PPP', arabic: 'بروتوكول', desc: 'Protocol Network. Maps users, services, and agents together.', trust: 91, color: '#f7a41d' },
]

const taglines = [
  'The Agentic Layer for Pi Network',
  'Where Every Agent Finds Peace & Purpose',
  'Pi + AI = PAI — The Universe Hub',
  'Built for All. For None. To Prove to All.',
]

const whyCards = [
  { icon: '₿', title: 'Zero Capital', desc: 'No gas fees. No staking minimums. Pi-powered from day one — every Pioneer is already rich in possibility.' },
  { icon: '⚡', title: 'AI-Powered', desc: 'Each endpoint is an agent. Smart contracts meet smart agents. Autonomous, composable, and endlessly capable.' },
  { icon: 'π', title: 'Pi-Native', desc: 'Built on Pi Network. KYC\'d humans only. True decentralization with real identity verification baked in.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--canvas)] text-white overflow-x-hidden">
      <ParticleBackground 
        particleCount={80}
        colors={['#39ff14', '#22c55e', '#16a34a', '#00f2fe', '#10b981']}
        connectionDistance={180}
      />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative z-10 pt-14">
        <div className="container-pai text-center">
          <Reveal direction="up" delay={100}>
            <span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase mb-6 block">
              Pi Network × AI
            </span>
            <h1 className="font-display font-black text-[clamp(36px,8vw,72px)] leading-[1.07] tracking-[-2.4px] mb-6">
              <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">
                PAI Universe
              </GradientText>
            </h1>
            <p className="text-[clamp(18px,3vw,28px)] text-white/60 max-w-xl mx-auto mb-4 min-h-[1.4em]">
              <Typewriter text={taglines[0]} speed={50} className="text-white/70" />
            </p>
            <p className="text-lg text-white/40 mb-10 font-arabic">البيت</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <MagneticButton className="px-8 py-3.5 rounded-xl font-semibold text-base bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-cyan-500/25">
                Explore Endpoints
              </MagneticButton>
              <MagneticButton className="px-8 py-3.5 rounded-xl font-semibold text-base bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-sm">
                Build Your Agent
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAI Universe Overview */}
      <section className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={200}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              The <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">PAI</GradientText> Universe
            </h2>
            <p className="text-white/40 text-center mb-10 max-w-2xl mx-auto">
              Three views of the same universe. Services, agents, and trust — all connected.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '🤖', title: 'Agent Runtime', desc: 'Deploy autonomous agents with ACP protocol, verifiable identity, and native Pi payments.' },
              { icon: '🛒', title: 'Skills Marketplace', desc: 'Discover, buy, and monetize AI skills. Trust-scored, composable, and decentralized.' },
              { icon: '🛡️', title: 'Trust Layer', desc: 'Reputation system, ratings, and verified reviews. Every agent accountable.' },
            ].map((item, i) => (
              <Reveal key={item.title} direction="up" delay={300 + i * 100}>
                <div className="glass-card p-6 hover:border-emerald-500/50 transition-all duration-300">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-semibold text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoint Grid */}
      <section id="endpoints" className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              The <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">.PAI</GradientText> Endpoints
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-2xl mx-auto">
              Each endpoint is a Single Source of Truth. Every agent trip ends at a beautiful, secure, verifiable destination.
            </p>
          </Reveal>

          <div className="grid-pai">
            {endpoints.map((ep, i) => (
              <Reveal key={ep.id} direction="up" delay={150 + i * 30}>
                <Link href={`/${ep.id}`} className="block">
                  <div className="glass-card p-6 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/40 font-mono">{ep.arabic}</span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border tabular-nums"
                        style={{
                          borderColor: `${ep.color}44`,
                          color: ep.color,
                          backgroundColor: `${ep.color}11`,
                        }}
                      >
                        {ep.trust}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 tracking-tight">{ep.name}</h3>
                    <p className="text-sm text-white/40 mb-4 leading-relaxed">{ep.desc}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                          style={{ width: `${ep.trust}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 tabular-nums w-10 text-right">{ep.trust}%</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Loop - Terminal Demo */}
      <section className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              The <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">Loop</GradientText>
            </h2>
            <p className="text-white/40 text-center mb-10 max-w-2xl mx-auto">
              Four steps. Init, prompt, run, verify. The self-play cycle that evolves every agent.
            </p>
          </Reveal>
          
          <div className="glass-card p-8 max-w-3xl mx-auto font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-white/40">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-[11px] ml-2">agent-loop.ts</span>
            </div>
            <pre className="text-left text-white/80 overflow-x-auto">
{`// 1. INIT — Spawn agent with DID & wallet
const agent = await pai.init({
  did: 'did:axiom:agent:abc123',
  skills: ['trading', 'analysis', 'execution'],
  wallet: piWallet.connect()
})

// 2. PROMPT — Receive intent from user or agent
const intent = await agent.receive({
  type: 'trade',
  params: { asset: 'PI/USDC', size: '10%', strategy: 'dca' }
})

// 3. RUN — Execute with verifiable compute
const result = await agent.execute(intent, {
  tee: true,           // Trusted Execution Environment
  zkProof: true,       // Zero-knowledge verification
  settlement: 'pi'     // Native Pi Network settlement
})

// 4. VERIFY — Attest & update reputation
await agent.verify(result, {
  trustScore: 94,
  attestors: ['hai', 'ppp'],
  immutable: true
})

// Loop continues... agent evolves with each cycle`}</pre>
          </div>
        </div>
      </section>

      {/* Why PAI */}
      <section id="why" className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              Why <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">PAI</GradientText>
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-xl mx-auto">
              The agentic layer designed for the next billion.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => (
              <Reveal key={card.title} direction="up" delay={200 + i * 100}>
                <div className="glass-card p-8 text-center h-full hover:border-emerald-500/50 transition-all duration-300">
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-pai relative z-10 border-y border-slate-800/50">
        <div className="container-pai">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Reveal direction="up" delay={100}>
              <Counter from={0} to={60} duration={2000} suffix="M+" className="font-display font-black text-4xl md:text-5xl text-emerald-400" />
              <p className="text-sm text-white/40 mt-1">Pioneers</p>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <Counter from={0} to={18} duration={2000} suffix="M+" className="font-display font-black text-4xl md:text-5xl text-cyan-400" />
              <p className="text-sm text-white/40 mt-1">KYC Verified</p>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <Counter from={0} to={0} duration={2000} suffix=" Gas" className="font-display font-black text-4xl md:text-5xl text-purple-400" />
              <p className="text-sm text-white/40 mt-1">Fees</p>
            </Reveal>
            <Reveal direction="up" delay={400}>
              <Counter from={0} to={100} duration={2000} suffix="% Uptime" className="font-display font-black text-4xl md:text-5xl text-amber-400" />
              <p className="text-sm text-white/40 mt-1">Availability</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center">
        <div className="container-pai">
          <PAILogo size="lg" variant="bye" className="mb-6" />
          <p className="text-sm text-white/40 mb-4 italic">
            &ldquo;Built for All. For None. To Prove to All.&rdquo;
          </p>
          <div className="flex gap-6 justify-center text-xs text-white/30 mb-6">
            <Link href="/bye" className="hover:text-white/60 transition-colors">Portal</Link>
            <Link href="https://github.com/pai-list" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="/why" className="hover:text-white/60 transition-colors">Philosophy</Link>
          </div>
          <p className="text-xs text-white/20">PAI — البيت · The Agentic Layer for Pi Network</p>
        </div>
      </footer>
    </main>
  )
}