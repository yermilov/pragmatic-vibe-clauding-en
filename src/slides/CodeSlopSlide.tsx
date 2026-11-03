import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, Emphasis, revealWindow, SlideItem } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>
    making changes to your web UI? add{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    ask it to{' '}
    <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
  </>,
  <>
    ask Claude to write tests (<Code>TDD</Code> works really well)
  </>,
  <>
    <Emphasis>repeat after me:</Emphasis> write a stub of the feature by hand and
    ask Claude to finish it
  </>,
  <>
    for really hard tasks,{' '}
    <span className="code-slop__struck">
      add{' '}
      <Quote>
        please{' '}
        <span className="ultrathink">
          {'ultrathink'.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </span>
        {' '}it
      </Quote>
    </span>{' '}
    configure{' '}
    <Code variant="orange">/effort</Code> level
  </>,
];

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  title: (
    <>
      <span className="text-dim">&gt;</span> avoid code slop
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    // five bullets: a window of five (the bullet-slide cap) shows them all
    <div className="code-slop">
      {revealWindow(BULLETS, revealStage, 5).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>
          {item}
        </SlideItem>
      ))}
    </div>
  ),
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, for hard tasks configure /effort level (ultrathink crossed out), document everything',
};
