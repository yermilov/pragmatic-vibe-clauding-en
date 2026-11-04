import React from 'react';
import { useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';

/* The Codex CLI start screen, redrawn from a real capture: codex-cli 0.166.0 launched in an empty
 * directory in a 100-column pty (pyte), read 2026-11-04. Text and colours are the capture's; the
 * capture's working directory (a temp path) is replaced by ~/dev/billion-dollar-app, and the run of
 * blank rows between the command hints and the prompt is shortened to fit the slide. */

export const { fontFamily } = loadFont('normal', { weights: ['400', '700'], subsets: ['latin'] });

export const FPS = 30;
export const FONT = 24; // the deck's code tier at 1:1 on a 1600-px-wide slide body
const LINE = 1.42;
const CH = FONT * 0.6; // JetBrains Mono advance width

const C = {
  bg: '#0a0e14',
  chrome: '#161b22',
  text: '#e6e6e6',
  dim: '#8b8b8b',
  logo: '#63a8f8', // `>_`, from the capture: 38;2;99;168;248
  model: '#f6e2b7', // footer model, 38;2;246;226;183
  path: '#abdfa7', // footer path, 38;2;171;223;167
};

const CWD = '~/dev/billion-dollar-app';
export const PROMPT = 'please generate billion dollar app';
const PLACEHOLDER = 'Ask Codex to do anything';

type Span = { t: string; c?: string; b?: boolean };
const dim = (t: string): Span => ({ t, c: C.dim });
const bold = (t: string): Span => ({ t, b: true });

const COMMANDS: [string, string][] = [
  ['/init', 'create an AGENTS.md file with instructions for Codex'],
  ['/status', 'show current session configuration'],
  ['/permissions', 'choose what Codex is allowed to do'],
  ['/model', 'choose what model and reasoning effort to use'],
  ['/review', 'review any changes and find issues'],
];

const Line: React.FC<{ spans?: Span[]; children?: React.ReactNode }> = ({ spans = [], children }) => (
  <div style={{ height: FONT * LINE, whiteSpace: 'pre' }}>
    {'  '}
    {spans.map((s, i) => (
      <span key={i} style={{ color: s.c ?? C.text, fontWeight: s.b ? 700 : 400 }}>{s.t}</span>
    ))}
    {children}
  </div>
);

/** A block cursor over `under` (the character it sits on). */
const Cursor: React.FC<{ on: boolean; under?: string }> = ({ on, under = ' ' }) => (
  <span style={{ background: on ? C.text : 'transparent', color: on ? C.bg : C.dim, display: 'inline-block', width: CH }}>
    {under}
  </span>
);

/**
 * `typedAt(frame)` → how many characters of PROMPT are in the box; `cursorOn(frame)` → blink phase.
 */
export const CodexScreen: React.FC<{ typed: number; cursorOn: boolean }> = ({ typed, cursorOn }) => {
  const text = PROMPT.slice(0, typed);
  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent', display: 'flex', fontFamily }}>
      <div
        style={{
          // full-bleed: an mp4 has no alpha, so the window's rounded corners and border are drawn
          // by the deck's CSS on the <video> instead
          flex: 1,
          background: C.bg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 44, background: C.chrome, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 10, position: 'relative' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <span key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', color: C.dim, fontSize: 20 }}>
            billion-dollar-app
          </span>
        </div>
        <div style={{ padding: '18px 22px', fontSize: FONT, color: C.text, lineHeight: LINE }}>
          <Line />
          <Line spans={[{ t: '>_ ', c: C.logo }, bold('OpenAI Codex'), dim(' (v0.166.0)')]} />
          <Line spans={[dim(`   ${CWD}`)]} />
          <Line />
          <Line spans={[dim('To get started, describe a task or try one of these commands:')]} />
          <Line />
          {COMMANDS.map(([cmd, desc]) => (
            <Line key={cmd} spans={[{ t: cmd }, dim(` - ${desc}`)]} />
          ))}
          <Line />
          <Line />
          <Line spans={[bold('›'), { t: ' ' }]}>
            {typed === 0 ? (
              <>
                <Cursor on={cursorOn} under={PLACEHOLDER[0]} />
                <span style={{ color: C.dim }}>{PLACEHOLDER.slice(1)}</span>
              </>
            ) : (
              <>
                <span>{text}</span>
                <Cursor on={cursorOn} />
              </>
            )}
          </Line>
          <Line />
          <Line spans={[{ t: 'GPT-6.1-Sol default Fast', c: C.model }, { t: ' · ' }, { t: CWD, c: C.path }]} />
          <Line spans={typed === 0 ? [bold('←'), dim(' for agents · '), bold('?'), dim(' for shortcuts')] : []} />
        </div>
      </div>
    </div>
  );
};

const BLINK = 15; // frames per half-period: 0.5 s on, 0.5 s off
const blinkOn = (frame: number) => Math.floor(frame / BLINK) % 2 === 0;

/** Empty prompt, cursor blinking — loops seamlessly (2 full blinks). */
export const IDLE_FRAMES = BLINK * 4;
export const CodexIdle: React.FC = () => {
  const frame = useCurrentFrame();
  return <CodexScreen typed={0} cursorOn={blinkOn(frame)} />;
};

/** The prompt being typed, then a short blinking hold; plays once, ends with the cursor on. */
const TYPE_START = 12;
// deterministic per-key jitter so the typing doesn't look metronomic
const KEY_GAPS = Array.from(PROMPT, (ch, i) => (ch === ' ' ? 3 : 2) + ((i * 7) % 3 === 0 ? 1 : 0));
const KEY_AT = KEY_GAPS.reduce<number[]>((acc, g) => [...acc, (acc.at(-1) ?? TYPE_START) + g], []);
const TYPE_END = KEY_AT.at(-1)!;
const HOLD_START = TYPE_END + 4; // the cursor stays solid a moment after the last key
export const TYPING_FRAMES = HOLD_START + BLINK * 2 + 1; // one full blink, ending on an "on" frame
export const CodexTyping: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = KEY_AT.filter((f) => frame >= f).length;
  const cursorOn = frame < TYPE_START ? blinkOn(frame) : frame < HOLD_START ? true : blinkOn(frame - HOLD_START);
  return <CodexScreen typed={typed} cursorOn={cursorOn} />;
};

/** The typed prompt, cursor blinking — the loop the slide switches to once typing ends. */
export const CodexTyped: React.FC = () => {
  const frame = useCurrentFrame();
  return <CodexScreen typed={PROMPT.length} cursorOn={blinkOn(frame)} />;
};
