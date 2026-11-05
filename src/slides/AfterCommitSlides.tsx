import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem } from '../components/SlideElements';
import { Lang, T, tr } from '../context/LanguageContext';
import { STEPS_EN, STEPS_UK } from './VibeFlowStepsSlide';

// The end of the vibe flow, after 'please commit, push, create pr' (Yarik, 05.11.2026): four
// separate slides, each a fresh context (/clear) and one follow-up prompt, then a fifth that
// combines every one of them with the "does the feedback make sense?" prompt until everyone is
// satisfied. Prompts stay English in both languages (they are typed to the agent).
const TITLE = (
  <>
    <span className="text-dim">&gt;</span>{' '}
    <span className="text-green">vibe</span>{' '}
    <span className="text-orange">flow</span>
  </>
);

const PROMPTS = [
  { id: 'simplify', prompt: 'take a look at last commit and think how implementation can be simplified' },
  { id: 'review', prompt: 'review changes in the last commit' },
  { id: 'proofs', prompt: 'give me undeniable proofs that last commit changes are correct' },
  { id: 'ci', prompt: 'monitor ci checks and fix issues until everything is green' },
];

const FEEDBACK_PROMPT = 'think if feedback makes sense and if you agree - fix issue';

/** The tail of the vibe flow list, dimmed above each follow-up, so the slide reads as the same
 *  list carried on: an ellipsis, then the last step ('please commit, push, create pr'). */
function Tail({ lang }: { lang: Lang }) {
  const steps = tr(lang, STEPS_UK, STEPS_EN);
  return (
    <div className="after-commit__tail" aria-hidden="true">
      <div className="after-commit__ellipsis">⋮</div>
      <SlideItem delay={0}>{steps[steps.length - 1]}</SlideItem>
    </div>
  );
}

function clearThen(prompt: string): SlideDefinition['content'] {
  return ({ revealStage, lang }) => (
    <div className="after-commit">
      <Tail lang={lang} />
      <SlideItem delay={0.05}>
        <Code variant="orange">/clear</Code>
      </SlideItem>
      <SlideItem delay={0} hidden={revealStage < 1}>
        <Quote>{prompt}</Quote>
      </SlideItem>
    </div>
  );
}

const followUps: SlideDefinition[] = PROMPTS.map(({ id, prompt }) => ({
  id: `after-commit-${id}`,
  title: TITLE,
  maxRevealStages: 1,
  content: clearThen(prompt),
  notes: `After the commit: fresh context, then '${prompt}'.`,
}));

// UA: Yarik's wording; EN: own translation
const COMBINE: ReactNode = (
  <T
    uk="комбінуйте кожен із чотирьох варіантів з промптом"
    en="combine each of the four with the prompt"
  />
);
const UNTIL: ReactNode = (
  <T uk="— допоки всі не будуть задоволені" en="— until everyone is satisfied" />
);

const feedbackLoop: SlideDefinition = {
  id: 'after-commit-feedback',
  title: TITLE,
  maxRevealStages: 1,
  content: ({ revealStage, lang }) => (
    <div className="after-commit">
      <Tail lang={lang} />
      <SlideItem delay={0.05}>{COMBINE}</SlideItem>
      <SlideItem delay={0} hidden={revealStage < 1}>
        <Quote>{FEEDBACK_PROMPT}</Quote> {UNTIL}
      </SlideItem>
    </div>
  ),
  notes:
    'Each of the four follow-ups (simplify / review / proofs / CI) produces feedback; hand it back with '
    + `'${FEEDBACK_PROMPT}' and loop until everyone — you, the reviewers, the CI — is satisfied.`,
};

export const AfterCommitSlides: SlideDefinition[] = [...followUps, feedbackLoop];
