import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Level, LevelItem } from '../components/SlideElements';
import yarikBadges from '/yarik-badges.jpg?url';

const BIO_ITEMS: { level: Level; content: ReactNode }[] = [
  { level: 'low',    content: <>started as a Java backend engineer</> },
  { level: 'medium', content: <>then: tech-led product features</> },
  { level: 'medium', content: <>then: tech lead of the platform org</> },
  { level: 'high',   content: <>now: AI-first engineering</> },
];

export const BioSlide: SlideDefinition = {
  id: 'bio',
  title: (
    <>
      <span className="text-dim">&gt;</span> whoami
    </>
  ),
  maxRevealStages: BIO_ITEMS.length - 1,
  content: ({ revealStage }) => (
    <div className="bio-slide">
      <div className="bio-slide-content">
        <p className="bio-subtitle">
          9 years at Superhuman (formerly Grammarly)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BIO_ITEMS.map((item, i) => (
            <LevelItem key={i} level={item.level} hidden={revealStage < i}>
              {item.content}
            </LevelItem>
          ))}
        </div>
      </div>
      <img
        src={yarikBadges}
        alt="Grammarly badges"
        className="bio-slide-image"
        loading="lazy"
      />
    </div>
  ),
};
