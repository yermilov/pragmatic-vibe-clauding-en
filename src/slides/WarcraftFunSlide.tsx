import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, revealWindow } from '../components/SlideElements';
import { Lang, T, tr } from '../context/LanguageContext';
import warcraftComplete from '../assets/warcraft-complete.wav?url';
import warcraftYes from '../assets/warcraft-yes.wav?url';
import warcraftWhat from '../assets/warcraft-what.wav?url';
import peasantFace from '../assets/warcraft-peasant-permission.jpeg?url';

// The prompt stays English in both languages — it is what you type to the agent. Tool- and
// OS-neutral: one shared sound folder, wired into each agent's own hook format, played with
// whatever the OS has. Hook events verified 05.11.2026: Claude Code — Notification + Stop in
// ~/.claude/settings.json; Codex 0.166 — PermissionRequest + Stop in ~/.codex/hooks.json
// behind [features] hooks = true.
const PROMPT_CODE = `> Download the Warcraft 2 Peasant (Alliance) and Peon (Horde) sounds — Ready, Yes, Job Complete and What; skip the "Pissed" category — from warcraft.wiki.gg/wiki/Quotes_of_Warcraft_II#Peon into ~/.agent-sounds/warcraft2/{ready,yes,complete,what}/.

Use curl with a browser User-Agent header and download the files one at a time with small delays to avoid rate limiting. Verify each .wav is real audio (a RIFF/WAVE header), not an HTML or JSON error page.

Then add two hooks to every coding agent I have installed, in each agent's own hook format:
- the agent waits for my permission → play a random "What?" sound
- the agent finishes → play a random ready/yes/complete sound

Where the hooks go:
- Claude Code: Notification + Stop hooks in ~/.claude/settings.json
- Codex: PermissionRequest + Stop hooks in ~/.codex/hooks.json (needs [features] hooks = true in ~/.codex/config.toml)

Detect my OS first and play sounds with what it has: afplay on macOS, paplay or aplay on Linux, PowerShell's System.Media.SoundPlayer on Windows (where ~ means %USERPROFILE%).

Check each agent's docs to confirm the hook format before editing.`;

