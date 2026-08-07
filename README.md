<div align="center">

```ascii
 ╔═══════════════════════════════════════════════════════════════════════════╗
 ║   _  _  _  _  _  ____  _  _  _  _  _  ____  ____  _  _  ____  ____  ____  ║
 ║  / )( \( \/ )( \/ ___)( \/ )( \/ )( \/ ___)(  _ \( \/ )/ ___)/ ___)(  _ \ ║
 ║  ) __ ( )  (  ) )\___ \ )  /  )  (  ) )\___ \ ) __/ )  / \___ \\___ \ ) __/ ║
 ║  \_)(_/(_/\_)(_/ (____/(_/   (_/\_)(_/ (____/(__)  (_/  (____/(____/(__)   ║
 ║                                                                           ║
 ║                 A X I O M  I D  |  P A I  U N I V E R S E                 ║
 ╚═══════════════════════════════════════════════════════════════════════════╝
```

</div>
<!-- Stack: Next.js 15, Tailwind 4, Three.js, MDX         -->
<!-- Live at: pai-website.vercel.app                       -->
<!-- Updated: 2026-08-05                                 -->
<!-- ══════════════════════════════════════════════════════ -->

<div align="center">
  <img src="https://img.shields.io/badge/status-live-00FF41?style=flat-square&labelColor=0D1117" />
  <img src="https://img.shields.io/github/license/pai-list/pai-website?style=flat-square&color=00A36C&labelColor=0D1117" />
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&labelColor=0D1117" />
  <img src="https://img.shields.io/badge/i18n-EN%2FAR%2FZH-39FF14?style=flat-square&labelColor=0D1117" />
  <br/>
  <a href="https://pai-website.vercel.app">🌐 Live Site →</a>
</div>

<div align="center">
<pre>
 ██████╗  █████╗  ██╗    ██╗    ██╗███████╗██████╗ ███████╗██╗████████╗███████╗
 ██╔══██╗██╔══██╗██║    ██║    ██║██════╝██╔══██╗██════╝██║╚══██╔══╝██╔════╝
 ██████╔╝███████║██║    ██║ █╗ ██║█████╗  ██████╔╝█████╗  ██║   ██║   █████╗
 ██╔═══╝ ██══██║██║    ██║███╗██║██══╝  ██╔══██╗██══╝  ██║   ██║   ██══╝
 ██║     ██║  ██║██║    ╚███╔███╔╝███████╗██║  ██║███████╗██║   ██║   ███████╗
 ╚═╝     ╚═╝  ╚═╝╚═╝     ╚══╝╚══╝ ╚══════╝╚═╝  ╚══════╝╚═╝   ╚══════╝
</pre>
</div>

# PAI Website · البيت

**The entry point to the PAI Universe — a trilingual (EN/AR/ZH) marketing hub and agent playground built with Next.js 15.**

---

## Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Landing Page** | ✅ **Live** | `pai-website.vercel.app` |
| **i18n (EN/AR/ZH)** | ✅ **Done** | RTL support for Arabic |
| **PPP Topology Page** | ✅ **Live** | Interactive topology visualization |
| **3D Skill System** | ✅ **Live** | Three.js skill avatars |
| **App Directory** | ⏳ **Planned** | Live agent cards with Pi/PAI badges |
| **Identity Widget** | ⏳ **Planned** | AxiomID session → trust score, DID |

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind 4
- **3D:** Three.js + React Three Fiber
- **i18n:** Custom router (EN/AR/ZH with RTL)
- **Deploy:** Vercel

---

## Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routes
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Landing
│   │   ├── ppp/           # PPP topology + media pages
│   │   └── ...
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                # Shared UI components
│   ├── PAIHeader.tsx
│   ├── PAILogo.tsx
│   └── Header.tsx
├── lib/
│   ├── i18n/              # EN/AR/ZH config
│   ├── vercel-labs-ecosystem.ts
│   └── utils.ts
└── ...
```

---

## Deployment

- **Platform:** Vercel
- **Domain:** `pai-website.vercel.app`
- **Custom domain:** TBD (configure when ready)

---

## License

MIT — Free for all agents, all humans, all purposes.

---

*Part of the PAI Universe. The marketing hub for Pi + AI.*
