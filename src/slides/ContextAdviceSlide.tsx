import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideLink } from '../components/SlideElements';
import contextToolsGathering from '../assets/context-tools-gathering.png?url';

const ADVICE: ReactNode[] = [
  <>
    describe the task in as much detail as possible (<Code>/voice</Code>, or{' '}
    <SlideLink href="https://handy.computer/">handy.computer</SlideLink> /{' '}
    <SlideLink href="https://wisprflow.ai/">wisprflow.ai</SlideLink> if you
    prefer to dictate)
  </>,
  <>
    if the task is complex — first discuss it with a <Code>Deep Research</Code>{' '}
    agent (ChatGPT or Gemini), then add the report into Claude Code
  </>,
  <>
    sketch a diagram or design on paper, a whiteboard, or in an editor — take a
    photo or screenshot and add it into Claude Code
  </>,
  <>
    find open-source projects with similar tasks, ask Claude{' '}
    <Quote>browse these repos via gh cli for inspiration</Quote>
  </>,
  <>
    look up articles and blog posts on the topic and add the links (or{' '}
    <Code>pdf</Code>s)
  </>,
  <>
    when making UI changes — add{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    add{' '}
    <Quote>ask questions first — never assume, use AskUserQuestion tool</Quote>{' '}
    to your CLAUDE.md
  </>,
];

export const ContextAdviceSlide: SlideDefinition = {
  id: 'context-advice',
  maxRevealStages: ADVICE.length - 1,
  content: ({ revealStage }) => {
    const idx = Math.min(revealStage, ADVICE.length - 1);
    return (
      <div className="bg-image-slide context-advice-slide">
        <img
          src={contextToolsGathering}
          alt="Context: voice, PDF, research, diagrams"
          className="bg-image-slide__background"
          loading="lazy"
        />

        <div className="context-advice-card">
          <div className="context-advice-card__body" key={idx}>
            {ADVICE[idx]}
          </div>
        </div>
      </div>
    );
  },
  notes:
    'Building context, one piece of advice at a time: detailed task description, Deep Research, articles/PDFs, open-source repos, diagrams/screenshots, CLI/skills instead of MCP, frontend-design skill for UI, ask questions first in CLAUDE.md',
};
