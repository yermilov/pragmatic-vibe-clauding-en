import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, Emphasis, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

const ULTRATHINK = (
  <Quote>
    please{' '}
    <span className="ultrathink">
      {'ultrathink'.split('').map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
    {' '}it
  </Quote>
);

// UA copy: pragmatic-vibe-clauding-ua CodeSlopSlide; the last bullet adapted to the EN meaning
// (only "add ultrathink" is struck out, replaced by /effort).
const BULLETS_UK: ReactNode[] = [
  <>
    якщо робите зміни в web ui: додавайте{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    просіть його{' '}
    <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
  </>,
  <>
    просіть клод писати тести (<Code>TDD</Code> працює дуже добре)
  </>,
  <>
    <Emphasis>repeat after me:</Emphasis> напишіть стаб фічі вручну і
    попросіть клод закінчити
  </>,
  <>
    для дуже складних задач{' '}
    <span className="code-slop__struck">
      додавайте {ULTRATHINK}
    </span>{' '}
    налаштуйте рівень <Code variant="orange">/effort</Code>
  </>,
];

const BULLETS_EN: ReactNode[] = [
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
      add {ULTRATHINK}
    </span>{' '}
    configure{' '}
    <Code variant="orange">/effort</Code> level
  </>,
];

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  title: (
    <>
      {/* UA: own translation (the UA deck titled it `$ code --no-slop`) */}
      <span className="text-dim">&gt;</span> <T uk="уникайте code slop" en="avoid code slop" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    // five bullets: a window of five (the bullet-slide cap) shows them all
    <div className="code-slop">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 5).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>
          {item}
        </SlideItem>
      ))}
    </div>
  ),
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, for hard tasks configure /effort level (ultrathink crossed out), document everything',
};
