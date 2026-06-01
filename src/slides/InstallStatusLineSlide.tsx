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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: 'var(--space-xl)',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        {BULLETS.map((b, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{b}</SlideItem>
          ) : null,
        )}
      </div>

      <img
        src={statusline}
        alt="Claude Code status line: model, context size, spend, directory, branch, session summary"
        style={{
          width: '100%',
          marginTop: 'var(--space-xl)',
          borderRadius: 'var(--input-border-radius)',
          border: '1px solid var(--terminal-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Install ccstatusline. Surface in the status line: current model, context size, spend (limits / money), current directory, current branch / PR name, and a session summary. Below: a real screenshot of the status line.',
};
