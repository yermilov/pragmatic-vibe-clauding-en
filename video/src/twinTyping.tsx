import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadSans } from '@remotion/google-fonts/Lato';

/* One person typing the same message into two apps at once: a team chat (left) and Claude Code
 * (right). STAGED scene for the «що писати в той термінал?» slide.
 *
 * - Claude Code: redrawn from a real capture of Claude Code v2.1.318 in an empty folder (60-column
 *   pty, pyte, 2026-11-04): the mascot, header lines, the prompt between two rules, the dim
 *   placeholder and the footer, with the capture's colours. Staged: the folder (~/dev/api-client)
 *   and the dropped "transcript saving is off" warning, an artefact of capturing from inside
 *   another Claude Code session. The message is never sent.
 * - The chat app is a generic drawing (no product's branding); "Mariana Tkachenko" and her photo come from the
 *   specimen Ukrainian ID card (the sample card shown to the press at the 2016 launch; photo cropped
 *   into video/public/mariana-tkachenko.jpg). */

const { fontFamily: mono } = loadMono('normal', { weights: ['400', '700'], subsets: ['latin'] });
const { fontFamily: sans } = loadSans('normal', { weights: ['400', '700'], subsets: ['latin'] });

export const FPS = 30;
// Each app is its own clip (same timeline, started together by the slide), full-bleed: the deck's
// CSS draws the rounded corners and border, so the clips sit cleanly on either theme.
export const WIN_W = 776;
export const H = 620;

// written the way you'd write to a teammate — greeting and thanks included
export const MESSAGE = 'hey, how are you? can you add retry logic to the API client and cover it with tests? thank you!';

// ---------- timeline ----------
const BLINK = 15;
const blinkOn = (f: number) => Math.floor(f / BLINK) % 2 === 0;
const TYPE_START = 24;
// both apps receive every key on the same frame; deterministic jitter so it isn't metronomic
const KEY_AT = Array.from(MESSAGE).reduce<number[]>((acc, ch, i) => {
  const gap = (ch === ' ' ? 2 : 1) + ((i * 7) % 5 === 0 ? 1 : 0);
  return [...acc, (acc.at(-1) ?? TYPE_START) + gap];
}, []);
const HOLD_START = KEY_AT.at(-1)! + 4;
export const TWIN_FRAMES = HOLD_START + BLINK * 4 + 1; // two blinks, ending with the cursors on

function state(frame: number) {
  const typed = KEY_AT.filter((f) => frame >= f).length;
  const cursorOn = frame < TYPE_START ? blinkOn(frame) : frame < HOLD_START ? true : blinkOn(frame - HOLD_START);
  return { typed, cursorOn };
}

// ---------- window chrome ----------
const Window: React.FC<{ bg: string; bar: string; title?: string; titleColor: string; children: React.ReactNode }> = ({
  bg,
  bar,
  title,
  titleColor,
  children,
}) => (
  <div style={{ width: WIN_W, height: H, background: bg, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 40, flex: 'none', background: bar, display: 'flex', alignItems: 'center', gap: 9, padding: '0 16px', position: 'relative' }}>
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <span key={c} style={{ width: 13, height: 13, borderRadius: '50%', background: c }} />
      ))}
      {title && (
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 18, color: titleColor }}>{title}</span>
      )}
    </div>
    {children}
  </div>
);

// ---------- the chat app ----------
const CHAT = {
  bg: '#1a1d21',
  side: '#3f0e40',
  sideHi: '#1164a3',
  bar: '#2b0b2c',
  text: '#e8e8e8',
  dim: '#9a9a9a',
  border: '#565856',
};
const CHAT_FONT = 24;

const AVATAR = staticFile('mariana-tkachenko.jpg');
const Avatar: React.FC<{ size: number }> = ({ size }) => (
  <Img src={AVATAR} style={{ width: size, height: size, borderRadius: size * 0.2, objectFit: 'cover', flex: 'none' }} />
);

const Chat: React.FC<{ typed: number; cursorOn: boolean }> = ({ typed, cursorOn }) => (
  <Window bg={CHAT.bg} bar={CHAT.bar} titleColor={CHAT.dim}>
    <div style={{ flex: 1, display: 'flex', fontFamily: sans, color: CHAT.text, minHeight: 0 }}>
      <div style={{ width: 190, background: CHAT.side, padding: '18px 0', fontSize: 20, flex: 'none' }}>
        <div style={{ padding: '0 18px 14px', fontWeight: 700, fontSize: 22 }}>Acme Eng</div>
        {['# general', '# backend', '# releases'].map((c) => (
          <div key={c} style={{ padding: '5px 18px', color: '#cfc3cf' }}>{c}</div>
        ))}
        <div style={{ padding: '14px 18px 5px', color: '#cfc3cf', fontSize: 17 }}>Direct messages</div>
        <div style={{ padding: '5px 18px', background: CHAT.sideHi, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2bac76', flex: 'none' }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mariana Tkachenko</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ height: 58, flex: 'none', borderBottom: `1px solid #34373b`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px' }}>
          <Avatar size={36} />
          <span style={{ fontWeight: 700, fontSize: CHAT_FONT }}>Mariana Tkachenko</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, textAlign: 'center' }}>
          <Avatar size={110} />
          <div style={{ fontWeight: 700, fontSize: CHAT_FONT }}>Mariana Tkachenko</div>
          <div style={{ color: CHAT.dim, fontSize: 19 }}>This is the very beginning of your direct message history with Mariana.</div>
        </div>
        <div style={{ margin: '0 18px 18px', border: `1px solid ${CHAT.border}`, borderRadius: 10, padding: '14px 16px', fontSize: CHAT_FONT, lineHeight: 1.35, minHeight: 112 }}>
          {typed === 0 ? (
            <span style={{ position: 'relative' }}>
              <Caret on={cursorOn} />
              <span style={{ color: CHAT.dim }}>Message Mariana Tkachenko</span>
            </span>
          ) : (
            <span>
              {MESSAGE.slice(0, typed)}
              <Caret on={cursorOn} />
            </span>
          )}
        </div>
      </div>
    </div>
  </Window>
);

