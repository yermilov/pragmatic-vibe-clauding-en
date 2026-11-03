import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

const BULLETS: ReactNode[] = [
  <>
    Claude Code increases the <Emphasis>volume</Emphasis> of work, not the{' '}
    <Emphasis color="orange">speed</Emphasis>
  </>,
  <>
    on your own you'll write code either <Emphasis color="orange">better</Emphasis>{' '}
    or <Emphasis color="orange">faster</Emphasis>
  </>,
  <>
    watching Claude work in the terminal is a{' '}
    <Emphasis color="orange">waste of productivity and money</Emphasis>
  </>,
  <>
    find 2–3 tasks you can hand to Claude with minimal supervision, and{' '}
    <Emphasis color="orange">switch yourself to the task that needs your full attention</Emphasis>
  </>,
  <>
    or just kick off Claude and <Emphasis>take a break</Emphasis>
  </>,
];

export const OneMoreTipSlide: SlideDefinition = {
  id: 'one-more-tip',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">one last</span>{' '}
      <span className="text-orange">tip</span>
    </>
  ),
  content: ({ revealStage }) => {
    const idx = Math.min(revealStage, BULLETS.length - 1);
    return (
      <div className="one-more-tip">
        {/* Left column — one bullet at a time, swapped on reveal */}
        <div className="one-more-tip__text">
          <SlideItem key={idx} delay={0.05}>
            {BULLETS[idx]}
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
    "Reality check with an 8-bit Pac-Man animation. 5 reveal stages: 0 — Claude gives volume, not speed; 1 — on your own it's more effective; 2 — watching = lost productivity; 3 — delegate 2-3, focus on one; 4 — kick it off and take a break.",
};
