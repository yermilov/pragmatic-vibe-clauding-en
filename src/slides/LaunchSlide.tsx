import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: the "Yes, and don't ask me again" bullet is from the UA deck LaunchSlide;
// UA: own translation for the rest (the EN slide was rewritten since).
const BULLETS_UK: ReactNode[] = [
  <>
    звісно, спершу ви захочете перевіряти кожну правку Claude Code — і це правильно; у нього є гнучка система дозволів
  </>,
  <>
    якщо Claude Code питає, чи можна зробити щось read-only і не дуже небезпечне —
    завжди вибирайте <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    коли станете впевненішими — після перегляду плану тисніть <Code>Approve plan and auto-accept everything</Code>
  </>,
  <>
    коли довіряєте Claude Code повністю — вмикайте <Code>auto mode</Code>, і він виконає план без питань
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    of course, at first you'll want to review every edit Claude Code makes — and that's the right way; it has a rich permissions system to help you
  </>,
  <>
    when Claude Code asks if it can do something read-only and not too dangerous —
    always pick <Code>Yes, and don't ask me again</Code>
  </>,
  <>
    once you grow more confident, start clicking <Code>Approve plan and auto-accept everything</Code> after reviewing the plan
  </>,
  <>
    once you trust Claude Code completely — switch to <Code>auto mode</Code> and let it execute the plan without asking
  </>,
];

export const LaunchSlide: SlideDefinition = {
  id: 'launch',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <T uk="навчіться довіряти Claude Code" en="learn to trust Claude Code" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
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
    'Claude Code launch checklist - model selection, plugins, and permissions',
};
