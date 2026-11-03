import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, revealWindow, SlideItem } from '../components/SlideElements';
import schemeImg from '../assets/prompts-commands-subagents.png?url';

const BULLETS: ReactNode[] = [
  <>
    got a good prompt? you can store it as a{' '}
    <Emphasis color="green">slash command</Emphasis>
  </>,
  <>
    a slash command is a prompt stored in a text file that you can invoke any
    time with <Code variant="orange">/command ARGUMENTS</Code>
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
  <>
    for completeness, there are also <Emphasis color="green">hooks</Emphasis> —
    scripts invoked on certain events
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
  content: ({ revealStage }) => (
    // sliding window of three beside the diagram (the two-column cap)
    <div className="split">
      <div className="split__text">
        {revealWindow(BULLETS, revealStage, 3).map(({ item, index, hidden }) => (
          <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
        ))}
      </div>

      <img
        src={schemeImg}
        alt="Chalk diagram: context window, slash command expanded inline, subagent in a separate context"
        className="split__media"
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Slash commands vs subagents. Slash command = a stored prompt, invoked with /command, expanded inline into the current context (like a macro). Subagent = a stored prompt that runs in its own separate context window (like a function call).',
};
