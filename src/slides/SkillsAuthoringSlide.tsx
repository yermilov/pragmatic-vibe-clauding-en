import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Quote, revealWindow, SlideItem } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>
    if you catch yourself instructing Claude to do the same thing over and over
    (searching logs, debugging issues, optimizing performance, generating images,
    writing documentation, ...) — teach it that <Emphasis color="green">skill</Emphasis>
  </>,
  <>
    just write{' '}
    <Quote>use skill-creator skill to turn ... into a skill</Quote>{' '}
    or{' '}
    <Quote>use skill-creator skill to update ... skill to ...</Quote>
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
  content: ({ revealStage }) => (
    // sliding window of four: the newest bullet always fits
    <div className="code-slop">
      {revealWindow(BULLETS, revealStage, 4).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
      ))}
    </div>
  ),
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start new session with plan mode, read docs, create skill. Or create a meta-skill for skill authoring itself. Examples: searching logs, debugging, perf, image gen, docs.',
};
