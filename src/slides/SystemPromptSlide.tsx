import { forwardRef, useEffect, useRef, useState } from 'react';
import { SlideDefinition } from '../types/slides';
import { exportRegistry } from '../components/exportRegistry';
import { T } from '../context/LanguageContext';

const SLIDE_ID = 'system-prompt';
// Offline fallbacks: bundled snapshots of both prompts, used when the live fetch fails
// (no network / blocked) so the slide still works on stage Wi-Fi.
import claudeFallback from '../assets/cc-system-prompt.md?raw';
// The `instructions_template` of gpt-6.1-sol (Codex's default model) from openai/codex
// codex-rs/models-manager/models.json, snapshot 2026-11-04.
import codexFallback from '../assets/codex-system-prompt.md?raw';

const CLAUDE_URL = 'https://raw.githubusercontent.com/marckrenn/claude-code-changelog/refs/heads/main/cc-prompt.md';
const CODEX_URL = 'https://raw.githubusercontent.com/openai/codex/main/codex-rs/models-manager/models.json';
const CODEX_MODEL = 'gpt-6.1-sol';

async function loadClaude(): Promise<string> {
  const res = await fetch(CLAUDE_URL);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.text();
}

async function loadCodex(): Promise<string> {
  const res = await fetch(CODEX_URL);
  if (!res.ok) throw new Error('Failed to fetch');
  const catalog = await res.json();
  const models: { slug: string; model_messages?: { instructions_template?: string } }[] = catalog.models ?? catalog;
  const prompt = models.find((m) => m.slug === CODEX_MODEL)?.model_messages?.instructions_template;
  if (!prompt) throw new Error(`${CODEX_MODEL} has no instructions`);
  return prompt;
}

type Source = { key: 'claude' | 'codex'; load: () => Promise<string>; fallback: string; banner: (text: string) => string };

const SOURCES: Source[] = [
  {
    key: 'claude',
    load: loadClaude,
    fallback: claudeFallback,
    // Pull the version out of the prompt's title line ("# Claude Code Version 2.1.156").
    banner: (text) => {
      const v = text.match(/Claude Code Version\s+([0-9][0-9.]*)/i);
      return `CLAUDE CODE ${v ? `v${v[1]}` : 'LIVE'}`;
    },
  },
  { key: 'codex', load: loadCodex, fallback: codexFallback, banner: () => `CODEX · ${CODEX_MODEL.toUpperCase()}` },
];

const RULE = 32;

// Both panels share ONE scroll curve in pixels, so they move at the same speed; each stops at
// its own end. The curve accelerates (time → share of the LONGEST prompt's distance) and
// reaches the end of the longest prompt at SCROLL_MS.
const SCROLL_MS = 90_000;
const START_DELAY_MS = 800;
const CURVE: [number, number][] = [[0, 0], [0.2, 0.02], [0.4, 0.1], [0.6, 0.25], [0.8, 0.5], [1, 1]];

function curve(t: number): number {
  for (let i = 1; i < CURVE.length; i++) {
    const [t1, p1] = CURVE[i];
    if (t <= t1) {
      const [t0, p0] = CURVE[i - 1];
      return p0 + ((t - t0) / (t1 - t0)) * (p1 - p0);
    }
  }
  return 1;
}

/** A machine panel: one prompt scrolls past at the code tier, ever faster. */
const PromptPanel = forwardRef<HTMLDivElement, { text: string; banner: string }>(function PromptPanel(
  { text, banner },
  ref,
) {
  return (
    <div className="system-prompt-container">
      <div ref={ref} className="system-prompt-text">
        <div className="system-prompt-text__banner">
          {'═'.repeat(RULE)}
          <br />
          ░░ {banner} ░░
          <br />
          {'═'.repeat(RULE)}
        </div>

        <div>{text}</div>

        <div className="system-prompt-text__footer">
          <br />
          {'─'.repeat(RULE)}
          <br />
          [END OF TRANSMISSION]
          <br />
          {'─'.repeat(RULE)}
        </div>
      </div>
      <div className="system-prompt-container__corners" aria-hidden />
    </div>
  );
});

/** Distance a panel's text can travel: until its footer sits at the panel's bottom. */
const travel = (el: HTMLElement) => Math.max(0, el.scrollHeight - (el.parentElement?.clientHeight ?? 0));

function useSharedScroll(panels: React.MutableRefObject<(HTMLDivElement | null)[]>, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const els = panels.current.filter((el): el is HTMLDivElement => el !== null);
      const longest = Math.max(...els.map(travel));
      const px = longest * curve(Math.min(1, (now - start) / SCROLL_MS));
      els.forEach((el) => el.style.setProperty('--scroll', `${-Math.min(px, travel(el))}px`));
      if (now - start < SCROLL_MS) frame = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, START_DELAY_MS);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [panels, ready]);
}

function SystemPromptContent() {
  const [texts, setTexts] = useState<(string | null)[]>(SOURCES.map(() => null));

  // Fetch both prompts on mount; each falls back to its bundled copy on failure.
  useEffect(() => {
    SOURCES.forEach((source, i) => {
      source
        .load()
        .catch(() => source.fallback)
        .then((text) => setTexts((prev) => prev.map((t, k) => (k === i ? text : t))));
    });
  }, []);

  const ready = texts.every((t) => t !== null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  useSharedScroll(panels, ready);

  // Genuinely async (asyncSettle: true): tell the PDF exporter the slide is
  // ready only once both prompts — live or bundled — are in.
  useEffect(() => {
    if (ready) exportRegistry.markSlideSettled(SLIDE_ID);
  }, [ready]);

  // Loading state - terminal boot sequence
  if (!ready) {
    return (
      <div className="system-prompt-loading">
        <div className="system-prompt-loading__status">
          <span className="text-dim">[</span>
          INITIALIZING SECURE CONNECTION
          <span className="text-dim">]</span>
        </div>
        <div className="system-prompt-loading__dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="system-prompt-loading__dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="system-prompt-loading__caption">RETRIEVING SYSTEM PROMPTS...</div>
      </div>
    );
  }

  return (
    <div className="system-prompt-pair">
      {SOURCES.map((source, i) => (
        <PromptPanel
          key={source.key}
          ref={(el) => {
            panels.current[i] = el;
          }}
          text={texts[i]!}
          banner={source.banner(texts[i]!)}
        />
      ))}
    </div>
  );
}

export const SystemPromptSlide: SlideDefinition = {
  id: SLIDE_ID,
  asyncSettle: true,
  title: (
    <>
      {/* UA: Yarik's wording. The prompts themselves and the machine chrome
          (INITIALIZING…, banners) stay English in both languages. */}
      <span className="text-dim">&gt;</span>{' '}
      <T uk="покажи системний промпт" en="show me the system prompt" />
    </>
  ),
  content: <SystemPromptContent />,
  notes:
    'Left: Claude Code (live from marckrenn/claude-code-changelog). Right: Codex — the '
    + 'instructions_template of gpt-6.1-sol, live from openai/codex models.json. Both fall back to '
    + 'bundled snapshots offline. Same scroll speed: Codex (~2.7× shorter) ends first and holds on '
    + '[END OF TRANSMISSION] while Claude keeps going.',
};