const Caret: React.FC<{ on: boolean }> = ({ on }) => (
  <span style={{ display: 'inline-block', width: 2, height: '1.1em', verticalAlign: '-0.2em', background: on ? CHAT.text : 'transparent', margin: '0 1px' }} />
);

// ---------- Claude Code ----------
const CC = {
  bg: '#0a0e14',
  bar: '#161b22',
  text: '#e6e6e6',
  dim: '#999999', // header + footer hint, 38;2;153;153;153
  rule: '#888888', // the prompt's rules, 38;2;136;136;136
  clawd: '#d77757', // the mascot, 38;2;215;119;87
  mode: '#ffc107', // "auto mode on", 38;2;255;193;7
};
const CC_FONT = 22;
const CH = CC_FONT * 0.6;
const CC_PAD = 20;
const COLS = Math.floor((WIN_W - CC_PAD * 2) / CH);
const LINE_H = CC_FONT * 1.4;

/** Wrap the prompt the way Claude Code does: `❯ ` then a two-space hanging indent. */
function wrapPrompt(text: string): string[] {
  const width = COLS - 2;
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  lines.push(line);
  return lines;
}

const Row: React.FC<{ children?: React.ReactNode; color?: string }> = ({ children, color = CC.text }) => (
  <div style={{ height: LINE_H, whiteSpace: 'pre', color }}>{children}</div>
);

const Block: React.FC<{ on: boolean; under?: string; dim?: boolean }> = ({ on, under = ' ', dim }) => (
  <span style={{ display: 'inline-block', width: CH, background: on ? CC.text : 'transparent', color: on ? CC.bg : dim ? CC.dim : CC.text }}>{under}</span>
);

/** The mascot as the capture drew it — three rows of quadrant block characters, header text from
 *  column 11 — painted as pixels, because a web font draws those glyphs with gaps. */
const CLAWD_ROWS = [' ▐▛███▛█', '▝▜██████▀', ' ▝▝   ▝▝ '];
const QUADS: Record<string, [number, number, number, number]> = {
  // [upper-left, upper-right, lower-left, lower-right]
  ' ': [0, 0, 0, 0], '█': [1, 1, 1, 1], '▐': [0, 1, 0, 1], '▛': [1, 1, 1, 0],
  '▜': [1, 1, 0, 1], '▝': [0, 1, 0, 0], '▀': [1, 1, 0, 0],
};
const Clawd: React.FC = () => {
  const px = CH / 2;
  const py = LINE_H / 2;
  const rects: React.ReactNode[] = [];
  CLAWD_ROWS.forEach((row, y) =>
    Array.from(row).forEach((ch, x) => {
      const [ul, ur, ll, lr] = QUADS[ch];
      [[ul, 0, 0], [ur, 1, 0], [ll, 0, 1], [lr, 1, 1]].forEach(([on, dx, dy], k) => {
        if (on) rects.push(<rect key={`${y}-${x}-${k}`} x={(x * 2 + dx) * px} y={(y * 2 + dy) * py} width={px + 0.5} height={py + 0.5} />);
      });
    }),
  );
  return (
    <svg width={CH * 11} height={LINE_H * 3} style={{ flex: 'none' }} fill={CC.clawd}>
      {rects}
    </svg>
  );
};

const ClaudeCode: React.FC<{ typed: number; cursorOn: boolean }> = ({ typed, cursorOn }) => {
  const lines = typed === 0 ? [] : wrapPrompt(MESSAGE.slice(0, typed));
  const rule = '─'.repeat(COLS);
  return (
    <Window bg={CC.bg} bar={CC.bar} title="api-client" titleColor={CC.dim}>
      <div style={{ flex: 1, padding: `${CC_PAD}px`, fontFamily: mono, fontSize: CC_FONT, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex' }}>
          <Clawd />
          <div>
            <Row>
              <b>Claude Code</b> <span style={{ color: CC.dim }}>v2.1.318</span>
            </Row>
            <Row color={CC.dim}>Opus 5.5 · Claude Enterprise</Row>
            <Row color={CC.dim}>~/dev/api-client</Row>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {typed === 0 && <Row color={CC.dim}>{' '.repeat(COLS - 18)}◐ medium · /effort</Row>}
        <Row color={CC.rule}>{rule}</Row>
        {typed === 0 ? (
          <Row>
            {'❯ '}
            <Block on={cursorOn} under="T" dim />
            <span style={{ color: CC.dim }}>ry "refactor &lt;filepath&gt;"</span>
          </Row>
        ) : (
          lines.map((l, i) => (
            <Row key={i}>
              {i === 0 ? '❯ ' : '  '}
              {l}
              {i === lines.length - 1 && <Block on={cursorOn} />}
            </Row>
          ))
        )}
        <Row color={CC.rule}>{rule}</Row>
        <Row>
          {'  '}
          <span style={{ color: CC.mode }}>⏵⏵ auto mode on</span>
          <span style={{ color: CC.dim }}> (shift+tab to cycle)</span>
        </Row>
      </div>
    </Window>
  );
};

// ---------- the compositions ----------
export const ChatTwin: React.FC = () => <Chat {...state(useCurrentFrame())} />;
export const ClaudeTwin: React.FC = () => <ClaudeCode {...state(useCurrentFrame())} />;
