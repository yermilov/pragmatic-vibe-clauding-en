import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Level, LevelItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import yarikBadges from '/yarik-badges.jpg?url';

// UA copy: dou-days-2026 BioSlide (same four bullets).
const BIO_ITEMS_UK: { level: Level; content: ReactNode }[] = [
  { level: 'low',    content: <>починав як Java backend-інженер</> },
  { level: 'medium', content: <>потім: техлідив продуктові фічі</> },
  { level: 'medium', content: <>потім: техлід платформної організації</> },
  { level: 'high',   content: <>зараз: AI-first розробка</> },
];

const BIO_ITEMS_EN: { level: Level; content: ReactNode }[] = [
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
  maxRevealStages: BIO_ITEMS_EN.length - 1,
  content: ({ revealStage, lang }) => (
    <div className="bio-slide">
      <div className="bio-slide-content">
        <p className="bio-subtitle">
          <T uk="9 років у компанії Superhuman (раніше відомої як Grammarly)" en="9 years at Superhuman (formerly Grammarly)" />
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {tr(lang, BIO_ITEMS_UK, BIO_ITEMS_EN).map((item, i) => (
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
