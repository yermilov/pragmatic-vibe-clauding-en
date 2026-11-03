import { SlideDefinition } from '../types/slides';
import { Code, Quote, revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import claudeMdVsReadme from '/claude-md-vs-readme.png?url';

const CLAUDE_MD_BULLETS: React.ReactNode[] = [
  <>
    <Code>CLAUDE.md</Code> is to Claude Code what{' '}
    <Code>README.md</Code> is to human developers
  </>,
  <>
    Claude re-reads it every time it does something in the repository
  </>,
  <>
    auto-generated via the <Code variant="orange">/init</Code> command
  </>,
  <>
    you can put a <Code>CLAUDE.md</Code> in any subfolder for local
    instructions in monorepos
  </>,
  <>
    commit <Code>CLAUDE.md</Code> to git to share best practices
  </>,
  <>
    you can edit it by hand to fix incorrect conclusions, but it's better not to
  </>,
  <>
    periodically regenerate it via{' '}
    <SlideLink href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management">
      claude-md-management
    </SlideLink>{' '}plugin
  </>,
  <>
    good: if Claude makes systematic mistakes — tell it{' '}
    <Quote>instead do X and remember this information in CLAUDE.md</Quote>
  </>,
  <>
    much better: keep <Code>CLAUDE.md</Code> lean, and cover the following areas — Vision (write manually), Folder Structure (<Code variant="orange">/init</Code>), Build/Deploy Commands (<Code variant="orange">/init</Code>), Architecture (<Code variant="orange">/init</Code>), Principles (feedback after systematic mistakes)
  </>,
];

export const ClaudeMdSlide: SlideDefinition = {
  id: 'claude-md',
  title: (
    <>
      <span className="text-dim">&gt;</span> what goes into CLAUDE.md?
    </>
  ),
  maxRevealStages: CLAUDE_MD_BULLETS.length,
  content: ({ revealStage }) => {
    // sliding window: three bullets beside the visual (the two-column cap);
    // a spoken bullet drops off when the fourth arrives
    const slots = revealWindow(CLAUDE_MD_BULLETS, revealStage, 3);

    return (
      <div className="bg-image-slide">
        <img
          src={claudeMdVsReadme}
          alt="CLAUDE.md vs README.md"
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
  notes: 'How to work with CLAUDE.md files - best practices and configuration options',
};
