import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import aiFirstRoleBg from '/ai-first-role.png?url';

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

const BULLETS: ReactNode[] = [
  <>
    think of yourself more as a{' '}
    <Emphasis color="orange">product owner</Emphasis>,{' '}
    <Emphasis color="orange">tech lead</Emphasis>,{' '}
    <Emphasis color="orange">architect</Emphasis>
  </>,
  <>
    instead of hiring engineers onto your team, you're hiring{' '}
    <Emphasis color="green">Claude Code</Emphasis>
  </>,
  <>
    set things up so Claude Code is as comfortable as possible working on the
    tasks you hand it — and so you're as comfortable as possible handing those
    tasks out and keeping an eye on how they get done
  </>,
];

export const AIFirstRoleSlide: SlideDefinition = {
  id: 'ai-first-role',
  title: (
    <>
      <span className="text-dim">&gt;</span> your AI-first role
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    <div className="bg-image-slide">
      <img
        src={aiFirstRoleBg}
        alt="AI-First mindset transformation"
        className="bg-image-slide__background"
      />

      <div className="bg-image-slide__content">
        <AnimatedSectionHeader color="green" delay={0.03}>
          your role
        </AnimatedSectionHeader>

        {BULLETS.map((bullet, i) =>
          revealStage >= i + 1 ? (
            <SlideItem key={i} delay={0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    </div>
  ),
  notes:
    'AI-First Engineering mindset - think of yourself as product owner/tech lead/architect, hire Claude Code instead of engineers, create comfortable conditions for Claude to work',
};
