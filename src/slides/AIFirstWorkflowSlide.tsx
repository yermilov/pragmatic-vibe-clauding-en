import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, Emphasis } from '../components/SlideElements';
import aiFirstWorkflowBg from '/ai-first-workflow.png?url';

// Section header with animation
function AnimatedSectionHeader({
  children,
  color,
  delay,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
  delay: number;
}) {
  return (
    <div
      className={`section-header section-header--${color}`}
      style={{
        opacity: 0,
        animation: 'slideItemFadeIn 0.35s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      {'// '}
      {children}
    </div>
  );
}

// Tool tag styling
function Tool({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-cyan)',
        backgroundColor: 'rgba(118, 228, 247, 0.1)',
        padding: '0.1em 0.4em',
        borderRadius: '4px',
        fontSize: '0.9em',
      }}
    >
      {children}
    </span>
  );
}

// Bullets under the "how to work" section header
const HOW_BULLETS = [
  <>
    use <Emphasis color="green">GitHub issues</Emphasis> to define tasks instead
    of prompts — just write{' '}
    <Code variant="orange">please work on github issue #...</Code> (and yes, make
    a skill for it)
  </>,
  <>
    keep all the documentation that changes over time in a dedicated folder
    inside your monorepo (and yes, make a skill for it)
  </>,
  <>keep the more fundamental, unchanging knowledge in skills</>,
  <>
    spell out your most fundamental working principles — basically your contract
    with Claude — in <Code>CLAUDE.md</Code>
  </>,
];

export const AIFirstWorkflowSlide: SlideDefinition = {
  id: 'ai-first-workflow',
  title: (
    <>
      <span className="text-dim">&gt;</span> AI-first workflow
    </>
  ),
  // reveal stages: 4 "how to work" bullets + 1 "tools" bullet + tool tags
  maxRevealStages: HOW_BULLETS.length + 2,
  content: ({ revealStage }) => {
    // rolling window: overflow slide
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    const showHow = (i: number) => revealStage >= i + 1 && i >= firstVisible;

    const toolsBulletIndex = HOW_BULLETS.length; // stage HOW_BULLETS.length + 1
    const toolTagsIndex = HOW_BULLETS.length + 1; // stage HOW_BULLETS.length + 2
    const showToolsBullet =
      revealStage >= toolsBulletIndex + 1 && toolsBulletIndex >= firstVisible;
    const showToolTags =
      revealStage >= toolTagsIndex + 1 && toolTagsIndex >= firstVisible;

    return (
      <div className="bg-image-slide">
        <img
          src={aiFirstWorkflowBg}
          alt="AI-First workflow and tools"
          className="bg-image-slide__background"
        />

        <div className="bg-image-slide__content">
          <AnimatedSectionHeader color="purple" delay={0.03}>
            how to work
          </AnimatedSectionHeader>

          {HOW_BULLETS.map((bullet, i) =>
            showHow(i) ? (
              <SlideItem key={i} delay={0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}

          <AnimatedSectionHeader color="blue" delay={0}>
            tools
          </AnimatedSectionHeader>

          {showToolsBullet && (
            <SlideItem delay={0}>
              give Claude access to every tool you can, describing in skills how
              to work with them:
            </SlideItem>
          )}

          {showToolTags && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginLeft: '2rem',
                marginBottom: '1.5rem',
                opacity: 0,
                animation: 'slideItemFadeIn 0.35s ease-out forwards',
                animationDelay: '0s',
              }}
            >
              <Tool>chatgpt</Tool>
              <Tool>codex</Tool>
              <Tool>logs</Tool>
              <Tool>metrics</Tool>
              <Tool>nano banana</Tool>
              <Tool>figma</Tool>
              <Tool>deep research</Tool>
              <Tool>bug reports</Tool>
              <Tool>cost tracking</Tool>
              <Tool>...</Tool>
            </div>
          )}
        </div>
      </div>
    );
  },
  notes:
    'AI-First workflow: use GitHub issues for tasks, store docs in monorepo folders, fundamental knowledge in skills, core principles in CLAUDE.md. Give Claude access to all tools via skills.',
};
