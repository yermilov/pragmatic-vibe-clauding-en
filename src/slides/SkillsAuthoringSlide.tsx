import React, { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

// Section header for this slide
function SectionHeader({
  children,
  color,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
}) {
  return (
    <div className={`section-header section-header--${color}`}>
      {'// '}
      {children}
    </div>
  );
}

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

type RevealItem =
  | { kind: 'header'; color: 'green' | 'purple' | 'blue'; content: string }
  | { kind: 'bullet'; content: ReactNode };

const ITEMS: RevealItem[] = [
  { kind: 'header', color: 'green', content: 'when to do it' },
  {
    kind: 'bullet',
    content: (
      <>
        if you catch yourself instructing Claude to do the same thing over and over —
        teach it that <Emphasis color="green">skill</Emphasis>
      </>
    ),
  },
  { kind: 'header', color: 'purple', content: 'how to do it' },
  {
    kind: 'bullet',
    content: (
      <>
        as always, spin up an empty session, plan mode, and go:{' '}
        <Prompt>please read https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices and create a skill that will ...</Prompt>
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        or like this: once,{' '}
        <Prompt>
          please read https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices and create a skill that will explain how to
          create a well crafted skill, name it skills-authorship
        </Prompt>
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        and from then on you can, <Emphasis color="orange">after</Emphasis> some
        action, just write{' '}
        <Prompt>use skills-authorship skill to turn ... into skill</Prompt>{' '}
        or{' '}
        <Prompt>use skills-authorship skill to update ... skill to ...</Prompt>
      </>
    ),
  },
  { kind: 'header', color: 'blue', content: 'examples' },
  {
    kind: 'bullet',
    content: (
      <>
        searching logs, debugging issues, performance optimization, image generation,
        writing documentation, ...
      </>
    ),
  },
];

export const SkillsAuthoringSlide: SlideDefinition = {
  id: 'skills-authoring',
  title: (
    <>
      <span className="text-dim">&gt;</span> teach Claude new skills
    </>
  ),
  maxRevealStages: ITEMS.length,
  // rolling window: overflow slide
  content: ({ revealStage }) => {
    const WINDOW = 3;
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
        {ITEMS.map((item, i) =>
          revealStage >= i + 1 && i >= firstVisible ? (
            item.kind === 'header' ? (
              <SectionHeader key={i} color={item.color}>
                {item.content}
              </SectionHeader>
            ) : (
              <SlideItem key={i} delay={0}>
                {item.content}
              </SlideItem>
            )
          ) : null,
        )}
      </div>
    );
  },
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start new session with plan mode, read docs, create skill. Or create a meta-skill for skill authoring itself.',
};
