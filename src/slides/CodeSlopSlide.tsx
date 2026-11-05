import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, Emphasis, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: pragmatic-vibe-clauding-ua CodeSlopSlide; bullets 1–3 reworded by Yarik (05.11.2026,
// EN: own translation); the ultrathink / effort bullet is gone.
const BULLETS_UK: ReactNode[] = [
  <>
    якщо робите зміни в web ui: клод справляється з ними набагато краще, особливо якщо додасте{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    попросіть агента{' '}
    <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
  </>,
  <>
    змушуйте його писати тести перед реалізацією (згадуємо <Code>TDD</Code>)
  </>,
  <>
    <Emphasis>repeat after me:</Emphasis> напишіть стаб фічі вручну і
    попросіть клод закінчити
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    making changes to your web UI? Claude handles them much better, especially if you add{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    ask the agent to{' '}
    <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
  </>,
  <>
    make it write tests before the implementation (remember <Code>TDD</Code>)
  </>,
  <>
    <Emphasis>repeat after me:</Emphasis> write a stub of the feature by hand and
    ask Claude to finish it
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
  // After the web-UI / frontend-design bullet (stage 1): the marketplaces slide, then back.
  detours: [{ atStage: 1, toId: 'marketplaces', returnStage: 2 }],
  content: ({ revealStage, lang }) => (
    // four bullets: the window shows them all
    <div className="code-slop">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 5).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>
          {item}
        </SlideItem>
      ))}
    </div>
  ),
  notes:
    'Code slop prevention tips - web UI goes much better with the frontend-design skill (then the '
    + 'marketplaces detour), follow repo patterns, tests before the implementation (TDD), write stubs '
    + 'manually.',
};
