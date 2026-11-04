import { SlideDefinition } from '../types/slides';
import { revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import card1 from '../assets/bad-week/card-1.jpg';
import card2 from '../assets/bad-week/card-2.jpg';
import card3 from '../assets/bad-week/card-3.jpg';
import card4 from '../assets/bad-week/card-4.jpg';

// UA: Yarik's wording (Cyrillic «АІ» → Latin AI, punctuation); EN: own translation.
// Stage 0 is the alert-app screenshot, cut into its four cards and scattered across the slide
// (positions in slide-layouts.css, `.bad-week__card--N`); the first reveal blurs them and the
// bullets land over them.

const CARDS = [
  { src: card1, uk: 'Радіаційна небезпека', en: 'Radiation danger' },
  { src: card2, uk: 'Хімічна загроза', en: 'Chemical threat' },
  { src: card3, uk: 'Вуличні бої', en: 'Street fighting' },
  { src: card4, uk: 'фейкова ядерна тривога з посиланням на Telegram-канал', en: 'fake nuclear alert linking a Telegram channel' },
];

const BULLETS_UK = [
  <>якщо серйозно, то AI — це ваш інструмент, тому від вас залежить, чи використовувати його розумно, чи ліниво</>,
  <>а помилки, які роблять агенти, можуть зробити люди, тому бійтесь не агентів, а дірок у ваших процесах</>,
];

const BULLETS_EN = [
  <>seriously though: AI is your tool, so it is up to you whether you use it wisely or lazily</>,
  <>and the mistakes agents make, people can make too — so fear the holes in your processes, not the agents</>,
];

export const BadWeekSlide: SlideDefinition = {
  id: 'bad-week',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <T uk="не найкращий тиждень пропагувати вайбкодинг" en="not the best week to preach vibe coding" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    <div className={`bad-week ${revealStage >= 1 ? 'bad-week--blurred' : ''}`}>
      <div className="bad-week__cards">
        {CARDS.map((card, i) => (
          <img
            key={card.src}
            className={`bad-week__card bad-week__card--${i + 1}`}
            src={card.src}
            alt={tr(lang, card.uk, card.en)}
          />
        ))}
      </div>
      <div className="bad-week__bullets" aria-hidden={revealStage < 1 || undefined}>
        {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage).map(({ item, index, hidden }) => (
          <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
        ))}
      </div>
    </div>
  ),
  notes: 'Alert-app cards first, let them land; then the two serious points over the blurred image.',
};
