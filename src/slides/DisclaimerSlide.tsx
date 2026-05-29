import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import terminalFighter from '/terminal-fighter.png?url';
import ideFighter from '/ide-fighter.png?url';

type Level = 'high' | 'medium' | 'low';

const levelStyles = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    labelGlow: '0 0 20px rgba(240, 136, 62, 0.3)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-blue)',
    labelGlow: 'none',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-dim)',
    labelGlow: 'none',
    opacity: 0.85,
  },
};

function DisclaimerItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        alignItems: 'start',
        gap: '0.6rem',
        fontSize: 'var(--slide-text-normal)',
        opacity: s.opacity,
        marginBottom: '0.5rem',
        lineHeight: 1.35,
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold', marginTop: '0.1em' }}>{s.prefix}</span>
      <span
        style={{
          color: 'var(--terminal-white)',
          textShadow: s.labelGlow,
        }}
      >
        {children}
      </span>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: 'var(--terminal-cyan)',
  textDecoration: 'none',
  borderBottom: '1px dashed var(--terminal-cyan)',
  transition: 'all 0.2s ease',
};

const BULLETS: { level: Level; content: ReactNode }[] = [
  {
    level: 'high',
    content: (
      <>
        personally, the flow that works best for me is working with{' '}
        <em style={{ color: 'var(--terminal-orange)', fontStyle: 'normal', fontWeight: 600 }}>
          Claude Code entirely in the terminal
        </em>
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        but I'll open an IDE (usually{' '}
        <span style={{ color: 'var(--terminal-cyan)' }}>VS Code</span>) for small, targeted edits I want to
        make by hand
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        the terminal weans you off the old mental model{' '}
        <em style={{ color: 'var(--terminal-white-dim)', fontStyle: 'normal' }}>"I'm editing text"</em>
        {' '}faster, and teaches the new one:{' '}
        <em style={{ color: 'var(--terminal-green)', fontStyle: 'normal', fontWeight: 600 }}>"I'm assigning tasks to an agent"</em>
      </>
    ),
  },
  {
    level: 'low',
    content: (
      <>
        not comfortable in the terminal? there are plugins:{' '}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          VS Code
        </a>
        {' '}or{' '}
        <a
          href="https://plugins.jetbrains.com/plugin/27310-claude-code-beta-"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          JetBrains IDE
        </a>
      </>
    ),
  },
];

export const DisclaimerSlide: SlideDefinition = {
  id: 'disclaimer',
  title: (
    <>
      <span className="text-dim">&gt;</span> terminal or IDE?
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // one bullet at a time — each reveal replaces the previous one, so the
    // narrow center column between the fighters never overflows.
    const activeBullet = revealStage - 1;

    return (
    <div className="vs-battle-slide">
      {/* Left Fighter - Terminal */}
      <div className="vs-fighter vs-fighter--left">
        <img
          src={terminalFighter}
          alt="Terminal CLI Fighter"
          className="vs-fighter-image"
        />
        <div className="vs-fighter-name">Terminal</div>
      </div>

      {/* Center - VS + Disclaimer */}
      <div className="vs-center-content">
        <div className="vs-badge">VS</div>
        <div className="vs-disclaimer-content">
          {BULLETS.map((item, i) =>
            i === activeBullet ? (
              <DisclaimerItem key={i} level={item.level}>{item.content}</DisclaimerItem>
            ) : null,
          )}
        </div>
      </div>

      {/* Right Fighter - IDE */}
      <div className="vs-fighter vs-fighter--right">
        <img
          src={ideFighter}
          alt="IDE Code Editor Fighter"
          className="vs-fighter-image"
        />
        <div className="vs-fighter-name">IDE</div>
      </div>

    </div>
    );
  },
  notes: 'Personal disclaimer about terminal vs IDE workflow preferences - Mortal Kombat style!',
};
