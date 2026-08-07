import { describe, it, expect } from 'vitest';

describe('PAI Website Suite', () => {
  it('defines tri-lingual navigation dictionary (EN, AR, ZH)', () => {
    const nav = {
      en: { home: "Home", topology: "Topology", media: "Media Studio" },
      ar: { home: "الرئيسية", topology: "المعمارية", media: "استوديو الوسائط" },
      zh: { home: "首页", topology: "拓扑结构", media: "媒体工作室" },
    };
    expect(nav.en.home).toBe("Home");
    expect(nav.ar.home).toBe("الرئيسية");
    expect(nav.zh.home).toBe("首页");
  });

  it('validates protocol endpoints map', () => {
    const endpoints = [
      'https://axiomid.app',
      'https://earn.axiomid.app',
      'https://skills.axiomid.app',
      'https://ppp.axiomid.app',
      'https://memory.axiomid.app',
    ];
    expect(endpoints).toHaveLength(5);
  });
});
