import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const BULLETS: ReactNode[] = [
  <>
    do <Command>/model opus</Command> right away
  </>,
  <>
    Claude extends through <Code>commands</Code> (prompts saved into files that you
    can run), <Code>subagents</Code> (same thing, but in a separate context window
    — saves you tokens!), <Code>hooks</Code> (scripts that fire in response to
    certain events), and <Code>skills</Code> (basically docs Claude can read to
    learn something) — and they all live inside <Code>plugins</Code>
  </>,
  <>
    also run these right away:{' '}
    <Command>/plugin marketplace add anthropics/claude-code</Command>,{' '}
    <Command>/plugin install commit-commands@claude-plugin-directory</Command>,{' '}
    <Command>/plugin install frontend-design@claude-plugin-directory</Command>,{' '}
    <Command>/plugin install code-review@claude-plugin-directory</Command>
  </>,
  <>
    when Claude Code asks if it can do something read-only and not too dangerous —
    always pick <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    always start in <Code>plan mode</Code> (shift+tab twice), iterate on the plan,
    then switch into <Code>Auto-accept everything</Code>
  </>,
];

export const LaunchSlide: SlideDefinition = {
  id: 'launch',
  title: (
    <>
      <span className="text-dim">&gt;</span> launch Claude Code
    </>
  ),
  maxRevealStages: BULLETS.length,
  // rolling window: overflow slide (long bullets)
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
    'Claude Code launch checklist - model selection, plugins, permissions, and plan mode workflow',
};
