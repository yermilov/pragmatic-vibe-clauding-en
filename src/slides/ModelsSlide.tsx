import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';

// The model ladder, Anthropic and OpenAI side by side (Yarik's pairing and guidance, 2026-11-04):
// fable/astra · opus/sol · sonnet/terra · haiku/luna. Each pair owns one of the deck's four accents.
type Tier = 'fable' | 'opus' | 'sonnet' | 'haiku';

type Rung = { tier: Tier; claude: string; codex: string; uk: ReactNode; en: ReactNode };

// UA: own translation of Yarik's English guidance
const LADDER: Rung[] = [
  {
    tier: 'fable',
    claude: 'fable',
    codex: 'astra',
    uk: 'надскладні, відкриті задачі: дайте проблему, рішення якої ви не знаєте',
    en: "extremely hard, open-ended tasks: give it a problem you don't know the solution to",
  },
  {
    tier: 'opus',
    claude: 'opus',
    codex: 'sol',
    uk: 'основна модель, якщо готові платити більше; оркестратор, якщо хочете заощадити',
    en: "the main driver if you're willing to spend more; the orchestrator if you want to be cost-effective",
  },
  {
    tier: 'sonnet',
    claude: 'sonnet',
    codex: 'terra',
    uk: 'імплементує специфікацію; агент для некодінгових задач (браузер, письмо, …)',
    en: 'implements a spec; the agent for non-coding tasks (browser, writing, …)',
  },
  {
    tier: 'haiku',
    claude: 'haiku',
    codex: 'luna',
    uk: "рев'юер, дослідник коду, дуже малі сфокусовані задачі",
    en: 'reviewer, explorer, very small focused tasks',
  },
];

function Pair({ tier, children }: { tier: Tier; children: ReactNode }) {
  return <span className={`models-accent models-tier--${tier}`}>{children}</span>;
}

function TokenNum({ children }: { children: string }) {
  return <code className="code-inline">{children}</code>;
}

// After the four rungs: the effort knob, then context length. UA: Yarik's wording.
const EXTRA_UK: ReactNode[] = [
  <>
    <span className="models-knob">effort</span> — друга ручка: та сама модель думає довше; для <Pair tier="fable">fable/astra</Pair>, <Pair tier="opus">opus/sol</Pair> використовуйте <span className="models-knob">medium</span>; для <Pair tier="haiku">haiku/luna</Pair> — <span className="models-knob">high</span>; для <Pair tier="sonnet">sonnet/terra</Pair> — експериментуйте
  </>,
  <>
    у OpenAI моделей перформанс падає на відмітці <TokenNum>250_000</TokenNum>–<TokenNum>300_000</TokenNum> токенів; Anthropic моделі непогано працюють на будь-якій довжині контексту
  </>,
];

// EN: own translation
const EXTRA_EN: ReactNode[] = [
  <>
    <span className="models-knob">effort</span> is the second knob: the same model thinks longer; use <span className="models-knob">medium</span> for <Pair tier="fable">fable/astra</Pair> and <Pair tier="opus">opus/sol</Pair>, <span className="models-knob">high</span> for <Pair tier="haiku">haiku/luna</Pair>, and experiment with <Pair tier="sonnet">sonnet/terra</Pair>
  </>,
  <>
    OpenAI models' performance drops around the <TokenNum>250_000</TokenNum>–<TokenNum>300_000</TokenNum> token mark; Anthropic models work pretty well at any context length
  </>,
];

const STAGES = LADDER.length + EXTRA_EN.length;

const revealClass = (shown: boolean, newest: boolean) =>
  `${shown ? 'reveal-enter' : 'is-unrevealed'} ${shown && !newest ? 'is-past' : ''}`;

export const ModelsSlide: SlideDefinition = {
  id: 'models',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="моделі" en="models" />
    </>
  ),
  maxRevealStages: STAGES,
  content: ({ revealStage, lang }) => {
    const extras = tr(lang, EXTRA_UK, EXTRA_EN);
    return (
      <div className="models-slide">
        <div className="models-ladder">
          {LADDER.map((rung, i) => (
            <div
              key={rung.tier}
              className={`models-rung models-tier--${rung.tier} ${revealClass(revealStage > i, revealStage === i + 1)}`}
              aria-hidden={revealStage > i ? undefined : true}
            >
              <span className="models-rung__pair">
                {rung.claude}
                <span className="models-rung__slash">/</span>
                {rung.codex}
              </span>
              <span className="models-rung__text">{tr(lang, rung.uk, rung.en)}</span>
            </div>
          ))}
          <div className="models-ladder__axis" aria-hidden="true">
            <T uk="↑ складніша робота · дорожче" en="↑ harder work · pricier" />
          </div>
        </div>

        <div className="models-extras">
          {extras.map((content, k) => {
            const stage = LADDER.length + k + 1;
            return (
              <div
                key={k}
                className={`models-point ${revealClass(revealStage >= stage, revealStage === stage)}`}
                aria-hidden={revealStage >= stage ? undefined : true}
              >
                <span className="models-point__prefix">&gt;</span>
                <span>{content}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  notes:
    'Ladder, top to bottom: fable/astra → opus/sol → sonnet/terra → haiku/luna (Claude / OpenAI). '
    + 'Reveal order is top-down. The Max-plan / pay-per-token advice is folded into the opus/sol '
    + 'line: main driver if you spend more, orchestrator over cheaper agents if you save.',
};