/** Copies the prompt; the label flips to "copied" for a moment. Terminal chrome: English in both. */
function CopyPromptButton() {
  const [copied, setCopied] = useState(false);
  // fallback for a page without clipboard permission
  const copyViaTextarea = () => {
    const area = document.createElement('textarea');
    area.value = PROMPT_CODE;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  };
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(PROMPT_CODE).catch(copyViaTextarea);
    else copyViaTextarea();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      type="button"
      className={`warcraft-fun-copy ${copied ? 'is-copied' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        copy();
      }}
    >
      {copied ? '[ copied ✓ ]' : '[ copy ]'}
    </button>
  );
}

/** Shrinks the prompt's type only as far as it takes to fit its panel (Yarik, 05.11.2026:
 *  a smaller font beats cutting information from the prompt). Re-fits on resize. */
const FLOOR = 0.6;

function useFitText(ref: React.RefObject<HTMLElement>, active: boolean) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const fits = () => el.scrollHeight <= el.clientHeight + 1;
    const fit = () => {
      el.classList.remove('is-scrolling');
      el.style.setProperty('--prompt-fit', '1');
      if (fits()) return;
      // never below FLOOR of the code tier: past that (phones) the panel scrolls instead
      el.style.setProperty('--prompt-fit', String(FLOOR));
      if (!fits()) {
        el.classList.add('is-scrolling');
        return;
      }
      let lo = FLOOR;
      let hi = 1;
      for (let k = 0; k < 7; k++) {
        const mid = (lo + hi) / 2;
        el.style.setProperty('--prompt-fit', String(mid));
        if (fits()) lo = mid;
        else hi = mid;
      }
      el.style.setProperty('--prompt-fit', String(lo));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    // web fonts landing late change the line breaks — re-fit then too
    document.fonts?.addEventListener('loadingdone', fit);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener('loadingdone', fit);
    };
  }, [ref, active]);
}

// UA copy: dou-days-2026 WarcraftFunSlide; bullet 1 is Yarik's wording (05.11.2026, EN: own
// translation), bullet 3 drops the marketplace clause to match EN.
const BULLETS_UK = [
  <>
    будьте готові, що запускаєте агента з великим завданням, повертаєтеся через{' '}
    <Emphasis color="orange">30 хвилин</Emphasis> — а він увесь цей час
    чекав на дозвіл виконати <Emphasis color="green">grep</Emphasis> у
    вашому коді
  </>,
  <>
    зробіть <Emphasis color="green">скіл</Emphasis>, який вмикатиме{' '}
    <Emphasis color="orange">звук юніта з Warcraft</Emphasis> щоразу, коли
    агент зупиняється
  </>,
  <>
    але готуйтеся до того, що ваш офіс звучатиме як{' '}
    <Emphasis color="green">комп'ютерний клуб 2000-х</Emphasis>
  </>,
];

const BULLETS_EN = [
  <>
    be ready: you kick off the agent on a big task, come back{' '}
    <Emphasis color="orange">30 minutes</Emphasis> later — and it spent
    the whole time waiting for permission to run a{' '}
    <Emphasis color="green">grep</Emphasis> on your code
  </>,
  <>
    make a <Emphasis color="green">skill</Emphasis> that plays a{' '}
    <Emphasis color="orange">Warcraft unit sound</Emphasis> every time
    the agent stops
  </>,
  <>
    but get ready for your
    office to sound like a{' '}
    <Emphasis color="green">2000s LAN café</Emphasis>
  </>,
];

function WarcraftFunContent({ revealStage, lang }: { revealStage: number; lang: Lang }) {
  // Track which stages have already triggered audio so re-renders within the
  // same stage don't replay the cascade.
  const triggeredRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (triggeredRef.current.has(revealStage)) return;

    if (revealStage === 2) {
      triggeredRef.current.add(2);
      const a = new Audio(warcraftComplete);
      a.volume = 0.95;
      void a.play().catch(() => {});
      return;
    }

    if (revealStage === 3) {
      triggeredRef.current.add(3);
      // 2000s LAN-café cacophony: stagger seven plays across ~1.6s,
      // overlapping yes/complete/what so the office sounds chaotic.
      const cascade = [
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
      ];
      const timers = cascade.map((src, i) =>
        window.setTimeout(() => {
          const a = new Audio(src);
          a.volume = 0.7;
          void a.play().catch(() => {});
        }, i * 220),
      );
      return () => {
        timers.forEach(window.clearTimeout);
      };
    }
  }, [revealStage]);

  const showImage = revealStage === 1;
  const showCode = revealStage >= 2;
  const promptRef = useRef<HTMLPreElement>(null);
  useFitText(promptRef, showCode);

  return (
    <>
      <div className="warcraft-fun-body">
        {/* Left column — bullets, revealed one per stage. */}
        <div className="warcraft-fun-bullets">
          {/* a window of two: the pain point gives way to the punchline */}
          {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 2).map(({ item, index, hidden }) => (
            <SlideItem key={index} delay={index === 0 ? 0.05 : 0} reveal={index > 0} hidden={hidden}>
              {item}
            </SlideItem>
          ))}
        </div>

        {/* Right column — image at stage 1, framed prompt panel at stage 2+. */}
        {showImage && (
          <div className="warcraft-fun-right--image" key="image">
            <img
              src={peasantFace}
              alt={tr(lang, 'Селянин з Warcraft II — work, work.', 'Warcraft II peasant — work, work.')}
              loading="lazy"
              className="warcraft-fun-peasant"
            />
          </div>
        )}

        {showCode && (
          <div className="warcraft-fun-panel" key="code">
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--top">
              <span>░░░ prompt ░░░</span>
              <CopyPromptButton />
            </div>
            <div className="warcraft-fun-panel__viewport">
              <pre ref={promptRef} className="warcraft-fun-prompt">{PROMPT_CODE}</pre>
            </div>
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--bottom">
              [WORK COMPLETE]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const WarcraftFunSlide: SlideDefinition = {
  id: 'warcraft-fun',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      {/* UA: own translation */}
      <span className="text-green"><T uk="трохи розваг" en="have some fun" /></span>
    </>
  ),
  maxRevealStages: 3,
  content: ({ revealStage, lang }: SlideContentProps) => <WarcraftFunContent revealStage={revealStage} lang={lang} />,
  notes:
    'Stage 0: question title only. Stage 1: the familiar pain (the agent stuck on a grep permission) + peasant face. Stage 2: the fix — a skill that plays a Warcraft unit sound on the Stop / permission hooks (Claude Code and Codex) + the prompt + one "work complete" sound. Stage 3: marketplace consequence + a cascade of sounds like a 2000s LAN café.',
};
