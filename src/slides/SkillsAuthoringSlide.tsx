import React, { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

// Quoted prompt text (orange with italic styling)
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
        fontSize: '0.85em',
      }}
    >
      '{children}'
    </span>
  );
}

const BULLETS: ReactNode[] = [
  <>
    if you catch yourself instructing Claude to do the same thing over and over
    (searching logs, debugging issues, optimizing performance, generating images,
    writing documentation, ...) — teach it that <Emphasis color="green">skill</Emphasis>
  </>,
  <>
    just write{' '}
    <Prompt>use skill-creator skill to turn ... into a skill</Prompt>{' '}
    or{' '}
    <Prompt>use skill-creator skill to update ... skill to ...</Prompt>
  </>,
  <>
    skills are <Emphasis color="green">building blocks</Emphasis> each engineer
    (or agent) can assemble into their own workflow
  </>,
  <>
    people hate reading and writing documentation, but{' '}
    <Emphasis color="orange">agents love it</Emphasis> — so convert all your docs
    into skills
  </>,
  <>
    every engineer who uses a skill from the internal{' '}
    <Emphasis color="green">marketplace</Emphasis> adds improvements — and
    everyone gets more productive
  </>,
  <>
    you just need the right infrastructure to make skills your foundation
  </>,
];

export const SkillsAuthoringSlide: SlideDefinition = {
  id: 'skills-authoring',
  title: (
    <>
      <span className="text-dim">&gt;</span> what we will talk about next time?
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: keep the most recent 3 bullets so the newest always fits
    const WINDOW = 4;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    return (
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {BULLETS.map((bullet, i) =>
          revealStage >= i + 1 && i >= firstVisible ? (
            <SlideItem key={i} delay={0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>
    );
  },
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start new session with plan mode, read docs, create skill. Or create a meta-skill for skill authoring itself. Examples: searching logs, debugging, perf, image gen, docs.',
};
