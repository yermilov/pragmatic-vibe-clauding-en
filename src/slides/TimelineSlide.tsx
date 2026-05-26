import { SlideDefinition } from '../types/slides';

import copilotAutocomplete from '/timeline-copilot-autocomplete.png?url';
import cursorFrontend from '/timeline-cursor-frontend.png?url';
import mentoringLlm from '/timeline-mentoring-llm.png?url';
import aiTechDebt from '/timeline-ai-tech-debt.png?url';

interface TimelineItem {
  anchorDate: Date | null;
  text: string;
  bullets?: string[];
  image: string | null;
  imageClassName?: string;
  emphasis?: boolean;
}

function timeLabel(anchorDate: Date | null): string {
  if (!anchorDate) return 'since then';
  const now = new Date();
  const months =
    (now.getFullYear() - anchorDate.getFullYear()) * 12 +
    (now.getMonth() - anchorDate.getMonth());
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

const timelineItems: TimelineItem[] = [
  { anchorDate: new Date(2024, 9),  text: 'copilot? nice autocomplete', image: copilotAutocomplete },
  { anchorDate: new Date(2024, 10), text: "I don't do frontend, cursor, help me out", image: cursorFrontend },
  { anchorDate: new Date(2025, 2),  text: 'what if this is not just code generation but pair programming?', image: mentoringLlm },
  { anchorDate: new Date(2025, 3),  text: 'but it is still toy tech, right?', image: aiTechDebt, imageClassName: 'timeline-panel__image--zoom-anim' },
  {
    anchorDate: new Date(2025, 4),
    text: 'Claude Code proof of concept with Anthropic',
    bullets: [
      'saw the potential and consciously stopped writing code by hand',
      'found my comfortable AI agentic coding workflow',
      'championed Claude Code at Superhuman',
      'built internal tooling: plugins, skills, agents',
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
      <span className="text-dim">&gt;</span> AI-first timeline
    </>
  ),
  content: ({ revealStage }) => {
    const currentStage = Math.min(revealStage, lastIdx);
    const currentItem = timelineItems[currentStage];
    const visibleBulletCount =
      currentStage === lastIdx
        ? Math.min(lastBulletsCount, Math.max(0, revealStage - lastIdx))
        : currentItem.bullets?.length ?? 0;

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
                      {timeLabel(item.anchorDate)}
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
              {currentItem.bullets ? (
                <>
                  <div className="timeline-panel__text timeline-panel__text--emphasis">
                    {currentItem.text}
                  </div>
                  {visibleBulletCount > 0 && (
                    <ul className="timeline-panel__list">
                      {currentItem.bullets.slice(0, visibleBulletCount).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <div className={`timeline-panel__text ${currentItem.emphasis ? 'timeline-panel__text--emphasis' : ''}`}>
                  {currentItem.text}
                </div>
              )}

              {/* Image if available */}
              {currentItem.image && (
                <img
                  src={currentItem.image}
                  alt={currentItem.text}
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
