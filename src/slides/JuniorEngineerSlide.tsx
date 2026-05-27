import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import slackImage from '/junior-engineer-slack.png?url';
import terminalImage from '/junior-engineer-terminal.png?url';

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
  { level: 'high',   content: <>treat Claude Code as a <em className="text-emphasis text-emphasis--orange">very talented junior engineer</em> hired in your team</> },
  { level: 'high',   content: <>it is <em className="text-emphasis text-emphasis--orange">(always) their first day</em> and you are their mentor</> },
  { level: 'medium', content: <>they have no industry experience</> },
  { level: 'high',   content: <>terminal interface = your <em className="text-emphasis text-emphasis--green">chat application</em></> },
  { level: 'medium', content: <>you can give them your tasks but need to help with <em className="text-emphasis text-emphasis--green">context</em> and <em className="text-emphasis text-emphasis--green">reviews</em></> },
];

export const JuniorEngineerSlide: SlideDefinition = {
  id: 'junior-engineer',
  title: (
    <>
      <span className="text-dim">$</span>{' '}
      <span className="text-green">think</span>{' '}
      <span className="text-orange">--model</span>{' '}
      <span className="text-cyan">lawful-chaotic-engineer</span>
    </>
  ),
  maxRevealStages: BULLETS.length + 1,
  content: ({ revealStage }) => (
    <div className="junior-engineer-slide">
      <style>{`
        @keyframes arrowPulse {
          0%, 100% { opacity: 1; transform: translateX(0); }
          50%       { opacity: 0.7; transform: translateX(4px); }
        }
      `}</style>

      {/* Left: Slack image */}
      <div className="junior-engineer-image-col">
        <img src={slackImage} alt="Slack chat interface" className="junior-engineer-image" loading="lazy" />
        <div className="junior-engineer-image-label">Slack</div>
      </div>

      {/* Center: text */}
      <div className="junior-engineer-content">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BULLETS.map((item, i) =>
            revealStage >= i + 1 ? (
              <ContentItem key={i} level={item.level}>{item.content}</ContentItem>
            ) : null,
          )}
        </div>

        {revealStage >= BULLETS.length + 1 && (
          <div className="key-insight" style={{ marginTop: '1.25rem', fontSize: 'var(--slide-text-normal)' }}>
            what you would write to a human?
            <KeyInsightArrow />
            <span className="text-emphasis text-emphasis--orange">write it to Claude Code</span>
          </div>
        )}
      </div>

      {/* Right: Terminal image */}
      <div className="junior-engineer-image-col">
        <img src={terminalImage} alt="Terminal Claude Code interface" className="junior-engineer-image" loading="lazy" />
        <div className="junior-engineer-image-label">Claude Code</div>
      </div>
    </div>
  ),
};
