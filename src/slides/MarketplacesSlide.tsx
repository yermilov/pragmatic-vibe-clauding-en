import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem, SlideLink } from '../components/SlideElements';

// Command styling (orange code)
function Command({ children }: { children: string }) {
  return <code className="code-inline code-inline--orange">{children}</code>;
}

const PLUGINS = [
  'claude-code-setup',
  'claude-md-management',
  'code-simplifier',
  'commit-commands',
  'frontend-design',
  'pr-review-toolkit',
  'skill-creator',
];

const INTRO_STAGES = 3; // bullets at reveal stages 0, 1, 2

export const MarketplacesSlide: SlideDefinition = {
  id: 'marketplaces',
  title: (
    <>
      <span className="text-dim">&gt;</span> marketplaces
    </>
  ),
  // intro bullets + one stage per plugin + one final stage for install commands
  maxRevealStages: INTRO_STAGES - 1 + PLUGINS.length + 1,
  content: ({ revealStage }) => {
    const installStage = INTRO_STAGES + PLUGINS.length;
    return (
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1320px',
          width: '100%',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        <style>{`
          .marketplace-body .code-inline { font-size: var(--slide-text-normal); }
        `}</style>

        <div className="marketplace-body">
          <SlideItem delay={0.05}>
            third-party <Emphasis color="green">skills / commands / subagents</Emphasis>{' '}
            are distributed via <Emphasis color="orange">plugins</Emphasis> on
            marketplaces
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              the most important one is the official marketplace from Anthropic —{' '}
              <SlideLink href="https://github.com/anthropics/claude-plugins-official">
                claude-plugins-official
              </SlideLink>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              explore plugins relevant to your work — some picks from me:
            </SlideItem>
          )}

          {revealStage >= INTRO_STAGES && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem 0.9rem',
                marginTop: 'var(--space-sm)',
                marginLeft: '2.5rem',
              }}
            >
              {PLUGINS.map((p, i) =>
                revealStage >= INTRO_STAGES + i ? <Code key={i}>{p}</Code> : null,
              )}
            </div>
          )}

          {revealStage >= installStage && (
            <div
              style={{
                marginTop: 'var(--space-md)',
                marginLeft: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <Command>/plugin marketplace add anthropics/claude-code</Command>
              <Command>/plugin install commit-commands@claude-plugins-official</Command>
            </div>
          )}
        </div>
      </div>
    );
  },
  notes:
    'Marketplaces: third-party skills/commands/subagents ship as plugins; the official one is claude-plugins-official; recommended plugins revealed one at a time; finally the install commands — /plugin marketplace add and /plugin install.',
};
