import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Quote, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: dou-days-2026 BreakOutOfCodingSlide (this slide was ported from there).
const LEFT_BULLETS_UK: ReactNode[] = [
  <>AI-агент, який генерує код — це дуже дорогий <Emphasis color="orange">автокомпліт</Emphasis></>,
  <>поставте собі ціль: робити <Emphasis color="green">все</Emphasis> за допомогою агентів</>,
  <>пріоритизуйте <Emphasis color="green">feedback loops</Emphasis></>,
  <>встановіть <Emphasis color="green">CLI</Emphasis> (не MCP!) для всього, чим користуєтеся</>,
  <>там, де CLI немає, — просіть агента <Emphasis color="green">відкрити браузер і скористатися web UI</Emphasis></>,
];

const LEFT_BULLETS_EN: ReactNode[] = [
  <>an AI agent that generates code is a very expensive <Emphasis color="orange">autocomplete</Emphasis></>,
  <>set yourself a goal: do <Emphasis color="green">everything</Emphasis> with agents</>,
  <>prioritize <Emphasis color="green">feedback loops</Emphasis></>,
  <>install a <Emphasis color="green">CLI</Emphasis> (not MCP!) for everything you use</>,
  <>where there's no CLI, ask the agent to <Emphasis color="green">open a browser and use the web UI</Emphasis></>,
];

// Prompts stay English in both languages — they are what you type to the agent.
const PROMPTS: ReactNode[] = [
  <Quote>hey how r u, open github in chrome and generate ssh key for me</Quote>,
  <Quote>hey how r u, read our onboarding docs and configure dev environment for me</Quote>,
  <Quote>hey how r u, here is a bug report I've received mycompany.slack.com/archives/p1778239</Quote>,
  <Quote>hey how r u, research this topic and help me to prepare a presentation</Quote>,
];

export const BreakOutOfCodingSlide: SlideDefinition = {
  id: 'break-out-of-coding',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green"><T uk="не тільки" en="not just" /></span>{' '}
      <span className="text-orange"><T uk="кодинг" en="coding" /></span>
    </>
  ),
  content: ({ revealStage, lang }) => (
    <div className="two-lists">
      {/* Left column: conceptual bullets */}
      <div className="two-lists__col two-lists__col--half">
        {tr(lang, LEFT_BULLETS_UK, LEFT_BULLETS_EN).map((bullet, i) => (
          <SlideItem key={i} delay={i === 0 ? 0.05 : 0} hidden={revealStage < i}>
            {bullet}
          </SlideItem>
        ))}
      </div>

      {/* Right column: example prompts to the agent */}
      <div className="two-lists__col">
        {PROMPTS.map((prompt, i) => (
          <SlideItem key={i} delay={0} hidden={revealStage < LEFT_BULLETS_EN.length + i}>
            {prompt}
          </SlideItem>
        ))}
      </div>
    </div>
  ),
  maxRevealStages: LEFT_BULLETS_EN.length + PROMPTS.length - 1,
  notes:
    'One point per reveal. Left column: coding is autocomplete; goal — do everything with agents; feedback loops; CLI instead of MCP; where there is no CLI, the agent drives the web UI in a browser. Right column: concrete prompt examples beyond coding (ssh key, onboarding, bug report, research + presentation).',
};
