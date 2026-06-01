import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import schemeImg from '../assets/prompts-commands-subagents.png?url';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const BULLETS: ReactNode[] = [
  <>
    got a good prompt? you can store it as a{' '}
    <Emphasis color="green">slash command</Emphasis>
  </>,
  <>
    a slash command is a prompt stored in a text file that you can invoke any
    time with <Command>/command ARGUMENTS</Command>
  </>,
  <>
    you can also store a prompt as a <Emphasis color="orange">subagent</Emphasis>
  </>,
  <>
    a subagent is the same as a slash command, but it runs in a{' '}
    <Emphasis color="orange">separate context window</Emphasis>
  </>,
  <>
    think of it as: a slash command is an <Emphasis color="green">inline macro</Emphasis>,{' '}
    a subagent is a{' '}
    <Emphasis color="orange">function call</Emphasis> (runs in its own context window)
  </>,
];

export const PromptsCommandsSubagentsSlide: SlideDefinition = {
  id: 'prompts-commands-subagents',
  title: (
    <>
      <span className="text-dim">&gt;</span> prompts, commands, subagents
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: keep the most recent 4 bullets so the column never
    // overflows as new points reveal.
    const WINDOW = 4;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-3xl)',
        width: '100%',
        height: '100%',
        paddingBottom: 'var(--space-xl)',
      }}
    >
      {/* Left: bullets revealed one by one */}
      <div
        style={{
          flex: 1,
          maxWidth: '720px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {BULLETS.map((bullet, i) =>
          revealStage >= i + 1 && i >= firstVisible ? (
            <SlideItem key={i} delay={0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>

      {/* Right: chalk-style scheme */}
      <img
        src={schemeImg}
        alt="Chalk diagram: context window, slash command expanded inline, subagent in a separate context"
        style={{
          flexShrink: 0,
          alignSelf: 'center',
          maxWidth: '640px',
          maxHeight: 'calc(var(--vh-full) - 250px)',
          objectFit: 'contain',
          borderRadius: 'var(--input-border-radius)',
          border: '1px solid var(--terminal-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
        loading="lazy"
      />
    </div>
    );
  },
  notes:
    'Slash commands vs subagents. Slash command = a stored prompt, invoked with /command, expanded inline into the current context (like a macro). Subagent = a stored prompt that runs in its own separate context window (like a function call).',
};
