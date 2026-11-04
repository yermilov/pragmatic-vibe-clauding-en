import { SlideDefinition } from '../types/slides';
import { Code, Quote, revealWindow, SlideItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import claudeMdVsReadme from '/claude-md-vs-readme.png?url';

// UA copy: the UA deck's ClaudeMdSlide, reordered to the EN order; the "but it's
// better not to" and "much better" bullets are newer — UA: own translation.
// Section names in the last bullet stay English (they are AGENTS.md headings);
// the quoted instruction stays English (it is what you type to the agent).
// CLAUDE.md → AGENTS.md and Claude → «агент» / "the agent": Yarik, 2026-11-04.
const CLAUDE_MD_BULLETS_UK: React.ReactNode[] = [
  <>
    <Code>AGENTS.md</Code> для агента — те саме, що{' '}
    <Code>README.md</Code> для людей-розробників
  </>,
  <>
    агент перечитує його кожного разу, коли робить щось в репозиторії
  </>,
  <>
    автоматично генерується через команду <Code variant="orange">/init</Code>
  </>,
  <>
    можна класти <Code>AGENTS.md</Code> в будь-яку підпапку для локальних
    інструкцій в монорепозиторіях
  </>,
  <>
    комітьте <Code>AGENTS.md</Code> в git, щоб ділитися best practices
  </>,
  <>
    можна редагувати вручну, щоб виправити неправильні висновки, але краще не треба
  </>,
  <>
    добре: якщо агент робить систематичні помилки — скажіть йому{' '}
    <Quote>instead do X and remember this information in AGENTS.md</Quote>
  </>,
  <>
    ще краще: тримайте <Code>AGENTS.md</Code> компактним, з розділами Vision (вручну), Folder Structure (<Code variant="orange">/init</Code>), Build/Deploy Commands (<Code variant="orange">/init</Code>), Architecture (<Code variant="orange">/init</Code>), Principles (фідбек на систематичні помилки)
  </>,
];

const CLAUDE_MD_BULLETS_EN: React.ReactNode[] = [
  <>
    <Code>AGENTS.md</Code> is to the agent what{' '}
    <Code>README.md</Code> is to human developers
  </>,
  <>
    the agent re-reads it every time it does something in the repository
  </>,
  <>
    auto-generated via the <Code variant="orange">/init</Code> command
  </>,
  <>
    you can put a <Code>AGENTS.md</Code> in any subfolder for local
    instructions in monorepos
  </>,
  <>
    commit <Code>AGENTS.md</Code> to git to share best practices
  </>,
  <>
    you can edit it by hand to fix incorrect conclusions, but it's better not to
  </>,
  <>
    good: if the agent makes systematic mistakes — tell it{' '}
    <Quote>instead do X and remember this information in AGENTS.md</Quote>
  </>,
  <>
    much better: keep <Code>AGENTS.md</Code> lean, and cover the following areas — Vision (write manually), Folder Structure (<Code variant="orange">/init</Code>), Build/Deploy Commands (<Code variant="orange">/init</Code>), Architecture (<Code variant="orange">/init</Code>), Principles (feedback after systematic mistakes)
  </>,
];

export const ClaudeMdSlide: SlideDefinition = {
  id: 'claude-md',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="що класти в AGENTS.md?" en="what goes into AGENTS.md?" />
    </>
  ),
  maxRevealStages: CLAUDE_MD_BULLETS_EN.length,
  content: ({ revealStage, lang }) => {
    // sliding window: three bullets beside the visual (the two-column cap);
    // a spoken bullet drops off when the fourth arrives
    const slots = revealWindow(tr(lang, CLAUDE_MD_BULLETS_UK, CLAUDE_MD_BULLETS_EN), revealStage, 3);

    return (
      <div className="bg-image-slide">
        <img
          src={claudeMdVsReadme}
          alt="README.md vs CLAUDE.md"
          className="bg-image-slide__background"
        />

        <div className="bg-image-slide__content">
          {slots.map(({ item, index, hidden }) => (
            <SlideItem key={index} delay={0} hidden={hidden}>
              {item}
            </SlideItem>
          ))}
        </div>
      </div>
    );
  },
  notes: 'How to work with AGENTS.md files - best practices and configuration options',
};
