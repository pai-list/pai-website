<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAI Universe — The Agent Economy's Operating System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
  <script src="https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"></script>
  <script src="https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #020617;
      --bg-elevated: #0f172a;
      --fg: #f8fafc;
      --muted: #64748b;
      --accent: #39ff14;
      --accent-dim: #22c55e;
      --card: #0f172a;
      --border: #1e293b;
      --card-hover: #1e293b;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @font-face {
      font-family: 'Display';
      src: local('Space Grotesk');
    }
    body { font-family: 'JetBrains Mono', monospace; background: var(--bg); color: var(--fg); min-height: 100vh; overflow-x: hidden; }
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .bg-grid { background-image: linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px); background-size: 56px 56px; }
    .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); opacity: 0.02; pointer-events: none; }
    .glow { box-shadow: 0 0 30px rgba(57,255,20,0.15), 0 0 60px rgba(57,255,20,0.05); }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; transition: all 0.3s ease; }
    .card:hover { border-color: #39ff14; box-shadow: 0 20px 40px -12px rgba(57,255,20,0.15); }
    .btn-primary { background: linear-gradient(135deg, #39ff14 0%, #22c55e 100%); color: #020617; font-weight: 600; padding: 12px 24px; border-radius: 12px; transition: all 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -5px rgba(57,255,20,0.4); }
    .btn-secondary { background: transparent; border: 1px solid #1e293b; color: #f8fafc; padding: 12px 24px; border-radius: 12px; transition: all 0.2s; }
    .btn-secondary:hover { border-color: #39ff14; background: rgba(57,255,20,0.05); }
    .gradient-text { background: linear-gradient(135deg, #39ff14 0%, #22c55e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .text-balance { text-wrap: balance; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-spin { animation: spin 20s linear infinite; }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .glass { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(57, 255, 20, 0.1); }
    .text-gradient { background: linear-gradient(135deg, #39ff14 0%, #22c55e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(57,255,20,0.1), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .orbit-container { perspective: 1000px; }
    .orbiting { animation: orbit 20s linear infinite; transform-style: preserve-3d; }
    @keyframes orbit { from { transform: rotateY(0deg) rotateX(0deg); } to { transform: rotateY(360deg) rotateX(360deg); } }
    .card-3d { transform-style: preserve-3d; transition: transform 0.3s ease; }
    .card-3d:hover { transform: rotateY(5deg) rotateX(-5deg) translateZ(20px); }
    .particle { position: absolute; border-radius: 50%; pointer-events: none; }
    .skill-tag { @apply px-2 py-0.5 rounded text-xs font-mono bg-dark-700 border border-dark-600 text-dark-300; }
    .slide { display: none; }
    .slide.active { display: flex; }
    .slide-indicator { width: 10px; height: 10px; border-radius: 50%; border: 2px solid #39ff14; background: transparent; transition: all 0.3s; }
    .slide-indicator.active { background: #39ff14; }
  </style>
</head>
<body class="bg-bg min-h-screen overflow-x-hidden font-mono text-white">
  <!-- Background Effects -->
  <div class="fixed inset-0 -z-10 bg-grid"></div>
  <div class="fixed inset-0 -z-10 noise"></div>
  
  <!-- Floating Orbs -->
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-pai-500/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pai-500/10 rounded-full blur-3xl animate-float" style="animation-delay: -2s;"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pai-500/5 rounded-full blur-2xl animate-pulse"></div>
  </div>

  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-600/50 backdrop-blur-xl" style="background: rgba(15, 23, 42, 0.8);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3" aria-label="PAI Home">
          <svg class="w-8 h-10 lg:w-12 lg:h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="paiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#39ff14"/>
                <stop offset="50%" stopColor="#22c55e"/>
                <stop offset="100%" stopColor="#16a34a"/>
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="15" stroke="url(#paiGradient)" stroke-width="2"/>
            <path d="M16 8V24M8 16H24" stroke="url(#paiGradient)" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="16" cy="16" r="6" fill="url(#paiGradient)"/>
          </svg>
          <span class="font-display font-black text-xl lg:text-2xl">
            <span class="bg-gradient-to-r from-pai-400 via-pai-500 to-pai-600 bg-clip-text text-transparent">PAI</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1 lg:gap-2">
          <a href="#universe" class="nav-link">Universe</a>
          <a href="#pai-bye" class="nav-link">PAI-BYE</a>
          <a href="#pai-hai" class="nav-link">PAI-HAI</a>
          <a href="#pai-buy" class="nav-link">PAI-BUY</a>
          <a href="#pai-vai" class="nav-link">PAI-VAI</a>
          <a href="#pai-style" class="nav-link">PAI-STYLE</a>
          <a href="#pai-why" class="nav-link">PAI-WHY</a>
        </div>

        <!-- Actions -->
        <div class="hidden lg:flex items-center gap-3">
          <a href="/playground" class="btn-primary px-6 py-2.5 text-sm" style="background: linear-gradient(135deg, #39ff14 0%, #22c55e 100%); color: #020617; font-weight: 600; padding: 12px 24px; border-radius: 12px; transition: all 0.2s;">
            Get Started →
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4l-4 4"/></svg>
          </a>
          <a href="/docs" class="btn-secondary px-5 py-2.5 text-sm">Docs</a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden p-2 rounded-xl bg-dark-800/50 border border-dark-600 text-white" aria-label="Menu" onclick="toggleMobileMenu()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="lg:hidden fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 translate-y-full opacity-0 pointer-events-none transition-all duration-300" id="mobile-menu">
    <div class="flex flex-col items-center justify-center flex-1 gap-8 px-8">
      <a href="#universe" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">Universe</a>
      <a href="#pai-bye" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-BYE</a>
      <a href="#pai-hai" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-HAI</a>
      <a href="#pai-buy" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-BUY</a>
      <a href="#pai-vai" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-VAI</a>
      <a href="#pai-style" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-STYLE</a>
      <a href="#pai-why" class="text-2xl font-medium text-white hover:text-pai-400 transition-colors" onclick="closeMobileMenu()">PAI-WHY</a>
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto pt-8">
        <a href="/playground" class="btn-primary w-full text-center py-4" onclick="closeMobileMenu()">Get Started →</a>
        <a href="/docs" class="btn-secondary w-full text-center">Docs</a>
      </div>
    </div>
  </div>

  <main class="relative z-10">
    <!-- HERO SECTION -->
    <section class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div class="max-w-7xl mx-auto w-full">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] px-4">
          
          <!-- LEFT: Hero Content -->
          <div class="text-center lg:text-left animate-slide-up">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pai-500/10 border border-pai-500/20 text-pai-400 text-sm font-medium mb-6">
              <span class="relative flex h-2 w-2">
                <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pai-400 opacity-75"></div>
                <div class="relative inline-flex rounded-full h-2 w-2 bg-pai-400"></div>
              </span>
              <span class="font-mono text-xs uppercase tracking-wider">PAI = BYE</span>
            </div>

            <h1 class="font-display font-black text-5xl lg:text-7xl lg:leading-[1.1] mb-6">
              <span class="bg-gradient-to-r from-white via-pai-400 to-pai-500 bg-clip-text text-transparent">
                The Agent Economy's
                <br />
                <span class="text-pai-400">Operating System</span>
              </h1>

              <p class="text-lg lg:text-xl text-dark-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Build, deploy, and monetize AI agents on Pi Network. 
                60M users. 18M KYC. Native payments. Verifiable identity.
              </p>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a href="/playground" class="btn-primary px-8 py-4 text-lg">
                  Get Started →
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4l-4 4"/></svg>
                </a>
                <a href="/docs" class="btn-secondary px-8 py-3 text-lg">View Docs</a>
              </div>

              <div class="flex flex-wrap items-center justify-center gap-8 text-sm text-dark-400 mt-12">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-pai-500 rounded-full animate-pulse"></div>
                  <span>60M+ Pi Users</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>18M+ KYC Verified</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>$4/verification ACP</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>50+ Skills Ready</span>
                </div>
              </div>
            </div>

            <!-- RIGHT: 3D Avatar + Visual -->
            <div class="relative lg:order-first">
              <div class="relative aspect-square max-w-lg mx-auto">
                <!-- Three.js Canvas Container -->
                <div id="avatar-canvas" class="aspect-square w-full max-w-lg mx-auto rounded-2xl overflow-hidden bg-dark-950/50 border border-dark-600 rounded-2xl">
                  <canvas id="avatar-canvas" class="w-full h-full"></canvas>
                  
                  <!-- Floating Stats -->
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-center">
                    <div class="text-center">
                      <div class="text-3xl font-display font-black text-pai-400">50+</div>
                      <div class="text-xs text-dark-400">Skills Ready</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-display font-black text-pai-400">$0.04</div>
                      <div class="text-xs text-dark-400">Per Verification</div>
                    </div>
                    <div class="text-center">
                      <div class="text-3xl font-display font-black text-pai-400">18M+</div>
                      <div class="text-xs text-dark-400">KYC Verified</div>
                    </div>
                  </div>
                </div>

                <!-- Floating Particles -->
                <div class="absolute inset-0 overflow-hidden pointer-events-none" id="particles"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES GRID -->
    <section class="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display font-black text-4xl lg:text-5xl mb-4">
            <GradientText gradient="from-white via-pai-400 to-pai-500">Built for the Agent Economy</GradientText>
          </h2>
          <p class="text-lg text-dark-300 max-w-2xl mx-auto">Three primitives. Infinite possibilities. One platform.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🔐',
              title: 'Universal Identity',
              desc: 'did:agent DIDs + Pi KYC + TrustChain reputation. Portable, verifiable, sovereign.',
              features: ['did:agent DIDs', 'Pi KYC Verification', 'TrustChain Reputation', 'OpenIdentity Manifests']
            },
            {
              icon: '💰',
              title: 'Native Commerce',
              desc: 'ACP payments + Pi/USDC settlement. One-line payments. Escrow built-in.',
              features: ['ACP Protocol', 'Pi/USDC Payments', 'Escrow & Invoices', 'Revenue Share 90/10']
            },
            {
              icon: '🧩',
              title: 'Composable Skills',
              desc: 'npm for agent capabilities. Install, compose, monetize. Revenue share built-in.',
              features: ['50+ Skills', 'Revenue Share 90/10', 'ZK Verification', 'Sandboxed Execution']
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-3d p-8"
            >
              <div class="text-5xl mb-4">{feature.icon}</div>
              <h3 class="font-display font-bold text-2xl mb-3">{feature.title}</h3>
              <p class="text-dark-300 mb-6">{feature.desc}</p>
              <ul className="space-y-2">
                {feature.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-dark-300">
                    <span className="w-1.5 h-1.5 bg-pai-500 rounded-full" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>

    {/* CHOOSE YOUR PATH */}
    <section class="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display font-black text-4xl lg:text-5xl mb-4">
            <GradientText gradient="from-white via-pai-400 to-pai-500">Choose Your Path</GradientText>
          </h2>
          <p class="text-lg text-dark-300 max-w-2xl mx-auto">PAI gives autonomous services a portable identity, a verifiable reputation, and a way to exchange value.</        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {[
            { title: 'New to PAI?', desc: 'Learn the building blocks.', link: '/getting-started/overview', cta: 'Start Learning →', color: 'from-blue-500 to-cyan-500' },
            { title: 'Building an Agent?', desc: 'Follow production-oriented guides.', link: '/guides/verify-agent', cta: 'Build an Agent →', color: 'from-green-500 to-emerald-500' },
            { title: 'Need an API?', desc: 'Browse the package reference.', link: '/reference/pai-core', cta: 'Browse API →', color: 'from-purple-500 to-pink-500' },
            { title: 'Joining the Ecosystem?', desc: 'Contribute a skill or integration.', link: '/ecosystem/contributing', cta: 'Contribute →', color: 'from-orange-500 to-red-500' },
          ].map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d p-8 group"
              style={{ background: `linear-gradient(135deg, ${item.color})` }}
            >
              <div className="text-5xl mb-4">{['📚','⚙️','📚','🤝'][0]}</div>
              <h3 className="font-display font-bold text-2xl mb-3">{item.title}</h3>
              <p className="text-dark-300 mb-6">{item.desc}</p>
              <div className="flex items-center gap-2 text-pai-400 font-medium group">
                <span>{item.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    {/* ECOSYSTEM */}
    <section class="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display font-black text-4xl lg:text-5xl mb-4">The PAI Ecosystem</h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">Every layer. Every primitive. One seamless experience.</        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {[
            { title: 'Agent Kit', desc: '@pai/core runtime', icon: '⚙️', color: 'from-blue-500 to-cyan-500', href: '/docs/agent-kit' },
            { title: 'Skills Registry', desc: 'skills.pai.build', icon: '🧩', color: 'from-purple-500 to-pink-500', href: '/skills' },
            { title: 'CLI', desc: 'pai create/deploy', icon: '⌨️', color: 'from-green-500 to-emerald-500', href: '/docs/cli' },
            { title: 'MCP Server', desc: 'Any LLM → Pi', icon: '🔌', color: 'from-orange-500 to-red-500', href: '/docs/mcp' },
          ].map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d p-6 group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-dark-300 mb-6">{item.desc}</p>
              <div className="flex items-center gap-2 text-pai-400 font-medium group">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-pai-500/20 to-pai-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="card-3d p-12 max-w-2xl mx-auto border-pai-500/30">
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="w-2 h-2 bg-pai-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-pai-400 uppercase tracking-wider">PAI = BYE</span>
          </div>
          
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-6">
            <GradientText gradient="from-white via-pai-400 to-pai-500">
              Ready to Build the Agent Economy?
            </GradientText>
          </h2>
          
          <p className="text-lg text-dark-300 mb-8 max-w-xl mx-auto">
            Join 1,000+ builders. Deploy your first agent in 5 minutes. 
            Earn from day one with ACP revenue sharing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton 
              href="/playground"
              className="px-10 py-4 text-lg"
            >
              <GradientText gradient="from-pai-400 to-pai-600">Start Building Free →</GradientText>
              <ArrowRight className="w-5 h-5 ml-2" />
            </MagneticButton>
            <a 
              href="/docs" 
              className="btn-secondary px-10 py-4 text-lg"
            >
              Read Docs
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pai-500 rounded-full" />
              <span>Free tier forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <Footer />

    <script>
      // Three.js Avatar Scene
      const canvas = document.getElementById('avatar-canvas');
      if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 1.6, 3);
        
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);
        
        const keyLight = new THREE.DirectionalLight(0x39ff14, 1.2);
        keyLight.position.set(5, 5, 5);
        keyLight.castShadow = true;
        scene.add(keyLight);
        
        const fillLight = new THREE.DirectionalLight(0x39ff14, 0.3);
        fillLight.position.set(-5, 3, -5);
        scene.add(fillLight);
        
        const rimLight = new THREE.DirectionalLight(0x3b82f6, 0.5);
        rimLight.position.set(0, 5, -5);
        scene.add(rimLight);

        // Ground
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(10, 10),
          new THREE.ShadowMaterial({ opacity: 0.1 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.5;
        ground.receiveShadow = true;
        scene.add(ground);

        // Grid helper
        const grid = new THREE.GridHelper(10, 20, 0x39ff14, 0x39ff14);
        grid.material.opacity = 0.05;
        grid.material.transparent = true;
        scene.add(grid);

        // Orbit controls
        const controls = new THREE.OrbitControls(camera, document.getElementById('avatar-canvas'));
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 6;
        controls.maxPolarAngle = Math.PI / 2;

        // Load avatar
        const loader = new THREE.GLTFLoader();
        loader.load('https://assets.pai.build/avatars/companion-v1.glb', (gltf) => {
          const model = gltf.scene;
          model.scale.setScalar(1);
          model.position.y = -1.5;
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          scene.add(model);

          // Animations
          if (gltf.animations.length) {
            const mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach(clip => {
              const action = mixer.clipAction(clip);
              if (clip.name === 'idle') action.play();
            });
            const animate = () => {
              requestAnimationFrame(animate);
              mixer.update(0.016);
              controls.update();
              renderer.render(scene, camera);
            };
            animate();
          } else {
            const animate = () => {
              requestAnimationFrame(animate);
              controls.update();
              renderer.render(scene, camera);
            };
            animate();
          }
        });

        // Resize
        window.addEventListener('resize', () => {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });

        // Particle background
        const particlesCanvas = document.getElementById('particles');
        if (particlesCanvas) {
          const ctx = particlesCanvas.getContext('2d');
          particlesCanvas.width = particlesCanvas.offsetWidth;
          particlesCanvas.height = particlesCanvas.offsetHeight;
          
          const particles = Array.from({length: 50}, () => ({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
          }));
          
          function animateParticles() {
            const ctx = particlesCanvas.getContext('2d');
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            
            particles.forEach(p => {
              p.x += p.speedX;
              p.y += p.speedY;
              if (p.x < 0) p.x = particlesCanvas.width;
              if (p.x > particlesCanvas.width) p.x = 0;
              if (p.y < 0) p.y = particlesCanvas.height;
              if (p.y > particlesCanvas.height) p.y = 0;
              
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(57, 255, 20, ${p.opacity})`;
              ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
          }
          animateParticles();
        }
      </script>
    </body>
</html>