import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import aiFirstToolsBg from '/ai-first-tools.png?url';

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

export const AIFirstToolsSlide: SlideDefinition = {
  id: 'ai-first-tools',
  title: (
    <>
      <span className="text-dim">&gt;</span> think 10x
    </>
  ),
  // reveal stages: opening bullet, the 4 questions (as a group), closing bullet
  maxRevealStages: 3,
  content: ({ revealStage }) => (
    <div className="bg-image-slide">
      <img
        src={aiFirstToolsBg}
        alt="AI-First 10x thinking"
        className="bg-image-slide__background"
      />

      <div className="bg-image-slide__content">
        <AnimatedSectionHeader color="purple" delay={0.03}>
          think about this
        </AnimatedSectionHeader>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            if you produce 10x more code — will the rest of your processes keep
            up? <Emphasis color="orange">if not, you got nothing out of AI</Emphasis>
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <>
            <SlideItem delay={0} size="compact">
              can you come up with 10x more features?
            </SlideItem>
            <SlideItem delay={0.03} size="compact">
              can you make 10x more decisions?
            </SlideItem>
            <SlideItem delay={0.06} size="compact">
              can you run 10x more experiments?
            </SlideItem>
            <SlideItem delay={0.09} size="compact">
              can you review 10x more code?
            </SlideItem>
          </>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            think about what's worth spending more of your own time on, and{' '}
            <Emphasis color="green">which tasks you can send off to AI</Emphasis>
          </SlideItem>
        )}
      </div>
    </div>
  ),
  notes:
    'Think about 10x: if you generate 10x more code, will other processes keep up? Can you ideate 10x more features, make 10x more decisions, run 10x more experiments, review 10x more code? Think about what to spend your time on vs delegate to AI.',
};
