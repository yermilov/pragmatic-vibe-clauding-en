import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

// Contextual aside that fades in below the steps for a specific reveal.
function Hint({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 'var(--space-xl)',
        maxWidth: '820px',
        padding: '0.75rem 1.25rem',
        borderLeft: '3px solid var(--terminal-cyan)',
        background: 'rgba(118, 228, 247, 0.06)',
        borderRadius: '0 8px 8px 0',
        color: 'var(--terminal-white-muted)',
        fontStyle: 'italic',
        fontSize: 'var(--slide-text-compact)',
        lineHeight: 1.5,
        animation: 'slideItemFadeIn 0.4s ease-out',
      }}
    >
      {children}
    </div>
  );
}

export const VibeFlowStepsSlide: SlideDefinition = {
  id: 'vibe-flow-steps',
  // After "build the context" (stage 2) detour into the context-gathering
  // deep-dive; after "/commit-push-pr" (stage 5) detour into marketplaces.
  detours: [
    { atStage: 2, toId: 'context-advice', returnStage: 3 },
    { atStage: 5, toId: 'marketplaces', returnStage: 6 },
  ],
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">vibe</span>{' '}
      <span className="text-orange">flow</span>
    </>
  ),
  content: ({ revealStage }) => (
    <>
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.05}>
          <Command>/clear</Command> clear the context window
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            switch to <Code>plan mode</Code>
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>describe the feature / bug, <span className="text-orange" style={{ textShadow: '0 0 8px rgba(240, 136, 62, 0.9), 0 0 20px rgba(240, 136, 62, 0.6), 0 0 40px rgba(240, 136, 62, 0.3)' }}>build the context</span></SlideItem>
        )}

        {revealStage >= 3 && (
          <SlideItem delay={0}>
            iterate on the plan
          </SlideItem>
        )}

        {revealStage >= 4 && (
          <SlideItem delay={0}>
            approve the plan — Claude Code executes it
          </SlideItem>
        )}

        {revealStage >= 5 && (
          <SlideItem delay={0}>
            <Command>/commit-push-pr</Command>
          </SlideItem>
        )}

        {revealStage >= 6 && (
          <SlideItem delay={0}>
            <Command>/clear</Command>
          </SlideItem>
        )}

        {revealStage >= 7 && (
          <SlideItem delay={0}>
            <Command>/simplify</Command> or <Command>/review</Command>
          </SlideItem>
        )}

        {revealStage === 1 && (
          <Hint>
            what is <Code>plan mode</Code>? a state where Claude Code only{' '}
            "learns" and is forbidden from taking any action — perfect for the{' '}
            <span className="text-green">context-gathering</span> stage
          </Hint>
        )}

        {revealStage === 5 && (
          <Hint>
            what is <Command>/commit-push-pr</Command>? a skill defined in the{' '}
            <span className="text-orange">Anthropic plugin marketplace</span>
          </Hint>
        )}
      </div>
    </>
  ),
  maxRevealStages: 7,
  notes:
    'Workflow: clear the session, plan mode, describe the problem, iterate on the plan, auto-accept, commit',
};
