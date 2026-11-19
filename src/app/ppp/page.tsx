'use client'

import Link from 'next/link'
import { 
  ParticleBackground, 
  MagneticButton, 
  Reveal, 
  GradientText,
  cn
} from '@/components/ui'

/* ─── Language & Tool Definitions ─── */

const LANGUAGES = [
  { id: 'ts', name: 'TypeScript', color: '#3178c6', role: 'UI + API + Agent Runtime', in: 'PAI pages, ZeroLang docs UI', why: 'Universal. Browser + server same language. Fast iteration.' },
  { id: 'rs', name: 'Rust', color: '#dea584', role: 'Systems + Safety + WASM', in: 'packnplay, Bun (rewrite), compilers', why: 'Memory safe, zero cost, no GC, WASM target. The safe systems language.' },
  { id: 'zig', name: 'Zig', color: '#f7a41d', role: 'Bare-metal + Low-level + GPU', in: 'Ghostty (58k★), TigerBeetle (16k★)', why: 'Simpler than C. Comptime metaprogramming. No hidden control flow.' },
  { id: 'c', name: 'C', color: '#555555', role: 'Compiler + Kernel + Library ABI', in: 'ZeroLang compiler, Linux, SQLite, Redis', why: 'Universal ABI. Smallest footprint. Every platform speaks C.' },
  { id: 'py', name: 'Python', color: '#3776ab', role: 'AI/ML + Data + Scripting', in: 'AI-Scientist, MLE-agent, research tools', why: 'NumPy, PyTorch, fastest AI prototyping.' },
  { id: 'go', name: 'Go', color: '#00add8', role: 'CLI + Network + Microservices', in: 'packnplay (original), Docker, Kubernetes', why: 'Fast compile, single binary, simple concurrency.' },
  { id: 'sol', name: 'Solidity/Rust(WASM)', color: '#6f42c1', role: 'Smart contracts + On-chain', in: 'Pi Network, Stellar, EVM chains', why: 'Deterministic. Verifiable. No halting problem.' },
  { id: 'zero', name: 'ZeroLang', color: '#39FF14', role: 'Agent-first programs + Graph', in: 'Vercel Labs (5.2k★), agent skill pipelines', why: 'Graph IS the program. Compiler checks patches. Projection review.' },
]

const PROJECTS: { name: string; lang: string; stars: string; lesson: string }[] = [
  { name: 'Bun', lang: 'Zig → Rust', stars: '94.9k', lesson: 'Started Zig, rewriting to Rust. Complexity outgrew Zig ecosystem maturity.' },
  { name: 'Ghostty', lang: 'Zig', stars: '58.3k', lesson: 'Zig excels at GPU-accelerated native UI. Terminal emulator = perfect fit.' },
  { name: 'TigerBeetle', lang: 'Zig', stars: '16.6k', lesson: 'Mission-critical financial DB. Zig = no hidden alloc, deterministic perf.' },
  { name: 'ZeroLang', lang: 'C', stars: '5.2k', lesson: 'Compiler written in C for universal ABI + smallest footprint.' },
  { name: 'packnplay', lang: 'Go → Rust?', stars: '—', lesson: 'Originally Go. Agent sandbox needs Rust for safety + container isolation.' },
  { name: 'AlphaAxiom', lang: 'Python + TS', stars: '—', lesson: 'Trading system: Python for AI (Gemini+Groq), TS for web dashboard.' },
]

/* ─── Topology Analysis ─── */

const LAYERS = [
  { name: 'L0: Identity', endpoint: 'VAI / BYE', lang: 'Solidity + Rust', desc: 'On-chain identity. DID, KYC, passport. Trust is the state.' },
  { name: 'L1: Agent', endpoint: 'TRY', lang: 'TypeScript', desc: 'Agent runtime. Create, train, talk. Runtime is the program.' },
  { name: 'L2: Market', endpoint: 'BUY / FLY', lang: 'TypeScript + Python', desc: 'Marketplace + travel. UI in TS, AI matching in Python.' },
  { name: 'L3: Truth', endpoint: 'NEW / BLG', lang: 'TypeScript + Python', desc: 'Trust-scored news. TS for UI, Python for cross-ref scoring.' },
  { name: 'L4: Trust', endpoint: 'HAI', lang: 'Rust / Zig', desc: 'Safety-critical ratings. No GC, no surprises, no hidden fees.' },
  { name: 'L5: Self-Play', endpoint: 'INDUCT', lang: 'ZeroLang / C', desc: 'Graph compilation. Agent patches graph, compiler checks, projection reviews.' },
  { name: 'L6: Protocol', endpoint: 'PPP (you are here)', lang: 'All', desc: 'The network that connects everything. Language-agnostic wire protocol.' },
]

