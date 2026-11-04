import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';
import { tr } from '../context/LanguageContext';

// UA copy: UA deck VibeFlowSlide, adapted where the EN steps changed (approve-the-plan, /simplify).
const STEPS_UK: ReactNode[] = [
  <><Code variant="orange">/clear</Code> очищуємо context window</>,
  <>описуємо фічу / багу, <span className="vibe-flow__spotlight">формуємо контекст</span></>,
  <>ітеруємося по плану</>,
  <>затверджуємо план — Claude Code його виконує</>,
  <><Code variant="orange">/commit-push-pr</Code></>,
  <><Code variant="orange">/clear</Code></>,
  <><Code variant="orange">/simplify</Code> або <Code variant="orange">/review</Code></>,
];

const STEPS_EN: ReactNode[] = [
  <><Code variant="orange">/clear</Code> clear the context window</>,
  <>describe the feature / bug, <span className="vibe-flow__spotlight">build the context</span></>,
  <>iterate on the plan</>,
  <>approve the plan — Claude Code executes it</>,
  <><Code variant="orange">/commit-push-pr</Code></>,
  <><Code variant="orange">/clear</Code></>,
  <><Code variant="orange">/simplify</Code> or <Code variant="orange">/review</Code></>,
];

// Contextual asides, keyed by the reveal stage they belong to. They share
// ONE slot under the steps (stacked in the same grid cell), so the space is
// reserved from stage 0 and the steps never move when an aside comes or goes.
// UA: own translation
const HINTS_UK: Record<number, ReactNode> = {
  4: (
    <>
      що таке <Code variant="orange">/commit-push-pr</Code>? скіл з{' '}
      <span className="text-orange">Anthropic plugin marketplace</span>
    </>
  ),
};

const HINTS_EN: Record<number, ReactNode> = {
  4: (
    <>
      what is <Code variant="orange">/commit-push-pr</Code>? a skill defined in the{' '}
      <span className="text-orange">Anthropic plugin marketplace</span>
    </>
  ),
};

export const VibeFlowStepsSlide: SlideDefinition = {
  id: 'vibe-flow-steps',
  // After "build the context" (stage 1) detour into the context-gathering
  // deep-dive; after "/commit-push-pr" (stage 4) detour into marketplaces.
  detours: [
    { atStage: 1, toId: 'context-advice', returnStage: 2 },
    { atStage: 4, toId: 'marketplaces', returnStage: 5 },
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

      <div className="vibe-flow__hints">
        {Object.entries(tr(lang, HINTS_UK, HINTS_EN)).map(([stage, hint]) => {
          const shown = revealStage === Number(stage);
          return (
            <div
              key={stage}
              className={`vibe-flow__hint ${shown ? 'reveal-enter' : 'is-unrevealed'}`}
              aria-hidden={!shown || undefined}
            >
              {hint}
            </div>
          );
        })}
      </div>
    </div>
  ),
  maxRevealStages: STEPS_EN.length - 1,
  notes:
    'Workflow: clear the session, describe the problem, iterate on the plan, approve and let it execute, commit',
};
