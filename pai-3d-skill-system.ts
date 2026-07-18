// PAI 3D Skill System - Core Types & Architecture
// Inspired by three.ws + specui patterns + PAI Atom

// ============================================
// 1. PAI 3D SKILL MANIFEST (like three.ws avatar config + specui spec)
// ============================================

export interface PAI3DSkillManifest {
  // Identity
  name: string;                    // "pai-verify-3d"
  version: string;                 // "1.0.0"
  displayName: string;             // "Pi KYC Verifier 3D"
  description: string;             // "Interactive 3D KYC verification with live avatar"
  
  // PAI Atom compatibility
  atom: {
    name: string;
    price: number;                 // USDC per call
    permissions: string[];         // ["wallet:read", "pi:mainnet", "kyc:verify"]
    sandbox: "wasm" | "js" | "native";
  };
  
  // 3D Configuration (three.ws pattern)
  avatar: {
    modelUrl: string;              // GLB/glTF URL
    animations: Record<string, string>; // "idle" -> url, "talk" -> url, "verify" -> url
    scale: number;
    position: [number, number, number];
    emotions: string[];            // ["neutral", "thinking", "success", "warning"]
  };
  
  // Brain (LLM integration)
  brain: {
    systemPrompt: string;
    model: string;                 // "gpt-4o", "claude-3.5-sonnet", "local"
    temperature: number;
    tools: string[];               // ["pi-kyc", "pi-pay", "trust-check"]
    memory: "short" | "long" | "persistent";
  };
  
  // Payments (ACP + Pi)
  commerce: {
    pricePerCall: number;
    currency: "USDC" | "PI";
    x402Enabled: boolean;
    revenueSplit: { author: 0.9; platform: 0.1 };
  };
  
  // Skills composition (specui pattern)
  composes: string[];              // ["pai-trust", "pai-did"]
  
  // Languages support
  languages: string[];             // ["rust", "go", "js", "py", "zig", "php"]
  
  // Embedding
  embed: {
    webComponent: string;          // "<pai-verify-3d></pai-verify-3d>"
    iframe: boolean;
    size: "sm" | "md" | "lg" | "full";
  };
}

// ============================================
// 2. PAI SPEC UI PATTERN (like specui) - YAML Spec → Code
// ============================================

export interface PAISpec {
  meta: {
    name: string;
    version: string;
    description: string;
    author: string;
    license: string;
    tags: string[];
  };
  
  // Skill definition (like specui spec)
  skill: {
    // Input/Output contracts (Zod schemas)
    input: Record<string, any>;    // Zod schema as JSON
    output: Record<string, any>;   // Zod schema as JSON
    
    // Implementation targets
    targets: {
      rust?: { crate: string; features?: string[] };
      go?: { module: string; tags?: string[] };
      javascript?: { runtime: "node" | "bun" | "deno" | "browser"; bundler?: "esbuild" | "webpack" | "vite" };
      python?: { package: string; deps?: string[] };
      zig?: { version: string };
      php?: { composer: string; extensions?: string[] };
    };
    
    // Generation config
    generate: {
      client: boolean;
      server: boolean;
      tests: boolean;
      docs: boolean;
      playground: boolean;
    };
  };
  
  // 3D Avatar config (optional)
  avatar?: {
    model: string;
    animations: Record<string, string>;
    emotions: string[];
  };
  
  // Payments
  payments?: {
    price: number;
    currency: string;
    x402: boolean;
  };
  
  // Testing
  tests?: {
    unit: string[];
    integration: string[];
    e2e: string[];
  };
}

// SpecUI-style generator
export class PAISpecGenerator {
  constructor(private spec: PAISpec) {}
  
  // Generate for all targets
  async generateAll(): Promise<Record<string, string>> {
    const files: Record<string, string> = {};
    
    // Rust
    if (this.spec.skill.targets.rust) {
      files["src/lib.rs"] = this.generateRust();
      files["Cargo.toml"] = this.generateCargoToml();
    }
    
    // Go
    if (this.spec.skill.targets.go) {
      files["skill.go"] = this.generateGo();
      files["go.mod"] = this.generateGoMod();
    }
    
    // JavaScript/TypeScript
    if (this.spec.skill.targets.javascript) {
      files["src/skill.ts"] = this.generateTypeScript();
      files["package.json"] = this.generatePackageJson();
    }
    
    // Python
    if (this.spec.skill.targets.python) {
      files["skill.py"] = this.generatePython();
      files["pyproject.toml"] = this.generatePyProjectToml();
    }
    
    // Zig
    if (this.spec.skill.targets.zig) {
      files["skill.zig"] = this.generateZig();
      files["build.zig"] = this.generateBuildZig();
    }
    
    // PHP
    if (this.spec.skill.targets.php) {
      files["Skill.php"] = this.generatePHP();
      files["composer.json"] = this.generateComposerJson();
    }
    
    // 3D Avatar (if specified)
    if (this.spec.avatar) {
      files["avatar/config.json"] = JSON.stringify(this.spec.avatar, null, 2);
      files["avatar/embed.tsx"] = this.generateWebComponent();
    }
    
    // Playground
    if (this.spec.skill.generate.playground) {
      files["playground/index.html"] = this.generatePlayground();
    }
    
    // Tests
    if (this.spec.skill.generate.tests) {
      files["tests/unit.test.ts"] = this.generateTests();
    }
    
    // Docs
    if (this.spec.skill.generate.docs) {
      files["docs/README.md"] = this.generateDocs();
    }
    
    return files;
  }
  
