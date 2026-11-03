import { SlideDefinition } from '../types/slides';

// The four deck accents. (Purple is reserved for syntax highlighting.)
type ColorKey = 'green' | 'orange' | 'cyan' | 'blue';

/** A context "directive": a rule tag (machine voice, code tier) + the rule
 *  itself at body size, on an elevated panel with an accent rail. */
function PrincipleDirective({
  ruleNumber,
  children,
  color,
  hidden,
}: {
  ruleNumber: number;
  children: React.ReactNode;
  color: ColorKey;
  hidden: boolean;
}) {
  return (
    <div
      className={`directive directive--${color} ${hidden ? 'is-unrevealed' : 'reveal-enter'}`}
      aria-hidden={hidden || undefined}
    >
      <span className="directive__tag">[RULE.0{ruleNumber}]</span>
      <div className="directive__body">{children}</div>
    </div>
  );
}

function Highlight({ children, color = 'cyan' }: { children: React.ReactNode; color?: ColorKey | 'white' }) {
  return <span className={`directive-highlight directive--${color}`}>{children}</span>;
}

const PRINCIPLES: { color: ColorKey; content: React.ReactNode }[] = [
  {
    color: 'green',
    content: (
      <>
        put information (<Highlight color="green">elephants</Highlight>) into context that does the most to steer the model down the <Highlight color="white">right path</Highlight>
      </>
    ),
  },
  {
    color: 'orange',
    content: (
      <>
        remember that context has a <Highlight color="orange">limited size</Highlight>
      </>
    ),
  },
  {
    color: 'cyan',
    content: (
      <>
        if context overflows, Claude automatically runs compaction, effectively summarizing the existing context into a smaller footprint
      </>
    ),
  },
  {
    color: 'blue',
    content: (
      <>
        try to put in fewer pieces of information (<Highlight color="blue">elephants</Highlight>) that will <Highlight color="white">knock</Highlight> the model off the right path
      </>
    ),
  },
  {
    color: 'orange',
    content: (
      <>
        <Highlight color="orange">one task</Highlight> per <Highlight color="orange">one session</Highlight>
      </>
    ),
  },
];

export const ContextPrinciplesSlide: SlideDefinition = {
  id: 'context-principles',
  title: (
    <>
      <span className="text-dim">&gt;</span> how to work with context
    </>
  ),
  maxRevealStages: PRINCIPLES.length,
  content: ({ revealStage }) => (
    <div className="directives">
      {PRINCIPLES.map((p, i) => (
        <PrincipleDirective key={i} ruleNumber={i + 1} color={p.color} hidden={revealStage < i + 1}>
          {p.content}
        </PrincipleDirective>
      ))}
    </div>
  ),
};
