import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import importantImage from '/important-slide.png?url';

const BULLETS: ReactNode[] = [
  <>
    if you actually know a topic, then Claude almost certainly knows it{' '}
    <Emphasis color="orange">worse</Emphasis> than you
  </>,
  <>
    often you can write the code <Emphasis color="orange">MUCH</Emphasis> better
    than it can
  </>,
  <>
    quite often you can also write it <Emphasis color="orange">faster</Emphasis>{' '}
    than it can
  </>,
  <>
    but its real value is that you can hand it a task and{' '}
    <Emphasis>switch to something else</Emphasis>
  </>,
  <>
    or kick off two tasks in parallel with two Claudes and switch to something
    else
  </>,
  <>or kick off four tasks and go eat / sleep</>,
  <>
    most of the time Claude doesn't raise the quality or speed of your work — it
    raises the <Emphasis>volume</Emphasis> of your work
  </>,
  <>
    if you set it running and just stare at the terminal, you're most likely{' '}
    <Emphasis color="orange">losing productivity</Emphasis>
  </>,
  <>
    the <Emphasis>one important exception</Emphasis> — tech you know nothing
    about, where you can save anything from hours to weeks
  </>,
];

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-orange">important!</span>
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: overflow slide
    const WINDOW = 4;
    const firstVisible = Math.max(0, revealStage - WINDOW);

    return (
      <div className="bg-image-slide">
        <img
          src={importantImage}
          alt="Important balance between human expertise and AI"
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
    'Important reality check - Claude is not better than you in your domain, value is in parallelization and delegation, watching Claude work is often counterproductive, exception is unfamiliar technologies',
};