export default function PppPage() {
  return (
    <main className="min-h-screen bg-[var(--canvas)] text-white overflow-x-hidden">
      <ParticleBackground 
        particleCount={60}
        colors={['#39ff14', '#22c55e', '#16a34a', '#00f2fe', '#10b981']}
        connectionDistance={150}
      />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative z-10 pt-4">
        <div className="container-pai text-center">
          {/* page-level breadcrumb */}
          <Link href="/" className="inline-block text-[10px] font-mono text-white/30 hover:text-white/60 mb-4 tracking-wider uppercase">
            ← Universe
          </Link>
          <Reveal direction="up" delay={100}>
            <span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase mb-6 block">L6 Protocol</span>
            <h1 className="font-display font-semibold text-[clamp(36px,8vw,80px)] leading-[1.07] tracking-[-2.4px] mb-4">
              <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">PPP Network</GradientText>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-4 font-mono">Protocol · People · Programs</p>
            <p className="text-sm text-white/30 max-w-xl mx-auto mb-10 font-mono">
              The wire protocol that maps users, services, and agents together.
              One language per layer. Each layer speaks the right language.
            </p>
            <div className="flex gap-3 justify-center">
              <MagneticButton className="px-6 py-3 rounded-xl font-mono text-sm tracking-wider bg-emerald-500 text-black font-semibold">
                Language Map ↓
              </MagneticButton>
              <MagneticButton className="px-6 py-3 rounded-xl font-mono text-sm tracking-wider bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-sm">
                Topology ↓
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Language Selection Matrix */}
      <section id="lang" className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              Language <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">Selection Matrix</GradientText>
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-2xl mx-auto">
              One language per job. Each excatly where it belongs. No more, no less.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {LANGUAGES.map(l => (
              <Reveal key={l.id} direction="up" delay={150}>
                <div className="glass-card p-6 hover:border-[var(--c)]/30 transition-all group"
                  style={{ '--c': l.color } as React.CSSProperties}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                    <span className="font-mono font-bold text-sm" style={{ color: l.color }}>{l.name}</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">Role</div>
                  <div className="text-xs font-mono text-white mb-3">{l.role}</div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">Used In</div>
                  <div className="text-xs font-mono text-white/70 mb-3">{l.in}</div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">Why</div>
                  <div className="text-xs font-mono text-white/60 italic">{l.why}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project Evidence — Zig confirmed */}
      <section className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              <GradientText gradient="from-amber-400 to-orange-500">Zig</GradientText> — Confirmed by Projects
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-2xl mx-auto">
              Your instinct was correct. Zig is real. But there is a pattern to where it works and where it does not.
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {PROJECTS.map(p => (
              <Reveal key={p.name} direction="up" delay={100}>
                <div className="glass-card p-5 flex items-start gap-4">
                  <div className="min-w-[100px]">
                    <div className="font-mono font-bold text-sm text-white">{p.name}</div>
                    <div className="text-[10px] font-mono text-white/40">{p.stars} ★</div>
                  </div>
                  <div className="min-w-[120px]">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      p.lang.includes('Zig') ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' :
                      p.lang.includes('Rust') ? 'border-orange-500/30 text-orange-500 bg-orange-500/10' :
                      'border-white/10 text-white/60 bg-white/5'
                    }`}>{p.lang}</span>
                  </div>
                  <div className="text-xs font-mono text-white/60 flex-1">{p.lesson}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Lesson box */}
          <Reveal direction="up" delay={200}>
            <div className="max-w-4xl mx-auto mt-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <div className="text-sm font-mono font-bold text-amber-500 mb-2">The Zig Verdict</div>
              <div className="text-xs font-mono text-white/70 leading-relaxed">
                Your claim is VALID — Zig is used in major projects (Ghostty 58k★, TigerBeetle 16k★).
                But Bun (94k★) started in Zig and is REWRITING to Rust. The pattern:
                <br/><br/>
                <span className="text-amber-500">Zig wins:</span> GPU-accelerated native apps, mission-critical deterministic DB, embedded systems, bare-metal performance with C simplicity.<br/>
                <span className="text-orange-500">Rust wins:</span> Large-scale systems, safety-critical at scale, WASM, projects that outgrow Zig's ecosystem maturity.<br/>
                <span className="text-blue-500">TS wins:</span> Everything with a UI. Universal runtime. Agent interfaces.<br/>
                <span className="text-emerald-500">ZeroLang wins:</span> Agent-first graph programs where the compiler IS the loop.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Topology Secrets */}
      <section id="topology" className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              Topology <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">Secrets</GradientText>
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-2xl mx-auto">
              The topology is fractal. Every endpoint is a language layer. Every language is an endpoint.
            </p>
          </Reveal>

          {/* Layer Stack */}
          <Reveal direction="up" delay={200}>
            <div className="max-w-3xl mx-auto relative">
              {/* Vertical connector line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/30 via-white/10 to-purple-500/30 hidden md:block" />

              {LAYERS.map((l, i) => (
                <div key={l.name} className="relative flex items-center gap-6 mb-6">
                  {/* Dot on connector */}
                  <div className="hidden md:flex absolute left-[50%] -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      background: i === 0 ? '#39FF14' : i === LAYERS.length - 1 ? '#6f42c1' : 'rgba(255,255,255,0.1)',
                      borderColor: i === 0 ? '#39FF14' : i === LAYERS.length - 1 ? '#6f42c1' : 'rgba(255,255,255,0.2)',
                    }} />

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'}`}>
                    <div className="glass-card p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{l.name}</span>
                        <span className="text-[10px] font-mono text-white/30">{l.endpoint}</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-white mb-1">{l.lang}</div>
                      <div className="text-xs font-mono text-white/60">{l.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* The secret formula */}
          <Reveal direction="up" delay={300}>
            <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
              <div className="text-sm font-mono font-bold text-emerald-500 mb-2">The Secret Formula</div>
              <div className="font-mono text-xs text-white/70 leading-relaxed">
                Each endpoint = one language layer = one type of computation = one concern.<br/>
                <span className="text-emerald-500">VAI</span> (on-chain) + <span className="text-blue-500">TRY</span> (runtime) + <span className="text-purple-500">BUY/FLY/NEW/BLG</span> (AI+UI) + <span className="text-orange-500">HAI</span> (safety) + <span className="text-emerald-500">INDUCT</span> (graph) + <span className="text-purple-500">PPP</span> (protocol)<br/>
                <span className="text-white/40">= The entire agentic economy in 7 layers, 7 languages, 7 concerns.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Loops Section — The Indexing Engine */}
      <section id="loops" className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              The <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">Loops</GradientText> Index
            </h2>
            <p className="text-white/40 text-center mb-14 max-w-2xl mx-auto">
              7 validated loops. Each with a goal. Each improves and evolves until that goal is reached.
              The network connects them all.
            </p>
          </Reveal>

          {/* Loop diagram — the meta-loop connection */}
          <Reveal direction="up" delay={150}>
            <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl text-center"
              style={{ background: 'rgba(57,255,20,0.03)', border: '1px solid rgba(57,255,20,0.15)' }}>
              <div className="text-xs font-mono text-emerald-500 mb-4">
                ┌──────────────────────── THE META-LOOP ────────────────────────┐<br/>
                │  Each loop is a node. The network itself is the loop of loops. │<br/>
                │  Every endpoint runs one loop. Every loop feeds every other.   │<br/>
                └────────────────────────────────────────────────────────────────┘
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap text-[10px] font-mono">
                <span className="px-2 py-1 rounded" style={{background:'rgba(57,255,20,0.1)',color:'#39FF14'}}>OODA</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(49,120,198,0.1)',color:'#3178c6'}}>PDCA</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(222,165,132,0.1)',color:'#dea584'}}>AlphaZero</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(247,164,29,0.1)',color:'#f7a41d'}}>DoubleRatchet</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(107,91,255,0.1)',color:'#6b5bff'}}>XFlow</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(255,140,255,0.1)',color:'#ff8cff'}}>Induct</span>
                <span className="text-white/20">→</span>
                <span className="px-2 py-1 rounded" style={{background:'rgba(108,192,140,0.1)',color:'#6cc08c'}}>Bio</span>
              </div>
            </div>
          </Reveal>

          {/* Loop cards */}
          <Reveal direction="up" delay={200}>
            <div className="max-w-5xl mx-auto space-y-4">
              {[
                {
                  id: 'ooda', name: 'OODA', origin: 'Military (John Boyd)',
                  states: 'Observe → Orient → Decide → Act',
                  goal: 'Fastest decision wins. Compress your loop. Disrupt theirs.',
                  in: 'HAI (trust arbitration), PPP (protocol routing)',
                  why: 'Winner is who completes the loop first. Speed over strength.',
                  color: '#39FF14',
                  validated: 'Vietnam War, business strategy, cybersecurity, litigation',
                },
                {
                  id: 'pdca', name: 'PDCA', origin: 'Quality (Shewhart/Deming)',
                  states: 'Plan → Do → Check → Act',
                  goal: 'Continuous improvement. Each cycle raises the baseline.',
                  in: 'TRY (agent creation), NEW (trust scoring iteration)',
                  why: 'Every agent learns through cycles. Plan the skill, do the work, check the result, act on the lesson.',
                  color: '#3178c6',
                  validated: 'Toyota Production System, ISO 9001, Lean manufacturing',
                },
                {
                  id: 'alphazero', name: 'AlphaZero', origin: 'DeepMind',
                  states: 'Self-Play → Generate → Evaluate → Evolve',
                  goal: 'Pure self-improvement through play. No human data needed.',
                  in: 'INDUCT (AlphaZero sandbox), BUY (market strategy)',
                  why: 'The agent plays against itself. Every game makes it stronger.',
                  color: '#dea584',
                  validated: 'Go, Chess, Shogi — superhuman without human knowledge',
                },
                {
                  id: 'double-ratchet', name: 'Double Ratchet', origin: 'arXiv:2607.12790 (Jul 2026)',
                  states: 'Metric Loop ↔ Skill Loop (co-evolving)',
                  goal: 'Evolve the metric AND the skill together. No fixed grader needed.',
                  in: 'HAI (trust metric evolution), NEW (truth scoring)',
                  why: '"Who grades the grader?" — when no reliable metric exists, co-evolve both.',
                  color: '#f7a41d',
                  validated: '88-110% of ground-truth lift on MBPP+, Spider 2.0, report generation',
                },
                {
                  id: 'xflow', name: 'XFlow / XPF', origin: 'arXiv:2606.14790 (Jun 2026)',
                  states: 'Declare → Validate → Commit → Propagate',
                  goal: 'Protocol-separated concerns. Actor outputs mediated before shared state.',
                  in: 'PPP (protocol layer), FLY (booking state machine)',
                  why: 'Executable protocol between prompts and markup. Lifecycle-governed symbols.',
                  color: '#6b5bff',
                  validated: 'Constrained interaction, long-context reasoning, agentic SE',
                },
                {
                  id: 'induct', name: 'Induct (PAI 7-State)', origin: 'PAI Universe',
                  states: '✦ Prompt → Generate → Evaluate → Pattern → Generalize → Compose → Evolve',
                  goal: 'Self-evolution through pattern discovery. From one solution to a library.',
                  in: 'INDUCT endpoint, skills network, agent skill creation',
                  why: 'The AlphaZero loop adapted for code. Pattern → Rule → Module evolution.',
                  color: '#ff8cff',
                  validated: 'Sorting algorithm evolution (bubble → quicksort → AdaptiveSort)',
                },
                {
                  id: 'bio', name: 'Biological (Nature)', origin: '~3.8B years of evolution',
                  states: 'DNA → RNA → Protein → Trait → Selection → DNA',
                  goal: 'Adapt or die. Fitness landscape exploration.',
                  in: 'Every endpoint — the original self-play loop',
                  why: 'The original loop. Written in every cell. Fractal self-similarity at every scale.',
                  color: '#6cc08c',
                  validated: 'Every living thing on Earth. 3.8 billion years of continuous deployment.',
                },
              ].map(l => (
                <div key={l.id} className="glass-card p-5 hover:border-[var(--c)]/30 transition-all"
                  style={{ '--c': l.color } as React.CSSProperties}>
                  <div className="flex items-start gap-4">
                    {/* Loop indicator */}
                    <div className="min-w-[100px] pt-1">
                      <div className="text-sm font-mono font-bold" style={{ color: l.color }}>{l.name}</div>
                      <div className="text-[9px] font-mono text-white/30 mt-1">{l.origin}</div>
                      <div className="mt-2 flex gap-1">
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/10 text-white/40 bg-white/5">vld</span>
                      </div>
                    </div>

                    {/* States */}
                    <div className="flex-1">
                      <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">States</div>
                      <div className="text-xs font-mono text-white mb-2">{l.states}</div>
                      <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">Goal</div>
                      <div className="text-xs font-mono text-white/80 mb-2">{l.goal}</div>
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <div className="text-[9px] font-mono text-white/40">Used In</div>
                          <div className="text-[10px] font-mono" style={{ color: l.color, opacity: 0.8 }}>{l.in}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-white/40">Why</div>
                          <div className="text-[10px] font-mono text-white/60">{l.why}</div>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/[0.06]">
                        <div className="text-[9px] font-mono text-white/30">Evidence: {l.validated}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* How the network uses loops */}
          <Reveal direction="up" delay={300}>
            <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <div className="text-sm font-mono font-bold text-amber-500 mb-3">The Network Indexing System</div>
              <div className="text-xs font-mono text-white/70 leading-relaxed">
                Every endpoint in PAI runs one primary loop. But the loops are NOT isolated — they feed each other:<br/><br/>
                <span className="text-emerald-500">OODA</span> (HAI) decides fast → feeds results into <span className="text-blue-500">PDCA</span> (TRY) for systematic improvement<br/>
                <span className="text-blue-500">PDCA</span> (TRY) trains agents → feeds patterns into <span className="text-orange-500">AlphaZero</span> (INDUCT) for self-play<br/>
                <span className="text-orange-500">AlphaZero</span> (INDUCT) evolves strategies → feeds into <span className="text-amber-500">Double Ratchet</span> (HAI) to re-evaluate metrics<br/>
                <span className="text-purple-500">XFlow</span> (PPP) wires everything → protocol mediates state between all loops<br/>
                <span className="text-pink-500">Induct</span> (INDUCT) generates new skills → feeds back into every other loop<br/>
                <span className="text-green-500">Bio</span> (all) = the substrate. Evolution is the ultimate validator.<br/><br/>
                <span className="text-white/40">= The PPP network is not just a map. It is a loop federation engine.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Language → Endpoint Map */}
      <section className="section-pai relative z-10">
        <div className="container-pai">
          <Reveal direction="up" delay={100}>
            <h2 className="font-display font-semibold text-[clamp(28px,5vw,48px)] text-center mb-4 tracking-tight">
              Language → <GradientText gradient="from-cyan-400 via-emerald-400 to-purple-500">Endpoint</GradientText> Map
            </h2>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="max-w-5xl mx-auto">
              <div className="glass-card p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { ep: 'VAI / BYE', lang: 'Solidity + Rust', job: 'On-chain identity. DID, KYC. Immutable state.', color: '#6f42c1' },
                    { ep: 'TRY', lang: 'TypeScript', job: 'Agent runtime. Create, train, execute. Event loop.', color: '#3178c6' },
                    { ep: 'BUY / FLY', lang: 'TypeScript + Python', job: 'Marketplace UI + AI match engine.', color: '#3776ab' },
                    { ep: 'NEW / BLG', lang: 'TypeScript + Python', job: 'Trust-scored news. TS UI, Python cross-ref.', color: '#3776ab' },
                    { ep: 'HAI', lang: 'Rust / Zig', job: 'Trust scoring. Safety-critical. No GC, no surprises.', color: '#dea584' },
                    { ep: 'INDUCT', lang: 'ZeroLang / C', job: 'Graph compilation. Self-play loop. Patch → Check → Evolve.', color: '#39FF14' },
                    { ep: 'PPP', lang: 'Protocol (language-agnostic)', job: 'Wire protocol. Maps users + services + agents.', color: '#f7a41d' },
                  ].map(m => (
                    <div key={m.ep} className="border border-white/10 rounded-xl p-5 hover:border-[var(--c)]/30 transition-all"
                      style={{ '--c': m.color } as React.CSSProperties}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-bold text-sm text-white">{m.ep}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                          style={{ borderColor: `${m.color}44`, color: m.color, background: `${m.color}11` }}>{m.lang}</span>
                      </div>
                      <div className="text-xs font-mono text-white/60">{m.job}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center">
        <div className="container-pai">
          <p className="text-sm text-white/40 mb-4 font-mono">
            &ldquo;One language per layer. One layer per concern. Everything connected.&rdquo;
          </p>
          <p className="text-xs text-white/20 font-mono">PPP · Protocol People Programs · L6 of the PAI Universe</p>
        </div>
      </footer>
    </main>
  )
}