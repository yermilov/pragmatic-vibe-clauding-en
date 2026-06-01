import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import chatComparison from '/junior-engineer-comparison.png?url';

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

function ContentItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: 'var(--slide-text-normal)',
        opacity: s.opacity,
        marginBottom: '0.6rem',
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold' }}>{s.prefix}</span>
      <span style={{ color: 'var(--terminal-white)', textShadow: s.labelGlow }}>{children}</span>
    </div>
  );
}

function KeyInsightArrow() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0 0.5rem',
        color: 'var(--terminal-orange)',
        animation: 'arrowPulse 2s ease-in-out infinite',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 4px var(--terminal-orange-glow))' }}
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const BULLETS: { level: Level; content: ReactNode }[] = [
  { level: 'high',   content: <>treat Claude Code as a <em className="text-emphasis text-emphasis--orange">very talented junior engineer</em> you've just hired onto your team</> },
  { level: 'high',   content: <>actually, <em className="text-emphasis text-emphasis--orange">it's a whole team</em> of very talented junior engineers</> },
  { level: 'medium', content: <>they have vast "book" knowledge, but know nothing about your company's processes and codebase</> },
  { level: 'high',   content: <>it's <em className="text-emphasis text-emphasis--orange">their first day</em>, and you're the tech lead who needs to organize their work</> },
  { level: 'high',   content: <>the terminal interface is your <em className="text-emphasis text-emphasis--green">chat application</em></> },
  { level: 'medium', content: <>you can hand them your tasks, but you need to help with <em className="text-emphasis text-emphasis--green">context</em> and <em className="text-emphasis text-emphasis--green">reviews</em></> },
];

export const JuniorEngineerSlide: SlideDefinition = {
  id: 'junior-engineer',
  title: (
    <>
      <span className="text-dim">&gt;</span> what to type in that terminal?
    </>
  ),
  maxRevealStages: BULLETS.length + 1,
  content: ({ revealStage }) => {
    const showInsight = revealStage >= BULLETS.length + 1;

    // Final reveal: drop all the bullets and show only the punchline + the
    // one screenshot (Slack and Claude Code carrying the same request).
    if (showInsight) {
      return (
        <div className="junior-engineer-final">
          <style>{`
            @keyframes arrowPulse {
              0%, 100% { opacity: 1; transform: translateX(0); }
              50%       { opacity: 0.7; transform: translateX(4px); }
            }
          `}</style>

          <div className="key-insight junior-engineer-punchline">
            what would you write to a human?
            <KeyInsightArrow />
            <span className="text-emphasis text-emphasis--orange">write it to Claude Code</span>
          </div>

          <img
            src={chatComparison}
            alt="The same request sent in Slack and in the Claude Code terminal"
            className="junior-engineer-combined"
            loading="lazy"
          />
        </div>
      );
    }

    // Build-up: text only, revealed one bullet at a time.
    return (
      <div className="junior-engineer-text">
        {BULLETS.map((item, i) =>
          revealStage >= i + 1 ? (
            <ContentItem key={i} level={item.level}>{item.content}</ContentItem>
          ) : null,
        )}
      </div>
    );
  },
};
