import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, Quote, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: bullets 1–2 from pragmatic-vibe-clauding-ua SkillsAuthoringSlide (skills-authorship
// prompt replaced by skill-creator, as in EN); bullets 3–5 from dou-days-2026
// SkillMarketplaceSlide; bullet 6 — UA: own translation.
const BULLETS_UK: ReactNode[] = [
  <>
    якщо ви бачите, що інструктуєте клод робити одне і те саме раз за разом
    (пошук в логах, дебагінг проблем, перформенс оптимізації, генерація картинок,
    написання документації, ...) — навчіть його цьому <Emphasis color="green">скілу</Emphasis>
  </>,
  <>
    просто напишіть{' '}
    <Quote>use skill-creator skill to turn ... into a skill</Quote>{' '}
    або{' '}
    <Quote>use skill-creator skill to update ... skill to ...</Quote>
  </>,
  <>
    скіли — <Emphasis color="green">будівельні блоки</Emphasis>, з яких кожен інженер
    (або агент) може зібрати свій власний воркфлоу
  </>,
  <>
    люди не люблять читати і писати документацію, а{' '}
    <Emphasis color="orange">агенти це обожнюють</Emphasis> — конвертуйте всю
    документацію в скіли
  </>,
  <>
    кожен інженер, який використовує скіл із внутрішнього{' '}
    <Emphasis color="green">маркетплейсу</Emphasis>, додає покращення — і всі
    стають продуктивнішими
  </>,
  <>
    вам лише потрібна правильна інфраструктура, щоб зробити скіли своїм фундаментом
  </>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    if you catch yourself instructing Claude to do the same thing over and over
    (searching logs, debugging issues, optimizing performance, generating images,
    writing documentation, ...) — teach it that <Emphasis color="green">skill</Emphasis>
  </>,
  <>
    just write{' '}
    <Quote>use skill-creator skill to turn ... into a skill</Quote>{' '}
    or{' '}
    <Quote>use skill-creator skill to update ... skill to ...</Quote>
  </>,
  <>
    skills are <Emphasis color="green">building blocks</Emphasis> each engineer
    (or agent) can assemble into their own workflow
  </>,
  <>
    people hate reading and writing documentation, but{' '}
    <Emphasis color="orange">agents love it</Emphasis> — so convert all your docs
    into skills
  </>,
  <>
    every engineer who uses a skill from the internal{' '}
    <Emphasis color="green">marketplace</Emphasis> adds improvements — and
    everyone gets more productive
  </>,
  <>
    you just need the right infrastructure to make skills your foundation
  </>,
];

export const SkillsAuthoringSlide: SlideDefinition = {
  id: 'skills-authoring',
  title: (
    <>
      {/* UA: own translation */}
      <span className="text-dim">&gt;</span>{' '}
      <T uk="про що поговоримо наступного разу?" en="what we will talk about next time?" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    // sliding window of four: the newest bullet always fits
    <div className="code-slop">
      {revealWindow(tr(lang, BULLETS_UK, BULLETS_EN), revealStage, 4).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
      ))}
    </div>
  ),
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start a new session, read docs, create skill. Or create a meta-skill for skill authoring itself. Examples: searching logs, debugging, perf, image gen, docs.',
};
