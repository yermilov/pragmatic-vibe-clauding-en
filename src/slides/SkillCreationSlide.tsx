import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// Right after the Warcraft-sounds skill. Yarik's narrative (05.11.2026): do I need to know how
// to make a skill? — of course not — ask the agent to figure it out. The meta-skill (a skill for
// creating skills) is deliberately not mentioned yet. UA: Yarik's wording; EN: own translation.
// Both links checked 200 on 05.11.2026.
const links = (
  <>
    <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
      platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
    </SlideLink>
    ,{' '}
    <SlideLink href="https://agentskills.io/skill-creation/best-practices">
      agentskills.io/skill-creation/best-practices
    </SlideLink>
  </>
);

const BULLETS_UK: ReactNode[] = [
  <>
    чи маю я знати, як створити скіл? <Emphasis color="orange">НУ ЗВИЧАЙНО НІ!</Emphasis>
  </>,
  <>
    попросіть агента <Emphasis color="green">розібратися, як це робити</Emphasis>
  </>,
  <>
    запустіть deep research по best practices, дайте агенту {links} і цю презентацію
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    do I need to know how to create a skill? <Emphasis color="orange">OF COURSE NOT!</Emphasis>
  </>,
  <>
    ask the agent <Emphasis color="green">to figure out how to do it</Emphasis>
  </>,
  <>
    run deep research on the best practices, feed the agent {links}, and this presentation
  </>,
];

export const SkillCreationSlide: SlideDefinition = {
  id: 'skill-creation',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <T uk="а як мені створити скіл?" en="so how do I create a skill?" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    <div className="code-slop">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
      ))}
    </div>
  ),
  notes:
    'Right after the Warcraft-sounds skill: do I need to know how to make a skill? Of course not — '
    + 'ask the agent to figure it out. Do not bring up the meta-skill (a skill for creating skills) '
    + 'yet. Then the materials to give it: deep research on best practices, the two best-practices '
    + 'pages and this deck.',
};
