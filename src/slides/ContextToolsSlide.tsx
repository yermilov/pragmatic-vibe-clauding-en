import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem, SlideLink } from '../components/SlideElements';
import contextToolsGathering from '/context-tools-gathering.png?url';

const BULLETS: ReactNode[] = [
  <>
    describe your task in as much detail as you possibly can (or use{' '}
    <SlideLink href="https://handy.computer/">handy.computer</SlideLink> or{' '}
    <SlideLink href="https://wisprflow.ai/">wisprflow.ai</SlideLink> if you'd
    rather dictate it)
  </>,
  <>
    if the problem is complex enough — talk it through first with a{' '}
    <Code>Deep Research</Code> agent like ChatGPT or Gemini, then add the report
    to Claude Code
  </>,
  <>
    search for blog posts or articles on the topic and add the links (or{' '}
    <Code>pdf</Code>s)
  </>,
  <>
    look for open-source projects that solve similar problems, ask Claude to{' '}
    <Quote>install gh cli and browse these repos for inspiration</Quote>
  </>,
  <>
    sketch a diagram or design on paper, a whiteboard, or digitally — snap a photo
    or screenshot and add it to Claude Code
  </>,
];

export const ContextToolsSlide: SlideDefinition = {
  id: 'context-tools',
  title: (
    <>
      <span className="text-dim">&gt;</span> tools for gathering context
    </>
  ),
  maxRevealStages: BULLETS.length,
  // rolling window: overflow slide (long bullets over background image)
  content: ({ revealStage }) => {
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    return (
      <div className="bg-image-slide">
        <img
          src={contextToolsGathering}
          alt="Context gathering sources - voice, PDFs, research, diagrams"
          className="bg-image-slide__background"
        />

        <div className="bg-image-slide__content">
          {BULLETS.map((bullet, i) =>
            revealStage >= i + 1 && i >= firstVisible ? (
              <SlideItem key={i} delay={0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}
        </div>
      </div>
    );
  },
  notes:
    'Context building tools - describe task in detail, use Deep Research, add articles/PDFs, browse open-source repos, add diagrams/screenshots',
};
