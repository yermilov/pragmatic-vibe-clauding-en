import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem, SlideLink } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import statusline from '../assets/statusline.png?url';

// UA: own translation (no status-line slide in the UA deck).
const BULLETS_UK: ReactNode[] = [
  <>
    встановіть{' '}
    <SlideLink href="https://github.com/sirmalloc/ccstatusline">
      ccstatusline
    </SlideLink>
  </>,
  <>поточна <Emphasis color="green">модель</Emphasis></>,
  <><Emphasis color="green">розмір контексту</Emphasis></>,
  <>витрачені <Emphasis color="orange">ліміти / гроші</Emphasis></>,
  <>поточна <Emphasis color="green">директорія</Emphasis></>,
  <>поточна <Emphasis color="green">гілка / назва PR</Emphasis></>,
  <><Emphasis color="green">підсумок</Emphasis> сесії</>,
];

const BULLETS_EN: ReactNode[] = [
  <>
    install{' '}
    <SlideLink href="https://github.com/sirmalloc/ccstatusline">
      ccstatusline
    </SlideLink>
  </>,
  <>current <Emphasis color="green">model</Emphasis></>,
  <><Emphasis color="green">context size</Emphasis></>,
  <>spent <Emphasis color="orange">limits / money</Emphasis></>,
  <>current <Emphasis color="green">directory</Emphasis></>,
  <>current <Emphasis color="green">branch / PR name</Emphasis></>,
  <><Emphasis color="green">summary</Emphasis> of the session</>,
];

export const InstallStatusLineSlide: SlideDefinition = {
  id: 'install-status-line',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <T uk="спершу встановіть status line" en="first, install a status line" />
    </>
  ),
  maxRevealStages: BULLETS_EN.length - 1,
  content: ({ revealStage, lang }) => (
    <div className="statusline-slide">
      <div>
        {tr(lang, BULLETS_UK, BULLETS_EN).map((b, i) => (
          <SlideItem key={i} delay={i === 0 ? 0.05 : 0} hidden={revealStage < i}>
            {b}
          </SlideItem>
        ))}
      </div>

      <img
        src={statusline}
        alt={tr(
          lang,
          'Status line Claude Code: модель, розмір контексту, витрати, директорія, гілка, підсумок сесії',
          'Claude Code status line: model, context size, spend, directory, branch, session summary',
        )}
        className="statusline-slide__shot"
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Install ccstatusline. Surface in the status line: current model, context size, spend (limits / money), current directory, current branch / PR name, and a session summary. Below: a real screenshot of the status line.',
};
