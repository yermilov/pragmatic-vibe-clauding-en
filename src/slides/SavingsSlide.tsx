import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';
import budgetPricingTiers from '/budget-pricing-tiers.png?url';
import budgetWorkflowStrategy from '/budget-workflow-strategy.png?url';

// Price styling (green) - money highlight
function Price({ children }: { children: string }) {
  return (
    <span className="text-emphasis text-emphasis--green">
      {children}
    </span>
  );
}

// Dimmed parenthetical text
function Dim({ children }: { children: string }) {
  return (
    <span style={{ color: 'var(--terminal-white-muted)', fontSize: '0.9em' }}>
      ({children})
    </span>
  );
}

// Section header for this slide
function SectionHeader({
  children,
  color,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
}) {
  return (
    <div className={`section-header section-header--${color}`}>
      {'// '}
      {children}
    </div>
  );
}

type RevealItem =
  | { kind: 'header'; color: 'green' | 'purple' | 'blue'; content: string }
  | { kind: 'bullet'; content: ReactNode };

const ITEMS: RevealItem[] = [
  { kind: 'header', color: 'green', content: 'pricing tiers' },
  {
    kind: 'bullet',
    content: (
      <>
        Anthropic gives you a chunk of tokens every 5 hours — and cuts you off the
        moment you burn through them
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        from my experience: <Price>$17</Price> gets you 1-1.5 hours,{' '}
        <Price>$100</Price> gets you 3-4 hours, <Price>$200</Price> gets you the full
        5 hours
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        <Price>$100</Price> is the sweet spot; if you're rich — go for{' '}
        <Price>$200</Price>
      </>
    ),
  },
  { kind: 'header', color: 'purple', content: 'if you are not rich' },
  {
    kind: 'bullet',
    content: (
      <>
        grab the <Price>$20</Price> ChatGPT subscription and install{' '}
        <Code>codex cli</Code>
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        <Code>codex</Code> is a Claude Code clone: bad in long sessions, but great at
        one-shotting
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        the strategy: one-shot in <Code>codex</Code> → then into{' '}
        <Code>claude code</Code>
      </>
    ),
  },
  { kind: 'header', color: 'blue', content: 'even cheaper options' },
  {
    kind: 'bullet',
    content: (
      <>
        <Dim>tested</Dim> the <Code>Cursor</Code> trial — the IDE or{' '}
        <Code>cursor-cli</Code>
      </>
    ),
  },
  {
    kind: 'bullet',
    content: (
      <>
        <Dim>untested</Dim>{' '}
        <SlideLink href="https://ampcode.com/free">ampcode.com/free</SlideLink> — a
        free clone
      </>
    ),
  },
];

export const SavingsSlide: SlideDefinition = {
  id: 'savings',
  title: (
    <>
      <span className="text-dim">&gt;</span> save on tokens
    </>
  ),
  maxRevealStages: ITEMS.length,
  // rolling window: overflow slide
  content: ({ revealStage }) => {
    const WINDOW = 3;
    const firstVisible = Math.max(0, revealStage - WINDOW);
    return (
      <div className="mcp-slide">
        <img
          src={budgetPricingTiers}
          alt="Pricing tiers visualization"
          className="mcp-slide-image-left"
        />

        <div className="mcp-slide-content">
          {ITEMS.map((item, i) =>
            revealStage >= i + 1 && i >= firstVisible ? (
              item.kind === 'header' ? (
                <SectionHeader key={i} color={item.color}>
                  {item.content}
                </SectionHeader>
              ) : (
                <SlideItem key={i} delay={0}>
                  {item.content}
                </SlideItem>
              )
            ) : null,
          )}
        </div>

        <img
          src={budgetWorkflowStrategy}
          alt="Budget workflow strategy"
          className="mcp-slide-image-right"
        />
      </div>
    );
  },
  notes:
    'Budget optimization - pricing tiers ($17/1-1.5h, $100/3.5-4h sweet spot, $200/5h full), Codex CLI alternative with one-shot strategy, Cursor trial, Ampcode free option',
};
