import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';
import { T, tr } from '../context/LanguageContext';

// UA copy: adapted from pragmatic-vibe-clauding-ua ImportantSlide (the same reality check,
// condensed and reordered in EN — the EN meaning wins).
const BULLETS_UK: ReactNode[] = [
  <>
    агенти підвищують <Emphasis>об'єми</Emphasis> вашої роботи, а не{' '}
    <Emphasis color="orange">швидкість</Emphasis>
  </>,
  <>
    самі ви напишете код або <Emphasis color="orange">краще</Emphasis>,{' '}
    або <Emphasis color="orange">швидше</Emphasis> за нього
  </>,
  <>
    дивитися, як агент працює в терміналі — це{' '}
    <Emphasis color="orange">втрата продуктивності і грошей</Emphasis>
  </>,
  <>
    знайдіть 2–3 задачі, які можна дати агенту з мінімальним наглядом, і{' '}
    <Emphasis color="orange">переключіться на задачу, яка потребує вашої повної уваги</Emphasis>
  </>,
  <>
    або просто запустіть агента і <Emphasis>зробіть перерву</Emphasis>
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    agents increase the <Emphasis>volume</Emphasis> of work, not the{' '}
    <Emphasis color="orange">speed</Emphasis>
  </>,
  <>
    on your own you'll write code either <Emphasis color="orange">better</Emphasis>{' '}
    or <Emphasis color="orange">faster</Emphasis>
  </>,
  <>
    watching the agent work in the terminal is a{' '}
    <Emphasis color="orange">waste of productivity and money</Emphasis>
  </>,
  <>
    find 2–3 tasks you can hand to the agent with minimal supervision, and{' '}
    <Emphasis color="orange">switch yourself to the task that needs your full attention</Emphasis>
  </>,
  <>
    or just kick off the agent and <Emphasis>take a break</Emphasis>
  </>,
];

export const OneMoreTipSlide: SlideDefinition = {
  id: 'one-more-tip',
  title: (
    <>
      {/* UA: own translation */}
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green"><T uk="остання" en="one last" /></span>{' '}
      <span className="text-orange"><T uk="порада" en="tip" /></span>
    </>
  ),
  content: ({ revealStage, lang }) => {
    const bullets = tr(lang, BULLETS_UK, BULLETS_EN);
    const idx = Math.min(revealStage, bullets.length - 1);
    return (
      <div className="one-more-tip">
        {/* Left column — one bullet at a time, swapped on reveal */}
        <div className="one-more-tip__text">
          <SlideItem key={idx} delay={0.05}>
            {bullets[idx]}
          </SlideItem>
        </div>

        {/* Right column — the 4:3 Pac-Man canvas, sized from the row height */}
        <div className="one-more-tip__game">
          <PacManCanvas revealStage={revealStage} />
        </div>
      </div>
    );
  },
  maxRevealStages: 4,
  notes:
    "Reality check with an 8-bit Pac-Man animation. 5 reveal stages: 0 — agents give volume, not speed; 1 — on your own it's more effective; 2 — watching = lost productivity; 3 — delegate 2-3, focus on one; 4 — kick it off and take a break.",
};
