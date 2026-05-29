import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>
    lean toward choices that make <Code>Claude Code</Code>'s life (and therefore
    yours) easier
  </>,
  <>
    keep all your code in a single monorepo on <Code>GitHub</Code>
  </>,
  <>set up (i.e. ask Claude) a pipeline with unit tests</>,
  <>
    run locally, or wire a cloud service straight to <Code>GitHub</Code> (e.g.{' '}
    <SlideLink href="https://render.com/">render.com</SlideLink> — but again,
    talk this through during your <Code>Deep Research</Code> stage)
  </>,
  <>
    unless there's a reason not to — go full-stack <Code>TypeScript</Code>,{' '}
    <Code>React</Code>, the most popular and battle-tested technologies
  </>,
  <>
    prefer working in branches, commit after every session, and merge working
    code into main as often as you can
  </>,
];

export const TechnicalSlide: SlideDefinition = {
  id: 'technical',
  title: (
    <>
      <span className="text-dim">&gt;</span> set up your environment
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: overflow slide
    const WINDOW = 4;
    const firstVisible = Math.max(0, revealStage - WINDOW);

    return (
      <>
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
      </>
    );
  },
  notes:
    'Technical setup recommendations - monorepo, CI/CD, TypeScript/React stack',
};
