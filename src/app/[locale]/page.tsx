'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function LocalePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Three.js 3D animation
    if (typeof window !== 'undefined') {
      import('three').then((THREE) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x00f2fe, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // Create floating geometric shapes
        const geometry = new THREE.IcosahedronGeometry(1, 0)
        const material = new THREE.MeshStandardMaterial({
          color: 0x00f2fe,
          metalness: 0.3,
          roughness: 0.4,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        })

        const meshes: THREE.Mesh[] = []
        for (let i = 0; i < 15; i++) {
          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20 - 10
          )
          mesh.rotation.set(Math.random(), Math.random(), Math.random())
          mesh.scale.setScalar(Math.random() * 0.5 + 0.2)
          scene.add(mesh)
          meshes.push(mesh)
        }

        camera.position.z = 15

        const animate = () => {
          requestAnimationFrame(animate)
          meshes.forEach((mesh, i) => {
            mesh.rotation.x += 0.001 * (i + 1)
            mesh.rotation.y += 0.002 * (i + 1)
            mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
          })
          renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          renderer.dispose()
        }
      })

      // Particle background
      const particlesCanvas = particlesRef.current
      if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d')
        if (!ctx) return

        particlesCanvas.width = particlesCanvas.offsetWidth
        particlesCanvas.height = particlesCanvas.offsetHeight

        const particles = Array.from({ length: 50 }, () => ({
          x: Math.random() * particlesCanvas.width,
          y: Math.random() * particlesCanvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        }))

        const animateParticles = () => {
          const ctx = particlesCanvas.getContext('2d')
          if (!ctx) return

          ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height)

          particles.forEach((p) => {
            p.x += p.speedX
            p.y += p.speedY
            if (p.x < 0) p.x = particlesCanvas.width
            if (p.x > particlesCanvas.width) p.x = 0
            if (p.y < 0) p.y = particlesCanvas.height
            if (p.y > particlesCanvas.height) p.y = 0

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`
            ctx.fill()
          })

          requestAnimationFrame(animateParticles)
        }
        animateParticles()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--canvas)] relative overflow-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={particlesRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-8 py-20">
          {/* Header */}
          <header className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE EDGE WORKER
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
              PAI <span className="text-emerald-400">Universe</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The Agent Economy&apos;s Operating System. Build, deploy, and monetize AI agents on Pi Network.
              60M users. 18M KYC. Native payments.
            </p>
          </header>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-cyan-500/25"
            >
              Explore Skills
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-sm"
            >
              Deploy Agent
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
              60M+ Pioneers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
              18M+ KYC
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
              Zero Gas
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
              W3C DID
            </span>
          </div>

          {/* Navigation Cards */}
          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
            {[
              { href: '/vai', label: 'PAI-VAI', desc: 'Identity & Passports', icon: '🆔' },
              { href: '/try', label: 'PAI-TRY', desc: 'Agent Playground', icon: '🤖' },
              { href: '/buy', label: 'PAI-BUY', desc: 'Skills Marketplace', icon: '🛒' },
              { href: '/fly', label: 'PAI-FLY', desc: 'Agentic Travel', icon: '✈️' },
              { href: '/new', label: 'PAI-NEW', desc: 'Truth-Scored News', icon: '📰' },
              { href: '/hai', label: 'PAI-HAI', desc: 'Trust Layer', icon: '🛡️' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-lg text-white mb-1">{item.label}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </Link>
            ))}
          </nav>
        </div>
      </main>

      {/* Global Styles Injection */}
      <style>{
        `
        :root {
          --canvas: #0a0d14;
          --surfaceDark: #0f172a;
          --surfaceBorder: #1e293b;
          --primaryCyan: #00F2FE;
          --emeraldGreen: #10B981;
          --accentPurple: #a855f7;
          --textPrimary: #FFFFFF;
          --textSecondary: #94a3b8;
          --textMuted: #64748b;
        }
        .font-display {
          font-family: 'Space Grotesk', 'Geist', 'Inter', sans-serif;
        }
        @font-face {
          font-family: 'Space Grotesk';
          src: local('Space Grotesk');
        }
      `}</style>
    </div>
  )
}