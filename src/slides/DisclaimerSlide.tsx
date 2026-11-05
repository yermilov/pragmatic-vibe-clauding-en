import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Level, LevelItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import terminalFighter from '/terminal-fighter.png?url';
import ideFighter from '/ide-fighter.png?url';

// UA copy: bullets 1, 2, 4 from the UA deck DisclaimerSlide; bullet 3 is new in the EN deck
// (UA: own translation).
const BULLETS_UK: { level: Level; content: ReactNode }[] = [
  {
    level: 'high',
    content: (
      <>
        персонально для мене найкраще заходить флоу, у якому я працюю з{' '}
        <Emphasis color="orange">агентом повністю в терміналі</Emphasis>
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        але можу відкрити IDE (найчастіше{' '}
        <span className="text-cyan">VS Code</span>) для точкових невеликих змін, які хочу
        зробити вручну
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        термінал швидше відучує від старої ментальної моделі{' '}
        <Emphasis color="dim">«я редагую текст»</Emphasis>
        {' '}і привчає до нової:{' '}
        <Emphasis color="green">«я ставлю задачі агенту»</Emphasis>
      </>
    ),
  },
  {
    level: 'low',
    content: (
      <>
        не почуваєтеся впевнено в терміналі? є плагіни:{' '}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="slide-link slide-link--cyan"
        >
          VS Code
        </a>
        {' '}або{' '}
        <a
          href="https://plugins.jetbrains.com/plugin/27310-claude-code-beta-"
          target="_blank"
          rel="noopener noreferrer"
          className="slide-link slide-link--cyan"
        >
          JetBrains IDE
        </a>
      </>
    ),
  },
];

const BULLETS_EN: { level: Level; content: ReactNode }[] = [
  {
    level: 'high',
    content: (
      <>
        personally, the flow that works best for me is working with{' '}
        <Emphasis color="orange">an agent entirely in the terminal</Emphasis>
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        but I'll open an IDE (usually{' '}
        <span className="text-cyan">VS Code</span>) for small, targeted edits I want to
        make by hand
      </>
    ),
  },
  {
    level: 'medium',
    content: (
      <>
        the terminal weans you off the old mental model{' '}
        <Emphasis color="dim">"I'm editing text"</Emphasis>
        {' '}faster, and teaches the new one:{' '}
        <Emphasis color="green">"I'm assigning tasks to an agent"</Emphasis>
      </>
    ),
  },
  {
    level: 'low',
    content: (
      <>
        not comfortable in the terminal? there are plugins:{' '}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="slide-link slide-link--cyan"
        >
          VS Code
        </a>
        {' '}or{' '}
        <a
          href="https://plugins.jetbrains.com/plugin/27310-claude-code-beta-"
          target="_blank"
          rel="noopener noreferrer"
          className="slide-link slide-link--cyan"
        >
          JetBrains IDE
        </a>
      </>
    ),
  },
];

export const DisclaimerSlide: SlideDefinition = {
  id: 'disclaimer',
  title: (
    <>
      {/* UA: own translation (the UA deck had no title here) */}
      <span className="text-dim">&gt;</span> <T uk="термінал чи IDE?" en="terminal or IDE?" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => {
    // one bullet at a time — each reveal replaces the previous one, so the
    // narrow center column between the fighters never overflows.
    const activeBullet = revealStage - 1;

    return (
    <div className="vs-battle-slide">
      {/* Left Fighter - Terminal */}
      <div className="vs-fighter vs-fighter--left">
        <img
          src={terminalFighter}
          alt="Terminal CLI Fighter"
          className="vs-fighter-image"
        />
        <div className="vs-fighter-name">Terminal</div>
      </div>

      {/* Center - VS + Disclaimer */}
      <div className="vs-center-content">
        <div className="vs-badge">VS</div>
        <div className="vs-disclaimer-content">
          {tr(lang, BULLETS_UK, BULLETS_EN).map((item, i) =>
            i === activeBullet ? (
              <LevelItem key={i} level={item.level}>{item.content}</LevelItem>
            ) : null,
          )}
        </div>
      </div>

      {/* Right Fighter - IDE */}
      <div className="vs-fighter vs-fighter--right">
        <img
          src={ideFighter}
          alt="IDE Code Editor Fighter"
          className="vs-fighter-image"
        />
        <div className="vs-fighter-name">IDE</div>
      </div>

    </div>
    );
  },
  notes: 'Personal disclaimer about terminal vs IDE workflow preferences - Mortal Kombat style!',
};