  private generateRust(): string { return `// PAI 3D Skill - Rust\nuse serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize)]\npub struct ${this.spec.meta.name.pascalCase()}Skill {\n  // ... implementation\n}\n`; }
  
  private generateGo(): string { return `// PAI 3D Skill - Go\npackage main\n\nimport (\n  "encoding/json"\n)\n\ntype ${this.spec.meta.name.pascalCase()}Skill struct {\n  // ... implementation\n}\n`; }
  
  private generateTypeScript(): string { return `// PAI 3D Skill - TypeScript\nimport { z } from "zod";\n\nexport const ${this.spec.meta.name.camelCase()}Schema = z.object({\n  // input schema\n});\n`; }
  
  private generatePython(): string { return `# PAI 3D Skill - Python\nfrom pydantic import BaseModel\nfrom typing import Optional\n\nclass ${this.spec.meta.name.pascalCase()}Skill(BaseModel):\n    # ... implementation\n`; }
  
  private generateZig(): string { return `// PAI 3D Skill - Zig\nconst std = @import("std");\n\npub fn run() !void {\n    // ... implementation\n}\n`; }
  
  private generatePHP(): string { return `<?php\n// PAI 3D Skill - PHP\nnamespace PAI\\Skill;\n\nclass ${this.spec.meta.name.pascalCase()}Skill {\n    // ... implementation\n}\n`; }
  
  private generateWebComponent(): string { return ``; }
  private generatePlayground(): string { return ``; }
  private generateTests(): string { return ``; }
  private generateDocs(): string { return ``; }
  private generateCargoToml(): string { return ``; }
  private generateGoMod(): string { return ``; }
  private generatePackageJson(): string { return ``; }
  private generatePyProjectToml(): string { return ``; }
  private generateBuildZig(): string { return ``; }
  private generateComposerJson(): string { return ``; }
}

// String helpers
declare global {
  interface String {
    pascalCase(): string;
    camelCase(): string;
  }
}

String.prototype.pascalCase = function() {
  return this.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
};

