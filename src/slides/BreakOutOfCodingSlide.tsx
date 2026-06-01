import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

function Prompt({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
      }}
    >
      '{children}'
    </span>
  );
}

const LEFT_BULLETS: ReactNode[] = [
  <>an AI agent that generates code is a very expensive <Emphasis color="orange">autocomplete</Emphasis></>,
  <>set yourself a goal: do <Emphasis color="green">everything</Emphasis> with Claude Code</>,
  <>prioritize <Emphasis color="green">feedback loops</Emphasis></>,
  <>install a <Emphasis color="green">CLI</Emphasis> (not MCP!) for everything you use</>,
  <>use the <Emphasis color="green">Claude Chrome extension</Emphasis> when there's no CLI</>,
];

const PROMPTS: ReactNode[] = [
  <Prompt>hey claude, open github in chrome and generate ssh key for me</Prompt>,
  <Prompt>hey claude, configure dev environment for me</Prompt>,
  <Prompt>hey claude, here is a bug report I've received mycompany.slack.com/archives/p1778239</Prompt>,
];

export const BreakOutOfCodingSlide: SlideDefinition = {
  id: 'break-out-of-coding',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">not just</span>{' '}
      <span className="text-orange">coding</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
      {/* Left column: conceptual bullets */}
      <div
        style={{
          flex: '0 0 50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          textAlign: 'left',
        }}
      >
        {LEFT_BULLETS.map((bullet, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>

      {/* Right column: example Claude prompts */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          textAlign: 'left',
        }}
      >
        {PROMPTS.map((prompt, i) =>
          revealStage >= LEFT_BULLETS.length + i ? (
            <SlideItem key={i} delay={0}>{prompt}</SlideItem>
          ) : null,
        )}
      </div>
    </div>
  ),
  maxRevealStages: LEFT_BULLETS.length + PROMPTS.length - 1,
  notes:
    'One point per reveal. Left column: coding is autocomplete; goal — do everything with Claude Code; feedback loops; CLI instead of MCP; Chrome extension as the escape hatch. Right column: concrete prompt examples across SDLC stages.',
};
