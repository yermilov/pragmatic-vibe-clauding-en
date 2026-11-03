import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Level, LevelItem } from '../components/SlideElements';
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

const BULLETS: { level: Level; content: ReactNode }[] = [
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
      <span className="text-dim">&gt;</span> what to type in that terminal?
    </>
  ),
  maxRevealStages: BULLETS.length + 1,
  content: ({ revealStage }) => {
    const showInsight = revealStage >= BULLETS.length + 1;

    // Final reveal: drop all the bullets and show only the punchline + the
    // one screenshot (Slack and Claude Code carrying the same request).
    if (showInsight) {
      return (
        <div className="junior-engineer-final">
          <div className="key-insight junior-engineer-punchline">
            what would you write to a human?
            <KeyInsightArrow />
            <Emphasis color="orange">write it to Claude Code</Emphasis>
          </div>

          <img
            src={chatComparison}
            alt="The same request sent in Slack and in the Claude Code terminal"
            className="junior-engineer-combined"
            loading="lazy"
          />
        </div>
      );
    }

    // Build-up: text only, revealed one bullet at a time.
    return (
      <div className="junior-engineer-text">
        {BULLETS.map((item, i) => (
          <LevelItem key={i} level={item.level} hidden={revealStage < i + 1}>
            {item.content}
          </LevelItem>
        ))}
      </div>
    );
  },
};
