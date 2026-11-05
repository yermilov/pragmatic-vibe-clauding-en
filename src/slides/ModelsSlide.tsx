import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';

// The model ladder, Anthropic and OpenAI side by side (Yarik's pairing and guidance, 2026-11-04):
// fable/astra · opus/sol · sonnet/terra · haiku/luna. Each pair owns one of the deck's four accents.
type Tier = 'fable' | 'opus' | 'sonnet' | 'haiku';

type Effort = 'medium' | 'high' | 'experiment';

type Rung = { tier: Tier; effort: Effort; claude: string; codex: string; uk: ReactNode; en: ReactNode };

// UA: own translation of Yarik's English guidance
const LADDER: Rung[] = [
  {
    tier: 'fable',
    effort: 'medium',
    claude: 'fable',
    codex: 'astra',
    uk: 'надскладні, відкриті задачі: дайте проблему, рішення якої ви не знаєте',
    en: "extremely hard, open-ended tasks: give it a problem you don't know the solution to",
  },
  {
    tier: 'opus',
    effort: 'medium',
    claude: 'opus',
    codex: 'sol',
    uk: 'основна модель, якщо готові платити більше; оркестратор, якщо хочете заощадити',
    en: "the main driver if you're willing to spend more; the orchestrator if you want to be cost-effective",
  },
  {
    tier: 'sonnet',
    effort: 'experiment',
    claude: 'sonnet',
    codex: 'terra',
    uk: 'імплементує специфікацію; агент для некодінгових задач (браузер, письмо, …)',
    en: 'implements a spec; the agent for non-coding tasks (browser, writing, …)',
  },
  {
    tier: 'haiku',
    effort: 'high',
    claude: 'haiku',
    codex: 'luna',
    uk: "рев'юер, дослідник коду, дуже малі сфокусовані задачі",
    en: 'reviewer, explorer, very small focused tasks',
  },
];

const LEVELS = ['low', 'medium', 'high'] as const;

// Stages: 1–4 reveal the rungs top-down. 5 brings in effort: every guidance cell turns into an
// effort dial (nothing picked yet). Then the picks light up in the order Yarik says them:
// 6 fable/astra + opus/sol → medium, 7 haiku/luna → high, 8 sonnet/terra → experiment.
const EFFORT_INTRO = LADDER.length + 1;
const EFFORT_PICK: Record<Effort, number> = { medium: EFFORT_INTRO + 1, high: EFFORT_INTRO + 2, experiment: EFFORT_INTRO + 3 };
const STAGES = EFFORT_INTRO + 3;

function EffortDial({ effort, picked, lang }: { effort: Effort; picked: boolean; lang: 'uk' | 'en' }) {
  const guess = picked && effort === 'experiment';
  return (
    <span className={`models-dial ${guess ? 'models-dial--guess' : ''}`}>
      {LEVELS.map((level) => (
        <span key={level} className={`models-dial__level ${picked && level === effort ? 'is-on' : ''}`}>
          {level}
        </span>
      ))}
      <span className={`models-dial__note ${guess ? 'reveal-enter' : 'is-unrevealed'}`}>
        {/* UA: Yarik's wording; EN: own translation */}
        {tr(lang, '← експериментуйте', '← experiment')}
      </span>
    </span>
  );
}

export const ModelsSlide: SlideDefinition = {
  id: 'models',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="моделі" en="models" />
    </>
  ),
  maxRevealStages: STAGES,
  content: ({ revealStage, lang }) => {
    const effortScene = revealStage >= EFFORT_INTRO;
    return (
      <div className={`models-slide ${effortScene ? 'models-slide--effort' : ''}`}>
        <div className="models-board">
          {/* the axis: an arrow along the ladder, its two ends captioned (horizontal, readable) */}
          <div className="models-axis" aria-hidden="true">
            <span className="models-axis__head">▲</span>
            <span className="models-axis__line" />
            <span className="models-axis__head">▼</span>
          </div>
          <div className="models-axis__caption">
            <T uk="складніша робота · дорожче" en="harder work · pricier" />
          </div>

          <div className="models-ladder">
            {LADDER.map((rung, i) => {
              const shown = revealStage > i;
              const picked = revealStage >= EFFORT_PICK[rung.effort];
              const current = effortScene ? revealStage === EFFORT_PICK[rung.effort] : revealStage === i + 1;
              const state = !shown ? 'is-pending' : current ? 'is-current' : 'is-done';
              return (
                <div key={rung.tier} className={`models-rung models-tier--${rung.tier} ${state}`}>
                  <span className="models-rung__pair">
                    {rung.claude}
                    <span className="models-rung__slash">/</span>
                    {rung.codex}
                  </span>
                  {/* power / price: 4 cells at the top rung, 1 at the bottom */}
                  <span className="models-rung__meter" aria-hidden="true">
                    {[0, 1, 2, 3].map((c) => (
                      <span key={c} className={c < LADDER.length - i ? 'is-on' : ''} />
                    ))}
                  </span>
                  {/* one cell, two layers: the guidance, then (effort scene) the effort dial on top */}
                  <span className="models-rung__cell">
                    <span
                      className={`models-rung__text ${shown && !effortScene ? 'reveal-enter' : 'is-unrevealed'}`}
                      aria-hidden={shown && !effortScene ? undefined : true}
                    >
                      {tr(lang, rung.uk, rung.en)}
                    </span>
                    <span
                      className={`models-rung__effort ${effortScene ? 'reveal-enter' : 'is-unrevealed'}`}
                      aria-hidden={effortScene ? undefined : true}
                    >
                      <EffortDial effort={rung.effort} picked={picked} lang={lang} />
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="models-axis__caption">
            {/* UA/EN: own wording, the lower end of the same axis */}
            <T uk="простіша робота · дешевше" en="simpler work · cheaper" />
          </div>
        </div>

        {/* laid out from stage 0 so its arrival moves nothing. UA: Yarik's wording */}
        <div
          className={`models-point ${effortScene ? 'reveal-enter' : 'is-unrevealed'}`}
          aria-hidden={effortScene ? undefined : true}
        >
          <span className="models-point__prefix">&gt;</span>
          <span>
            <T
              uk={<><span className="models-knob">effort</span> — друга ручка: та сама модель думає довше</>}
              en={<><span className="models-knob">effort</span> is the second knob: the same model thinks longer</>}
            />
          </span>
        </div>
      </div>
    );
  },
  notes:
    'Ladder, top to bottom (the meter is relative power / price): fable/astra → opus/sol → '
    + 'sonnet/terra → haiku/luna (Claude / OpenAI). Reveal order is top-down. The Max-plan / '
    + 'pay-per-token advice is folded into the opus/sol line: main driver if you spend more, '
    + 'orchestrator over cheaper agents if you save. Then effort: each guidance cell becomes a '
    + 'low/medium/high dial; picks light up — fable/astra + opus/sol medium, haiku/luna high, '
    + 'sonnet/terra experiment.',
};
