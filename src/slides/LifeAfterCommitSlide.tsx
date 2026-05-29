import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';

// Section header with animation for this slide
function AnimatedSectionHeader({
  children,
  color,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
}) {
  return (
    <div
      className={`section-header section-header--${color}`}
      style={{
        opacity: 0,
        animation: 'slideItemFadeIn 0.35s ease-out forwards',
      }}
    >
      {'// '}
      {children}
    </div>
  );
}

type Step =
  | { kind: 'header'; color: 'green' | 'purple' | 'blue'; text: string; section: number }
  | { kind: 'bullet'; content: ReactNode; section: number };

const STEPS: Step[] = [
  { kind: 'header', color: 'green', text: 'logging', section: 0 },
  {
    kind: 'bullet',
    section: 0,
    content: (
      <>
        ask Claude to add lots of logging and explain how to access it (in{' '}
        <Code>CLAUDE.md</Code>)
      </>
    ),
  },
  {
    kind: 'bullet',
    section: 0,
    content: <>running locally? tell it where the log file lives</>,
  },
  {
    kind: 'bullet',
    section: 0,
    content: (
      <>
        running in the cloud? set up shipping logs to{' '}
        <SlideLink href="https://betterstack.com/">betterstack.com</SlideLink>{' '}
        and configure the <Code>cli</Code> so it can read them
      </>
    ),
  },
  { kind: 'header', color: 'purple', text: 'web testing', section: 1 },
  {
    kind: 'bullet',
    section: 1,
    content: (
      <>
        install the Chrome extension{' '}
        <SlideLink href="https://claude.com/chrome">claude.com/chrome</SlideLink>{' '}
        and set it up with <Code>/chrome</Code>
      </>
    ),
  },
  {
    kind: 'bullet',
    section: 1,
    content: (
      <>
        explain to Claude how to "click through your service" so it can test it
        (in <Code>CLAUDE.md</Code>)
      </>
    ),
  },
  { kind: 'header', color: 'blue', text: 'mcp', section: 2 },
  {
    kind: 'bullet',
    section: 2,
    content: (
      <>
        <SlideLink href="https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-chrome-devtools">
          chrome-devtools-mcp
        </SlideLink>{' '}
        — probably the most useful <Code>MCP</Code> server right now, though it
        has its limits too
      </>
    ),
  },
];

export const LifeAfterCommitSlide: SlideDefinition = {
  id: 'life-after-commit',
  title: (
    <>
      <span className="text-dim">&gt;</span> life after the commit
    </>
  ),
  maxRevealStages: STEPS.length,
  content: ({ revealStage }) => {
    // rolling window: overflow slide — only show the currently active section
    const lastRevealed = revealStage - 1;
    const activeSection =
      lastRevealed >= 0 ? STEPS[Math.min(lastRevealed, STEPS.length - 1)].section : -1;

    return (
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {STEPS.map((step, i) => {
          const visible = revealStage >= i + 1 && step.section === activeSection;
          if (!visible) return null;
          return step.kind === 'header' ? (
            <AnimatedSectionHeader key={i} color={step.color}>
              {step.text}
            </AnimatedSectionHeader>
          ) : (
            <SlideItem key={i} delay={0}>
              {step.content}
            </SlideItem>
          );
        })}
      </div>
    );
  },
  notes:
    'Life after commit - logging setup (local vs cloud with BetterStack), web testing with Chrome plugin and /chrome command, MCP Chrome DevTools server',
};
