import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem, SlideLink } from '../components/SlideElements';
import claudeMdVsReadme from '/claude-md-vs-readme.png?url';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const CLAUDE_MD_BULLETS: React.ReactNode[] = [
  <>
    <Code>CLAUDE.md</Code> is to Claude Code what{' '}
    <Code>README.md</Code> is to human developers
  </>,
  <>
    Claude re-reads it every time it does something in the repository
  </>,
  <>
    auto-generated via the <Command>/init</Command> command
  </>,
  <>
    you can put a <Code>CLAUDE.md</Code> in any subfolder for local
    instructions in monorepos
  </>,
  <>
    commit <Code>CLAUDE.md</Code> to git to share best practices
  </>,
  <>
    you can edit it by hand to fix incorrect conclusions, but better don't do it
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
    much better: keep CLAUDE.md trim and lean, areas to cover: Vision, Folder Structure, Build/Deploy Commands, Architecture, Principles
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
    // rolling window: overflow slide
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW);

    return (
      <div className="bg-image-slide">
        <img
          src={claudeMdVsReadme}
          alt="CLAUDE.md vs README.md"
          className="bg-image-slide__background"
        />

        <div className="bg-image-slide__content">
          {CLAUDE_MD_BULLETS.map((bullet, i) =>
            revealStage >= i + 1 && i >= firstVisible ? (
              <SlideItem key={i} delay={0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}
        </div>
      </div>
    );
  },
  notes: 'How to work with CLAUDE.md files - best practices and configuration options',
};
