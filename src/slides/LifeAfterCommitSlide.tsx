import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

const CHROME_LINK = <SlideLink href="https://claude.com/chrome">claude.com/chrome</SlideLink>;
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
  <>поясніть Claude Code, як запускати тести і стартувати ваш застосунок локально</>,
  <>
    попросіть клод завжди додавати багато логів і поясніть, як отримати доступ до локального лог-файлу
  </>,
  <>
    встановіть хром плагін {CHROME_LINK}, налаштуйте його за допомогою <Code>/chrome</Code> і поясніть
    клоду, як "проклацати ваш сервіс", щоб він міг його потестувати
  </>,
  <>
    {DEVTOOLS_MCP_LINK} — дає клоду користуватися Chrome DevTools, але потребує складного
    налаштування і має серйозні обмеження
  </>,
  <>
    навчіть Claude Code, де шукати логи, метрики і трейси з різних середовищ (включно з продакшеном)
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>explain to Claude Code how to run tests and start your app locally</>,
  <>
    ask Claude to always add lots of logging, and explain how to access the local log file
  </>,
  <>
    install the Chrome extension {CHROME_LINK},{' '}
    set it up with <Code>/chrome</Code>, and explain to Claude how to "click through your service" so it can test it
  </>,
  <>
    {DEVTOOLS_MCP_LINK}{' '}
    — lets Claude use Chrome DevTools, but requires a complicated setup and has serious limitations
  </>,
  <>
    teach Claude Code where it can find logs, metrics, and traces from your different environments (including production)
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
    'Life after commit - logging (add lots of logging, local log file, ship to BetterStack), web testing (Chrome extension + /chrome, explain how to click through the service), and chrome-devtools-mcp. Bullets revealed one at a time.',
};
