import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, revealWindow } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import spaceBg from '../assets/skill-space-bg.png?url';
import leftAstronaut from '../assets/skill-was-it-md.png?url';
import rightAstronaut from '../assets/skill-always-been.png?url';

// Slide-level backdrop: dim the nebula so the green/orange terminal copy
// retains contrast, then let the actual nebula bleed full-edge. Layered
// gradient sits ABOVE the image (CSS draws backgrounds top→bottom).
const SLIDE_BG = `
  linear-gradient(180deg,
    color-mix(in srgb, var(--terminal-bg) 62%, transparent) 0%,
    color-mix(in srgb, var(--terminal-bg) 38%, transparent) 45%,
    color-mix(in srgb, var(--terminal-bg) 62%, transparent) 100%
  ),
  url(${spaceBg}) center/cover no-repeat
`;

// UA copy: dou-days-2026 WhatIsSkillSlide; the subagent bullet is own translation.
const BULLETS_UK = [
  <>
    скіл — це просто <Emphasis color="green">SKILL.md</Emphasis>-файл
    з інструкціями, як щось робити
  </>,
  <>
    на відміну від <Emphasis color="orange">MCP server</Emphasis>, не
    займає context window — завантажується лише тоді, коли це потрібно моделі
  </>,
  <>
    на відміну від <Emphasis color="orange">slash command</Emphasis>,
    модель сама викликає його, коли це потрібно
  </>,
  <>
    як і <Emphasis color="orange">сабагент</Emphasis>, може виконуватися в окремому контексті
  </>,
  <>
    може бути цілою <Emphasis color="green">бібліотекою</Emphasis>{' '}
    md-файлів із посиланнями — модель сама навігує та завантажує їх за потреби
  </>,
  <>
    може містити{' '}
    <Emphasis color="green">TypeScript / Python / bash</Emphasis>{' '}
    скрипти для детермінованої автоматизації
  </>,
];

const BULLETS_EN = [
  <>
    a skill is just a <Emphasis color="green">SKILL.md</Emphasis> file
    with instructions on how to do something
  </>,
  <>
    unlike an <Emphasis color="orange">MCP server</Emphasis>, it
    doesn't take up the context window — it loads only when the model
    needs it
  </>,
  <>
    unlike a <Emphasis color="orange">slash command</Emphasis>, the
    model invokes it itself when needed
  </>,
  <>
    like a <Emphasis color="orange">subagent</Emphasis>, it can be executed in a separate context
  </>,
  <>
    it can be a whole <Emphasis color="green">library</Emphasis> of
    md files with links — the model navigates and loads them as needed
  </>,
  <>
    it can contain{' '}
    <Emphasis color="green">TypeScript / Python / bash</Emphasis>{' '}
    scripts for deterministic automation
  </>,
];

export const WhatIsSkillSlide: SlideDefinition = {
  id: 'what-is-skill',
  background: SLIDE_BG,
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      {/* UA: own translation */}
      <span className="text-green"><T uk="але насправді все, що вам треба, — це" en="but really all you need is" /></span>{' '}
      <span className="text-orange"><T uk="скіли" en="skills" /></span>
    </>
  ),
  content: ({ revealStage, lang }) => (
    // Sliding window of three (stage 0 already shows the first point): older
    // bullets have been spoken; dropping them keeps the body at full size.
    <div className="what-is-skill">
      <img
        src={leftAstronaut}
        alt="wait, it's all .md files?"
        loading="lazy"
        className="what-is-skill__astro what-is-skill__astro--left"
      />

      {/* HUD-style bullet card — floats in the nebula */}
      <div className="what-is-skill__card">
        {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage + 1, 3).map(({ item, index, hidden }) => (
          <SlideItem key={index} delay={index === 0 ? 0.05 : 0} hidden={hidden}>
            {item}
          </SlideItem>
        ))}
      </div>

      <img
        src={rightAstronaut}
        alt="always have been."
        loading="lazy"
        className="what-is-skill__astro what-is-skill__astro--right"
      />
    </div>
  ),
  maxRevealStages: 5,
  notes:
    'A skill is just markdown. Does not consume context (unlike MCP), the model decides when to load it (unlike a slash command), can be a library of md with links, can contain TypeScript/Python/bash scripts for deterministic automation. Sliding-window pattern: only the last 3 revealed bullets stay on screen so newer points have room without shrinking the body font.',
};