String.prototype.camelCase = function() {
  const pascal = this.pascalCase();
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

// ============================================
// 3. PAI 3D SKILL REGISTRY (like three.ws registry + specui registry)
// ============================================

export interface PAI3DSkillRegistryEntry {
  manifest: PAI3DSkillManifest;
  spec: PAISpec;
  
  // Computed
  installCount: number;
  rating: number;
  verified: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  
  // Revenue
  totalRevenue: number;
  callsLast24h: number;
  callsAllTime: number;
  
  // Health
  uptime: number;
  avgLatency: number;
  errorRate: number;
}

export class PAI3DSkillRegistry {
  private skills = new Map<string, PAI3DSkillRegistryEntry>();
  
  async register(manifest: PAI3DSkillManifest, spec: PAISpec): Promise<void> {
    const entry: PAI3DSkillRegistryEntry = {
      manifest,
      spec,
      installCount: 0,
      rating: 0,
      verified: false,
      author: manifest.atom.acp.agentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalRevenue: 0,
      callsLast24h: 0,
      callsAllTime: 0,
      uptime: 100,
      avgLatency: 0,
      errorRate: 0,
    };
    
    this.skills.set(manifest.name, entry);
  }
  
  async search(query: string, filters?: {
    category?: string;
    verified?: boolean;
    priceRange?: [number, number];
    language?: string;
  }): Promise<PAI3DSkillRegistryEntry[]> {
    // Implement Meilisearch/Typesense integration
    return Array.from(this.skills.values())
      .filter(s => s.manifest.name.includes(query))
      .slice(0, 20);
  }
  
  async install(name: string, version?: string): Promise<PAI3DSkillRegistryEntry> {
    const skill = this.skills.get(name);
    if (!skill) throw new Error(`Skill ${name} not found`);
    
    skill.installCount++;
    return skill;
  }
  
  // Revenue tracking
  async recordExecution(skillName: string, revenue: number): void {
    const skill = this.skills.get(skillName);
    if (skill) {
      skill.totalRevenue += revenue;
      skill.callsAllTime++;
      skill.callsLast24h++;
    }
  }
}

// ============================================
// 4. PAI 3D EMBED SYSTEM (like three.ws web component)
// ============================================

export class PAI3DEmbed {
  static async mount(selector: string, skillName: string, options?: {
    size?: "sm" | "md" | "lg" | "full";
    theme?: "dark" | "light" | "auto";
    apiKey?: string;
    onResult?: (result: any) => void;
    onError?: (error: Error) => void;
  }): Promise<void> {
    // 1. Load Three.js + PAI 3D runtime
    await this.loadRuntime();
    
    // 2. Fetch skill manifest
    const manifest = await this.fetchManifest(skillName);
    
    // 3. Create Three.js scene
    const scene = await this.createScene(manifest);
    
    // 4. Mount web component
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    
    // 4. Initialize avatar + brain
    const avatar = await this.loadAvatar(manifest.avatar);
    const brain = await this.initBrain(manifest.brain);
    
    // 5. Connect payments (x402)
    await this.initPayments(manifest.commerce);
    
    // 6. Ready
    element.innerHTML = '';
    element.appendChild(scene.canvas);
    
    // Store reference for interaction
    (window as any).__PAI_SKILLS__ = (window as any).__PAI_SKILLS__ || {};
    (window as any).__PAI_SKILLS__[skillName] = { scene, avatar, brain };
  }
  
  private static async loadRuntime(): Promise<void> {
    // Dynamic import Three.js + PAI runtime
    if (!(window as any).THREE) {
      await import('three');
    }
    if (!(window as any).PAI_RUNTIME) {
      await import('@pai/3d-runtime');
    }
  }
  
  private static async fetchManifest(name: string): Promise<PAI3DSkillManifest> {
    const res = await fetch(`https://skills.pai.build/api/skills/${name}/manifest`);
    return res.json();
  }
  
  private static async createScene(manifest: PAI3DSkillManifest): Promise<THREE.Scene> {
    // Create Three.js scene with lighting, camera
    const scene = new THREE.Scene();
    // ... setup
    return scene;
  }
  
  private static async loadAvatar(config: PAI3DSkillManifest['avatar']): Promise<THREE.Group> {
    // Load GLB/glTF model
    const loader = new THREE.GLTFLoader();
    const gltf = await loader.loadAsync(config.modelUrl);
    // Setup animations
    return gltf.scene;
  }
  
  private static async initBrain(config: PAI3DSkillManifest['brain']): Promise<any> {
    // Initialize LLM brain with tools
    return {};
  }
  
  private static async initPayments(config: PAI3DSkillManifest['commerce']): Promise<void> {
    // Initialize x402 / ACP payments
  }
}

// Type augmentation for global
declare global {
  interface Window {
    __PAI_SKILLS__: Record<string, {
      scene: THREE.Scene;
      avatar: THREE.Group;
      brain: any;
    }>;
  }
}

// ============================================
// 5. EXAMPLE: PAI VERIFY 3D SKILL SPEC
// ============================================

export const paiVerify3DSpec: PAISpec = {
  meta: {
    name: "pai-verify-3d",
    version: "1.0.0",
    description: "Interactive 3D Pi KYC verification with live avatar",
    author: "PAI Team",
    license: "MIT",
    tags: ["kyc", "verification", "pi-network", "3d", "avatar"],
  },
  
  skill: {
    input: {
      walletAddress: { type: "string", pattern: "^0x[a-fA-F0-9]{40}$" },
      piUsername: { type: "string", minLength: 3 },
      callbackUrl: { type: "string", format: "uri" },
    },
    output: {
      verified: { type: "boolean" },
      attestation: { type: "string" },
      proofHash: { type: "string", pattern: "^0x[a-fA-F0-9]{64}$" },
      expiresAt: { type: "string", format: "date-time" },
      trustScoreBoost: { type: "number", minimum: 0, maximum: 100 },
    },
    
    targets: {
      rust: { crate: "pai-verify-3d", features: ["wasm"] },
      go: { module: "github.com/pai-list/verify-3d" },
      javascript: { runtime: "browser", bundler: "vite" },
      python: { package: "pai-verify-3d" },
      zig: { version: "0.12" },
      php: { composer: "pai-list/verify-3d" },
    },
    
    generate: {
      client: true,
      server: true,
      tests: true,
      docs: true,
      playground: true,
    },
  },
  
  avatar: {
    model: "https://assets.pai.build/avatars/verifier-v1.glb",
    animations: {
      idle: "https://assets.pai.build/animations/idle.glb",
      thinking: "https://assets.pai.build/animations/thinking.glb",
      verify: "https://assets.pai.build/animations/verify.glb",
      success: "https://assets.pai.build/animations/success.glb",
      warning: "https://assets.pai.build/animations/warning.glb",
    },
    emotions: ["neutral", "thinking", "success", "warning", "error"],
  },
  
  payments: {
    price: 0.04,
    currency: "USDC",
    x402: true,
  },
  
  tests: {
    unit: ["verify-input-validation", "verify-output-schema", "avatar-load", "animation-states"],
    integration: ["pi-kyc-flow", "acp-payment", "receipt-generation"],
    e2e: ["full-verification-flow", "embed-in-react", "embed-in-vue", "embed-in-svelte"],
  },
};

// Generate all code
const generator = new PAISpecGenerator(paiVerify3DSpec);
const files = await generator.generateAll();

// Write files
for (const [path, content] of Object.entries(files)) {
  await Bun.write(`./packages/pai-verify-3d/${path}`, content);
}

console.log("✅ PAI Verify 3D Skill generated for all targets!");
console.log("Files:", Object.keys(files).join(", "));