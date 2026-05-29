import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const BULLETS: ReactNode[] = [
  <>
    <Command>/clear</Command> clear the session
  </>,
  <>
    switch into <Code>plan mode</Code>
  </>,
  <>describe the feature / bug, build up the context</>,
  <>wait for the plan, read it through, and iterate</>,
  <>
    <Code>Yes, and auto-accept edits</Code>
  </>,
  <>
    <Command>/commit-push-pr</Command>
  </>,
  <>
    <Command>/clear</Command>
  </>,
  <>
    <Command>/review</Command> or{' '}
    <Command>take a look at the current pr - if you would have a chance to implement it from scratch what would you do differently? clean all ai artifacts, comments, code duplication, unoptimal structures, ...</Command>
  </>,
];

export const VibeFlowSlide: SlideDefinition = {
  id: 'vibe-flow',
  title: (
    <>
      <span className="text-dim">&gt;</span> find your vibe flow
    </>
  ),
  maxRevealStages: BULLETS.length,
  // rolling window: overflow slide (8 steps, last bullet is long)
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
    'The vibe flow workflow - clear session, plan mode, describe problem, iterate on plan, auto-accept, commit',
};
