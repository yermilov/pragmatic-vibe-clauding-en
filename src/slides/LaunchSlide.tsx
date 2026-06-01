import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>
    of course, first you will want to review every edit Claude Code makes, and that's the right way - it has reach permissions system that will help you
  </>,
  <>
    when Claude Code asks if it can do something read-only and not too dangerous —
    always pick <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    once you grow more confident, start clicking <Code>Approve plan and auto-accept everything</Code> after review plan
  </>,
  <>
    when you will trust Claude Code completely - switch to <Code>auto mode</Code> and let it do the plan execution without asking
  </>,
];

export const LaunchSlide: SlideDefinition = {
  id: 'launch',
  title: (
    <>
      <span className="text-dim">&gt;</span> learn to trust Claude Code
    </>
  ),
  maxRevealStages: BULLETS.length,
  // rolling window: overflow slide (long bullets)
  content: ({ revealStage }) => {
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
            <SlideItem key={i} delay={0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    );
  },
  notes:
    'Claude Code launch checklist - model selection, plugins, permissions, and plan mode workflow',
};
