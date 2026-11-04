import { SlideDefinition } from '../types/slides';

import copilotAutocomplete from '/timeline-copilot-autocomplete.png?url';
import cursorFrontend from '/timeline-cursor-frontend.png?url';
import mentoringLlm from '/timeline-mentoring-llm.png?url';
import aiTechDebt from '/timeline-ai-tech-debt.png?url';

import { T, tr, type Lang } from '../context/LanguageContext';

interface TimelineItem {
  anchorDate: Date | null;
  text: string;
  textUk: string;
  bullets?: string[];
  bulletsUk?: string[];
  image: string | null;
  imageClassName?: string;
  emphasis?: boolean;
}

function pluralUk(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function timeLabel(anchorDate: Date | null, lang: Lang): string {
  if (!anchorDate) return tr(lang, 'відтоді', 'since then');
  const now = new Date();
  const months =
    (now.getFullYear() - anchorDate.getFullYear()) * 12 +
    (now.getMonth() - anchorDate.getMonth());
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (lang === 'uk') {
    // UA: own translation of the year/month label (dou-days-2026 only had months).
    const monthPartUk = (m: number) => `${m} ${pluralUk(m, 'місяць', 'місяці', 'місяців')}`;
    if (months < 12) return `${monthPartUk(months)} тому`;
    const yearPartUk = `${years} ${pluralUk(years, 'рік', 'роки', 'років')}`;
    return `${rem === 0 ? yearPartUk : `${yearPartUk} ${monthPartUk(rem)}`} тому`;
  }
  const monthPart = (m: number) => `${m} month${m === 1 ? '' : 's'}`;
  if (months < 12) return `${monthPart(months)} ago`;
  const yearPart = `${years} year${years === 1 ? '' : 's'}`;
  return `${rem === 0 ? yearPart : `${yearPart} ${monthPart(rem)}`} ago`;
}

// UA copy: dou-days-2026 TimelineSlide (same items); last two bullets trimmed to the EN meaning.
const timelineItems: TimelineItem[] = [
  { anchorDate: new Date(2024, 9),  text: 'copilot? nice autocomplete', textUk: 'copilot? крутий автокомпліт', image: copilotAutocomplete },
  { anchorDate: new Date(2024, 10), text: "I don't do frontend, cursor, help me out", textUk: 'я не вмію у фронтенд, cursor, допоможи', image: cursorFrontend, imageClassName: 'timeline-panel__image--zoom-down-anim' },
  { anchorDate: new Date(2025, 2),  text: 'what if this is not just code generation but pair programming?', textUk: 'а що як це не просто кодогенерація, а pair programming?', image: mentoringLlm },
  { anchorDate: new Date(2025, 3),  text: 'but it is still toy tech, right?', textUk: 'але ж це все ще іграшкова технологія, так?', image: aiTechDebt, imageClassName: 'timeline-panel__image--zoom-anim' },
  {
    anchorDate: new Date(2025, 4),
    text: 'Claude Code proof of concept with Anthropic',
    textUk: 'одна з останніх хвиль бета-тесту Claude Code від\u00a0Anthropic', // UA: Yarik's wording
    bullets: [
      'saw the potential and consciously stopped writing code by hand',
      'found my comfortable AI agentic coding workflow',
      'championed Claude Code at Superhuman',
      'built internal tooling: plugins, skills, agents',
    ],
    bulletsUk: [
      'побачив потенціал і свідомо більше не писав жодного рядка коду вручну',
      'знайшов свій комфортний AI agentic coding workflow',
      'просував Claude Code у Grammarly',
      'будував внутрішні інструменти: плагіни, скіли, агенти',
    ],
    image: null,
  },
];

const lastIdx = timelineItems.length - 1;
const lastBulletsCount = timelineItems[lastIdx].bullets?.length ?? 0;

export const TimelineSlide: SlideDefinition = {
  id: 'timeline',
  maxRevealStages: lastIdx + lastBulletsCount,
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="AI-first таймлайн" en="AI-first timeline" />
    </>
  ),
  content: ({ revealStage, lang }) => {
    const currentStage = Math.min(revealStage, lastIdx);
    const currentItem = timelineItems[currentStage];
    const visibleBulletCount =
      currentStage === lastIdx
        ? Math.min(lastBulletsCount, Math.max(0, revealStage - lastIdx))
        : currentItem.bullets?.length ?? 0;
    const currentText = tr(lang, currentItem.textUk, currentItem.text);
    const currentBullets = tr(lang, currentItem.bulletsUk, currentItem.bullets);

    return (
      <div className="timeline-slide-v2">
        <div className="timeline-layout">
          {/* LEFT: Git log - time markers only */}
          <div className="timeline-log">
            <div className="timeline-log__list">
              {timelineItems.map((item, idx) => {
                const isActive = idx === currentStage;
                const isPast = idx < currentStage;
                const isEmphasis = item.emphasis;

                return (
                  <div
                    key={idx}
                    className={`timeline-log__item ${isActive ? 'timeline-log__item--active' : ''} ${isPast ? 'timeline-log__item--past' : ''} ${isEmphasis && isActive ? 'timeline-log__item--emphasis' : ''}`}
                  >
                    <div className={`timeline-log__time ${isEmphasis ? 'timeline-log__time--emphasis' : ''}`}>
                      {timeLabel(item.anchorDate, lang)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Content panel - text + image */}
          <div className="timeline-panel">
            <div className="timeline-panel__content" key={currentStage}>
              {/* Text */}
              {currentBullets ? (
                <>
                  <div className="timeline-panel__text timeline-panel__text--emphasis">
                    {currentText}
                  </div>
                  <ul className="timeline-panel__list">
                    {currentBullets.map((b, i) => (
                      <li
                        key={i}
                        className={i < visibleBulletCount ? 'reveal-enter' : 'is-unrevealed'}
                        aria-hidden={i >= visibleBulletCount || undefined}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className={`timeline-panel__text ${currentItem.emphasis ? 'timeline-panel__text--emphasis' : ''}`}>
                  {currentText}
                </div>
              )}

              {/* Image if available */}
              {currentItem.image && (
                <img
                  src={currentItem.image}
                  alt={currentText}
                  className={`timeline-panel__image ${currentItem.imageClassName ?? ''}`}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
