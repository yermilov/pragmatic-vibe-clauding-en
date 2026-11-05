import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: the "Yes, and don't ask me again" bullet is from the UA deck LaunchSlide; the
// auto-mode bullet is Yarik's wording (05.11.2026, EN: own translation); UA: own translation
// for the first one.
const BULLETS_UK: ReactNode[] = [
  <>
    звісно, спершу ви захочете перевіряти кожну правку — і це правильно; для цього є гнучка система дозволів
  </>,
  <>
    якщо агент питає, чи можна зробити щось read-only і не дуже небезпечне —
    завжди вибирайте <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    коли станете впевненішими — вмикайте <Code>auto mode</Code>, і агент сам буде визначати безпечні операції
    і турбувати вас тільки для небезпечних
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    of course, at first you'll want to review every edit — and that's the right way; there's a rich permissions system for that
  </>,
  <>
    when the agent asks if it can do something read-only and not too dangerous —
    always pick <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    once you grow more confident — switch to <Code>auto mode</Code>, and the agent will decide for itself which
    operations are safe and only bother you for the dangerous ones
  </>,
];

export const LaunchSlide: SlideDefinition = {
  id: 'launch',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <T uk="навчіться довіряти своїм агентам" en="learn to trust your agents" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  // After "Yes, and don't ask me again" (stage 2): "have some fun", then "so how do I create a
  // skill?", then back for auto mode.
  detours: [
    { atStage: 2, toId: 'warcraft-fun', returnStage: 3 },
    { atStage: 2, toId: 'skill-creation', returnStage: 3 },
  ],
  content: ({ revealStage, lang }) => (
    <div className="launch-slide">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 4).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>
          {item}
        </SlideItem>
      ))}
    </div>
  ),
  notes:
    'Learning to trust the agent: review every edit at first (permissions), allow safe read-only '
    + 'actions for good, then auto mode — the agent judges what is safe and asks only for the dangerous.',
};
