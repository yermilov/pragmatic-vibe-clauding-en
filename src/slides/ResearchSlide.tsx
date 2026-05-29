import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

// Hint styling (orange code) - for quoted instructions
function Hint({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const BULLETS: ReactNode[] = [
  <>
    grab your favorite AI assistant (ideally one with{' '}
    <Code>Deep Research</Code> and <Code>Web Search</Code>) — ChatGPT, Gemini,
    Claude, Perplexity, ...
  </>,
  <>
    describe the project you're planning to build in detail — what features you
    need, point it at existing services for reference, and dump your thoughts on
    the technologies you want to use
  </>,
  <>
    ask it to research a reliable, modern tech stack and architecture for your
    project
  </>,
  <>
    finally, ask it to generate a{' '}
    <Hint>"comprehensive step-by-step guide for Claude Code"</Hint> that helps
    you bootstrap the foundation of the project from an empty repository
  </>,
];

export const ResearchSlide: SlideDefinition = {
  id: 'research',
  title: (
    <>
      <span className="text-dim">&gt;</span> start with research
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
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
          revealStage >= i + 1 ? (
            <SlideItem key={i} delay={0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    </>
  ),
  notes:
    'Start with AI-assisted research before coding - use Deep Research mode to plan your tech stack',
};
