import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

const DEVTOOLS_MCP_LINK = (
  <SlideLink href="https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-chrome-devtools">
    chrome-devtools-mcp
  </SlideLink>
);

// UA copy: pragmatic-vibe-clauding-ua LifeAfterCommitSlide, regrouped to the EN bullets.
// Bullets 1 and 5 are new in EN — UA: own translation. Bullet 4: the UA deck called
// chrome-devtools-mcp "the most useful MCP server"; the EN meaning (complicated setup,
// serious limitations) wins.
const BULLETS_UK: ReactNode[] = [
  <>поясніть агенту, як запускати тести і стартувати ваш застосунок локально</>,
  <>
    попросіть агента завжди додавати багато логів і поясніть, як отримати доступ до локального лог-файлу
  </>,
  <>
    поясніть агенту, як "проклацати ваш сервіс", щоб він міг його потестувати
  </>,
  <>
    {DEVTOOLS_MCP_LINK} — дає агенту користуватися Chrome DevTools, але потребує складного
    налаштування і має серйозні обмеження
  </>,
  <>
    навчіть агента, де шукати логи, метрики і трейси з різних середовищ (включно з продакшеном)
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>explain to the agent how to run tests and start your app locally</>,
  <>
    ask the agent to always add lots of logging, and explain how to access the local log file
  </>,
  <>
    explain to the agent how to "click through your service" so it can test it
  </>,
  <>
    {DEVTOOLS_MCP_LINK}{' '}
    — lets the agent use Chrome DevTools, but requires a complicated setup and has serious limitations
  </>,
  <>
    teach the agent where it can find logs, metrics, and traces from your different environments (including production)
  </>,
];

export const LifeAfterCommitSlide: SlideDefinition = {
  id: 'life-after-commit',
  title: (
    <>
      {/* UA: own translation (the UA deck titled it `$ deploy --aftercare`) */}
      <span className="text-dim">&gt;</span> <T uk="життя після коміту" en="life after the commit" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    // sliding window of five: the newest bullet always fits
    <div className="code-slop">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 5).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
      ))}
    </div>
  ),
  notes:
    'Life after commit - logging (add lots of logging, local log file, ship to BetterStack), web testing (explain how to click through the service), and chrome-devtools-mcp. Bullets revealed one at a time.',
};
