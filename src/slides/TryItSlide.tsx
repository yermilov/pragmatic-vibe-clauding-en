import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const BULLETS: ReactNode[] = [
  <>clean session</>,
  <>
    switch into <Code>plan mode</Code>
  </>,
  <>
    paste the report from your <Code>Deep Research</Code> agent and ask Claude to{' '}
    <Quote>
      please bootstrap the project from scratch using this guide, include initial
      version of CLAUDE.md
    </Quote>
  </>,
  <>wait for the plan, read it through, and iterate</>,
  <>
    <Code>Yes, and auto-accept edits</Code>
  </>,
  <>
    <Command>/commit-push-pr</Command>
  </>,
];

export const TryItSlide: SlideDefinition = {
  id: 'try-it',
  title: (
    <>
      <span className="text-dim">&gt;</span> try it yourself
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    <div
      style={{
        textAlign: 'left',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {BULLETS.map((bullet, i) =>
        revealStage >= i + 1 ? (
          <SlideItem key={i} delay={0}>
            {bullet}
          </SlideItem>
        ) : null,
      )}
    </div>
  ),
  notes:
    'First try workflow - clean session, plan mode, paste Deep Research report, iterate, auto-accept, commit',
};
