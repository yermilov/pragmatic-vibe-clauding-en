import { SlideDefinition } from '../types/slides';
import { revealWindow } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

import haikuImg from '/model-haiku.png?url';
import sonnetImg from '/model-sonnet.png?url';
import opusImg from '/model-opus.png?url';

type ModelTier = 'haiku' | 'sonnet' | 'opus';

// Each tier owns one of the deck's accents (cyan / amber / blue); the colour
// is carried by a `models-tier--<tier>` class that sets `--tier` locally.
function ModelBadge({ tier, image, label }: { tier: ModelTier; image: string; label: string }) {
  return (
    <div className={`models-badge models-tier--${tier}`}>
      <img src={image} alt={label} className="models-badge__image" />
      <span className="models-badge__label">{label}</span>
    </div>
  );
}

function ModelPoint({ children, tier, hidden }: { children: React.ReactNode; tier?: ModelTier; hidden: boolean }) {
  return (
    <div
      className={`models-point ${tier ? `models-tier--${tier}` : ''} ${hidden ? 'is-unrevealed' : 'reveal-enter'}`}
      aria-hidden={hidden || undefined}
    >
      <span className="models-point__prefix">&gt;</span>
      <span>{children}</span>
    </div>
  );
}

function Accent({ children, tier }: { children: React.ReactNode; tier: ModelTier }) {
  return <span className={`models-accent models-tier--${tier}`}>{children}</span>;
}

function TokenNum({ children }: { children: string }) {
  return <code className="code-inline">{children}</code>;
}

// UA copy: adapted from the UA deck's ModelsSlide (haiku, the 250k–300k mark, "just use opus");
// the EN slide has since been rewritten, so the sonnet / opus / plan bullets are
// UA: own translation
const MODEL_POINTS_UK: { tier?: ModelTier; content: React.ReactNode }[] = [
  {
    tier: 'haiku',
    content: (
      <>
        <Accent tier="haiku">haiku</Accent> — швидка і гарно розуміє код; напряму користуватися не треба, але деякі сабагенти використовують її заради ціни і швидкості
      </>
    ),
  },
  {
    tier: 'sonnet',
    content: (
      <>
        <Accent tier="sonnet">sonnet</Accent> — найзбалансованіша за ціною, швидкістю і якістю
      </>
    ),
  },
  {
    tier: 'opus',
    content: (
      <>
        <Accent tier="opus">opus</Accent> — найкраща, але повільна і дорога
      </>
    ),
  },
  {
    content: (
      <>
        <Accent tier="sonnet">у старих моделях</Accent> перформенс падав на відмітці <TokenNum>250_000</TokenNum>–<TokenNum>300_000</TokenNum> токенів; сучасні моделі непогано працюють на будь-якій довжині контексту
      </>
    ),
  },
  {
    tier: 'opus',
    content: (
      <>
        якщо у вас Max план — просто завжди користуйтеся <Accent tier="opus">opus</Accent>
      </>
    ),
  },
  {
    tier: 'sonnet',
    content: (
      <>
        якщо платите за токени — <Accent tier="opus">opus</Accent> для дослідження, <Accent tier="sonnet">sonnet</Accent> для кодингу
      </>
    ),
  },
];

const MODEL_POINTS_EN: { tier?: ModelTier; content: React.ReactNode }[] = [
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
        <Accent tier="sonnet">sonnet</Accent> — the most balanced in terms of price, latency, and quality
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
        <Accent tier="sonnet">in older models</Accent>, performance would drop around the <TokenNum>250_000</TokenNum>–<TokenNum>300_000</TokenNum> token mark; today's models work pretty well at any context length
      </>
    ),
  },
  {
    tier: 'opus',
    content: (
      <>
        if you're on the Max plan — just use <Accent tier="opus">opus</Accent> for everything
      </>
    ),
  },
  {
    tier: 'sonnet',
    content: (
      <>
        if you're on the pay-per-token plan — use <Accent tier="opus">opus</Accent> for exploration and <Accent tier="sonnet">sonnet</Accent> for coding
      </>
    ),
  },
];

export const ModelsSlide: SlideDefinition = {
  id: 'models',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="моделі" en="models" />
    </>
  ),
  maxRevealStages: MODEL_POINTS_EN.length,
  content: ({ revealStage, lang }) => (
    <div className="models-slide">
      <div className="models-badges">
        <ModelBadge tier="haiku" image={haikuImg} label="haiku" />
        <ModelBadge tier="sonnet" image={sonnetImg} label="sonnet" />
        <ModelBadge tier="opus" image={opusImg} label="opus" />
      </div>

      {/* sliding window of four: a spoken point drops off when the fifth arrives */}
      <div className="models-points">
        {revealWindow(tr(lang, MODEL_POINTS_UK, MODEL_POINTS_EN), revealStage, 4).map(({ item, index, hidden }) => (
          <ModelPoint key={index} tier={item.tier} hidden={hidden}>
            {item.content}
          </ModelPoint>
        ))}
      </div>
    </div>
  ),
};
