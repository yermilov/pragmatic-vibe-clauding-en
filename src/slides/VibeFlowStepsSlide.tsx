import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';
import { tr } from '../context/LanguageContext';

// UA copy: UA deck VibeFlowSlide, adapted where the EN steps changed (approve-the-plan, /simplify).
const STEPS_UK: ReactNode[] = [
  <><Code variant="orange">/clear</Code> очищуємо context window</>,
  <>переходимо у <Code>plan mode</Code></>,
  <>описуємо фічу / багу, <span className="vibe-flow__spotlight">формуємо контекст</span></>,
  <>ітеруємося по плану</>,
  <>затверджуємо план — Claude Code його виконує</>,
  <><Code variant="orange">/commit-push-pr</Code></>,
  <><Code variant="orange">/clear</Code></>,
  <><Code variant="orange">/simplify</Code> або <Code variant="orange">/review</Code></>,
];

const STEPS_EN: ReactNode[] = [
  <><Code variant="orange">/clear</Code> clear the context window</>,
  <>switch to <Code>plan mode</Code></>,
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
  1: (
    <>
      що таке <Code>plan mode</Code>? режим, у якому Claude Code лише{' '}
      «вивчає» і йому заборонено щось робити — ідеально для етапу{' '}
      <span className="text-green">збору контексту</span>
    </>
  ),
  5: (
    <>
      що таке <Code variant="orange">/commit-push-pr</Code>? скіл з{' '}
      <span className="text-orange">Anthropic plugin marketplace</span>
    </>
  ),
};

const HINTS_EN: Record<number, ReactNode> = {
  1: (
    <>
      what is <Code>plan mode</Code>? a state where Claude Code only{' '}
      "learns" and is forbidden from taking any action — perfect for the{' '}
      <span className="text-green">context-gathering</span> stage
    </>
  ),
  5: (
    <>
      what is <Code variant="orange">/commit-push-pr</Code>? a skill defined in the{' '}
      <span className="text-orange">Anthropic plugin marketplace</span>
    </>
  ),
};

export const VibeFlowStepsSlide: SlideDefinition = {
  id: 'vibe-flow-steps',
  // After "build the context" (stage 2) detour into the context-gathering
  // deep-dive; after "/commit-push-pr" (stage 5) detour into marketplaces.
  detours: [
    { atStage: 2, toId: 'context-advice', returnStage: 3 },
    { atStage: 5, toId: 'marketplaces', returnStage: 6 },
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
  maxRevealStages: 7,
  notes:
    'Workflow: clear the session, plan mode, describe the problem, iterate on the plan, auto-accept, commit',
};
