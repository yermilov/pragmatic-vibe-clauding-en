import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Quote, SlideItem } from '../components/SlideElements';


const LEFT_BULLETS: ReactNode[] = [
  <>an AI agent that generates code is a very expensive <Emphasis color="orange">autocomplete</Emphasis></>,
  <>set yourself a goal: do <Emphasis color="green">everything</Emphasis> with Claude Code</>,
  <>prioritize <Emphasis color="green">feedback loops</Emphasis></>,
  <>install a <Emphasis color="green">CLI</Emphasis> (not MCP!) for everything you use</>,
  <>use the <Emphasis color="green">Claude Chrome extension</Emphasis> when there's no CLI</>,
];

const PROMPTS: ReactNode[] = [
  <Quote>hey claude, open github in chrome and generate ssh key for me</Quote>,
  <Quote>hey claude, configure dev environment for me</Quote>,
  <Quote>hey claude, here is a bug report I've received mycompany.slack.com/archives/p1778239</Quote>,
  <Quote>hey claude, monitor CI jobs in my PR and fix failing tests until pipeline is green</Quote>,
];

export const BreakOutOfCodingSlide: SlideDefinition = {
  id: 'break-out-of-coding',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">not just</span>{' '}
      <span className="text-orange">coding</span>
    </>
  ),
  content: ({ revealStage }) => (
    <div className="two-lists">
      {/* Left column: conceptual bullets */}
      <div className="two-lists__col two-lists__col--half">
        {LEFT_BULLETS.map((bullet, i) => (
          <SlideItem key={i} delay={i === 0 ? 0.05 : 0} hidden={revealStage < i}>
            {bullet}
          </SlideItem>
        ))}
      </div>

      {/* Right column: example Claude prompts */}
      <div className="two-lists__col">
        {PROMPTS.map((prompt, i) => (
          <SlideItem key={i} delay={0} hidden={revealStage < LEFT_BULLETS.length + i}>
            {prompt}
          </SlideItem>
        ))}
      </div>
    </div>
  ),
  maxRevealStages: LEFT_BULLETS.length + PROMPTS.length - 1,
  notes:
    'One point per reveal. Left column: coding is autocomplete; goal — do everything with Claude Code; feedback loops; CLI instead of MCP; Chrome extension as the escape hatch. Right column: concrete prompt examples across SDLC stages.',
};
