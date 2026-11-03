import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Level, LevelItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import chatComparison from '/junior-engineer-comparison.png?url';

function KeyInsightArrow() {
  return (
    <span className="key-insight-arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// UA copy: bullets 5-6 and the punchline from the UA deck JuniorEngineerSlide; the UA deck framed
// Claude as a "chaotic partner", the EN deck as a junior-engineer team — EN meaning wins,
// so bullets 1-4 are UA: own translation.
const BULLETS_UK: { level: Level; content: ReactNode }[] = [
  { level: 'high',   content: <>ставтеся до Claude Code як до <Emphasis color="orange">дуже талановитого джуна</Emphasis>, якого ви щойно найняли в команду</> },
  { level: 'high',   content: <>насправді, <Emphasis color="orange">це ціла команда</Emphasis> дуже талановитих джунів</> },
  { level: 'medium', content: <>у них величезні «книжкові» знання, але вони нічого не знають про процеси й кодову базу вашої компанії</> },
  { level: 'high',   content: <>це <Emphasis color="orange">їхній перший день</Emphasis>, а ви — техлід, який має організувати їхню роботу</> },
  { level: 'high',   content: <>термінальний інтерфейс — це ваш <Emphasis color="green">чат-застосунок</Emphasis></> },
  { level: 'medium', content: <>ви можете давати їм завдання, але потрібно допомагати з <Emphasis color="green">контекстом</Emphasis> та <Emphasis color="green">рев'ю</Emphasis></> },
];

const BULLETS_EN: { level: Level; content: ReactNode }[] = [
  { level: 'high',   content: <>treat Claude Code as a <Emphasis color="orange">very talented junior engineer</Emphasis> you've just hired onto your team</> },
  { level: 'high',   content: <>actually, <Emphasis color="orange">it's a whole team</Emphasis> of very talented junior engineers</> },
  { level: 'medium', content: <>they have vast "book" knowledge, but know nothing about your company's processes and codebase</> },
  { level: 'high',   content: <>it's <Emphasis color="orange">their first day</Emphasis>, and you're the tech lead who needs to organize their work</> },
  { level: 'high',   content: <>the terminal interface is your <Emphasis color="green">chat application</Emphasis></> },
  { level: 'medium', content: <>you can hand them your tasks, but you need to help with <Emphasis color="green">context</Emphasis> and <Emphasis color="green">reviews</Emphasis></> },
];

export const JuniorEngineerSlide: SlideDefinition = {
  id: 'junior-engineer',
  title: (
    <>
      {/* UA: own translation (the UA deck had a different heading) */}
      <span className="text-dim">&gt;</span> <T uk="що писати в той термінал?" en="what to type in that terminal?" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length + 1,
  content: ({ revealStage, lang }) => {
    const showInsight = revealStage >= BULLETS_EN.length + 1;

    // Final reveal: drop all the bullets and show only the punchline + the
    // one screenshot (Slack and Claude Code carrying the same request).
    if (showInsight) {
      return (
        <div className="junior-engineer-final">
          <div className="key-insight junior-engineer-punchline">
            {tr(lang, 'що б ви написали людині?', 'what would you write to a human?')}
            <KeyInsightArrow />
            <Emphasis color="orange">{tr(lang, 'пишіть це Claude Code', 'write it to Claude Code')}</Emphasis>
          </div>

          <img
            src={chatComparison}
            alt={tr(lang, 'Той самий запит у Slack і в терміналі Claude Code', 'The same request sent in Slack and in the Claude Code terminal')}
            className="junior-engineer-combined"
            loading="lazy"
          />
        </div>
      );
    }

    // Build-up: text only, revealed one bullet at a time.
    return (
      <div className="junior-engineer-text">
        {tr(lang, BULLETS_UK, BULLETS_EN).map((item, i) => (
          <LevelItem key={i} level={item.level} hidden={revealStage < i + 1}>
            {item.content}
          </LevelItem>
        ))}
      </div>
    );
  },
};
