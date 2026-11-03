import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem, SlideLink } from '../components/SlideElements';
import statusline from '../assets/statusline.png?url';

const BULLETS: ReactNode[] = [
  <>
    install{' '}
    <SlideLink href="https://github.com/sirmalloc/ccstatusline">
      ccstatusline
    </SlideLink>
  </>,
  <>current <Emphasis color="green">model</Emphasis></>,
  <><Emphasis color="green">context size</Emphasis></>,
  <>spent <Emphasis color="orange">limits / money</Emphasis></>,
  <>current <Emphasis color="green">directory</Emphasis></>,
  <>current <Emphasis color="green">branch / PR name</Emphasis></>,
  <><Emphasis color="green">summary</Emphasis> of the session</>,
];

export const InstallStatusLineSlide: SlideDefinition = {
  id: 'install-status-line',
  title: (
    <>
      <span className="text-dim">&gt;</span> first, install a status line
    </>
  ),
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }) => (
    <div className="statusline-slide">
      <div>
        {BULLETS.map((b, i) => (
          <SlideItem key={i} delay={i === 0 ? 0.05 : 0} hidden={revealStage < i}>
            {b}
          </SlideItem>
        ))}
      </div>

      <img
        src={statusline}
        alt="Claude Code status line: model, context size, spend, directory, branch, session summary"
        className="statusline-slide__shot"
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Install ccstatusline. Surface in the status line: current model, context size, spend (limits / money), current directory, current branch / PR name, and a session summary. Below: a real screenshot of the status line.',
};
