import { SlideDefinition } from '../types/slides';

import haikuImg from '/model-haiku.png?url';
import sonnetImg from '/model-sonnet.png?url';
import opusImg from '/model-opus.png?url';

type ModelTier = 'haiku' | 'sonnet' | 'opus';

const tierColors: Record<ModelTier, { primary: string; glow: string }> = {
  haiku: {
    primary: 'var(--terminal-cyan)',
    glow: 'var(--terminal-cyan-glow)',
  },
  sonnet: {
    primary: 'var(--terminal-orange)',
    glow: 'var(--terminal-orange-glow)',
  },
  opus: {
    primary: 'var(--terminal-purple)',
    glow: 'var(--terminal-purple-glow)',
  },
};

function ModelBadge({
  tier,
  image,
  label,
  delay,
}: {
  tier: ModelTier;
  image: string;
  label: string;
  delay: number;
}) {
  const colors = tierColors[tier];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        opacity: 0,
        animation: 'badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        animationDelay: `${delay}s`,
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: '140px',
          height: '140px',
          objectFit: 'contain',
          filter: `drop-shadow(0 0 15px ${colors.glow})`,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: colors.primary,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: `0 0 10px ${colors.glow}`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ModelPoint({
  children,
  tier,
  delay,
}: {
  children: React.ReactNode;
  tier?: ModelTier;
  delay: number;
}) {
  const accentColor = tier ? tierColors[tier].primary : 'var(--terminal-white-dim)';
  const glowColor = tier ? tierColors[tier].glow : 'transparent';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        opacity: 0,
        animation: 'slideIn 0.4s ease-out forwards',
        animationDelay: `${delay}s`,
        marginBottom: '0.6rem',
      }}
    >
      <span
        style={{
          color: accentColor,
          fontSize: '1.35rem',
          flexShrink: 0,
          textShadow: `0 0 8px ${glowColor}`,
        }}
      >
        &gt;
      </span>
      <span
        style={{
          fontSize: '1.35rem',
          color: 'var(--terminal-white)',
          lineHeight: 1.5,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Accent({ children, tier }: { children: React.ReactNode; tier: ModelTier }) {
  const colors = tierColors[tier];
  return (
    <span
      style={{
        color: colors.primary,
        fontWeight: 600,
        textShadow: `0 0 8px ${colors.glow}`,
      }}
    >
      {children}
    </span>
  );
}

function TokenNum({ children }: { children: string }) {
  return (
    <code
      style={{
        background: 'rgba(118, 228, 247, 0.1)',
        padding: '0.1rem 0.4rem',
        borderRadius: '4px',
        color: 'var(--terminal-cyan)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9em',
        fontWeight: 600,
        border: '1px solid rgba(118, 228, 247, 0.3)',
      }}
    >
      {children}
    </code>
  );
}

const MODEL_POINTS: { tier?: ModelTier; content: React.ReactNode }[] = [
  {
    tier: 'haiku',
    content: (
      <>
        <Accent tier="haiku">haiku</Accent> — fast and understands code well; no need to use it directly, but some subagents use it for cost and latency reasons
      </>
    ),
  },
  {
    tier: 'sonnet',
    content: (
      <>
        <Accent tier="sonnet">sonnet</Accent> — the most balanced in terms of price, latency and quality
      </>
    ),
  },
  {
    tier: 'opus',
    content: (
      <>
        <Accent tier="opus">opus</Accent> — the best, but slow and expensive
      </>
    ),
  },
  {
    content: (
      <>
        <Accent tier="sonnet">in older models</Accent> performance would drop around the <TokenNum>250_000</TokenNum>–<TokenNum>300_000</TokenNum> token mark; today's models work pretty much good for any context length
      </>
    ),
  },
  {
    tier: 'opus',
    content: (
      <>
        if you are on the Max plan - just use <Accent tier="opus">opus</Accent> for all tasks
      </>
    ),
  },
  {
    tier: 'sonnet',
    content: (
      <>
        if you are on the pay-per-token plan - use <Accent tier="opus">opus</Accent> for exploration and <Accent tier="sonnet">sonnet</Accent> for coding
      </>
    ),
  },
];

export const ModelsSlide: SlideDefinition = {
  id: 'models',
  title: (
    <>
      <span className="text-dim">&gt;</span> models
    </>
  ),
  maxRevealStages: MODEL_POINTS.length,
  content: ({ revealStage }) => (
    <>
      <style>
        {`
          @keyframes badgePop {
            from {
              opacity: 0;
              transform: scale(0.5) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-15px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginBottom: '2rem',
        }}
      >
        <ModelBadge tier="haiku" image={haikuImg} label="haiku" delay={0.1} />
        <ModelBadge tier="sonnet" image={sonnetImg} label="sonnet" delay={0.2} />
        <ModelBadge tier="opus" image={opusImg} label="opus" delay={0.3} />
      </div>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* rolling window: overflow slide */}
        {(() => {
          const WINDOW = 3;
          const firstVisible = Math.max(0, revealStage - WINDOW);
          return MODEL_POINTS.map((p, i) =>
            revealStage >= i + 1 && i >= firstVisible ? (
              <ModelPoint key={i} tier={p.tier} delay={0}>
                {p.content}
              </ModelPoint>
            ) : null,
          );
        })()}
      </div>
    </>
  ),
};
