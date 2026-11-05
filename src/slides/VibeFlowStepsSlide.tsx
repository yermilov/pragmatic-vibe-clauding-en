import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem } from '../components/SlideElements';
import { tr } from '../context/LanguageContext';

// UA copy: UA deck VibeFlowSlide, adapted where the EN steps changed (approve-the-plan, /simplify).
export const STEPS_UK: ReactNode[] = [
  <><Code variant="orange">/clear</Code> очищуємо context window</>,
  <>описуємо фічу / багу, <span className="vibe-flow__spotlight">формуємо контекст</span></>,
  // UA: Yarik's wording (05.11.2026); EN: own translation
  <>попросіть агента спочатку підготувати план, як він буде реалізовувати вашу задачу (можливо, з використанням більш потужної моделі)</>,
  <>як тільки ви задоволені планом — просіть агента виконати його (можливо, з меншим effort чи навіть простішою моделлю)</>,
  <><Quote>please commit, push, create pr</Quote></>,
];

export const STEPS_EN: ReactNode[] = [
  <><Code variant="orange">/clear</Code> clear the context window</>,
  <>describe the feature / bug, <span className="vibe-flow__spotlight">build the context</span></>,
  <>ask the agent to first prepare a plan for how it will implement your task (possibly with a more powerful model)</>,
  <>once you're happy with the plan — ask the agent to execute it (possibly with lower effort or even a simpler model)</>,
  <><Quote>please commit, push, create pr</Quote></>,
];

export const VibeFlowStepsSlide: SlideDefinition = {
  id: 'vibe-flow-steps',
  // After "build the context" (stage 1): the context-gathering deep-dive. After the commit
  // prompt (stage 4, the last step): "learn to trust your agents" (which detours into "have
  // some fun" and "how do I create a skill?"), then "avoid code slop" (which detours into
  // marketplaces). The flow then continues on the five after-commit slides.
  detours: [
    { atStage: 1, toId: 'context-advice', returnStage: 2 },
    { atStage: 4, toId: 'launch', returnStage: 5 },
    { atStage: 4, toId: 'code-slop', returnStage: 5 },
  ],
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">vibe</span>{' '}
      <span className="text-orange">flow</span>
    </>
  ),
  content: ({ revealStage, lang }) => (
    <div className="vibe-flow">
      {tr(lang, STEPS_UK, STEPS_EN).map((step, i) => (
        <SlideItem key={i} delay={i === 0 ? 0.05 : 0} hidden={revealStage < i}>
          {step}
        </SlideItem>
      ))}
    </div>
  ),
  maxRevealStages: STEPS_EN.length - 1,
  notes:
    'Workflow: clear the session, describe the problem and build the context, ask for a plan, '
    + 'execute it, commit/push/PR. The follow-ups (simplify, review, proofs, CI, feedback loop) are '
    + 'the next five slides.',
};
