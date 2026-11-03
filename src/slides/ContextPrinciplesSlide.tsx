import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';

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

// UA copy: the UA deck's ContextPrinciplesSlide; rule 2 drops the per-model token
// numbers to match the current EN bullet.
const PRINCIPLES_UK: { color: ColorKey; content: React.ReactNode }[] = [
  {
    color: 'green',
    content: (
      <>
        покладіть в контекст інформацію (<Highlight color="green">слонів</Highlight>), яка максимально допоможе направити модель на <Highlight color="white">правильний шлях</Highlight>
      </>
    ),
  },
  {
    color: 'orange',
    content: (
      <>
        пам'ятайте, що контекст має <Highlight color="orange">обмежений розмір</Highlight>
      </>
    ),
  },
  {
    color: 'cyan',
    content: (
      <>
        якщо контекст переповнюється, клод автоматично проганяє compaction, фактично сумаризуючи існуючий контекст в менший об'єм
      </>
    ),
  },
  {
    color: 'blue',
    content: (
      <>
        старайтеся класти поменше інформації (<Highlight color="blue">слонів</Highlight>), яка <Highlight color="white">зіб'є</Highlight> модель з правильного шляху
      </>
    ),
  },
  {
    color: 'orange',
    content: (
      <>
        <Highlight color="orange">одна задача</Highlight> за <Highlight color="orange">одну сесію</Highlight>
      </>
    ),
  },
];

const PRINCIPLES_EN: { color: ColorKey; content: React.ReactNode }[] = [
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
      <span className="text-dim">&gt;</span> <T uk="принципи роботи з контекстом" en="how to work with context" />
    </>
  ),
  maxRevealStages: PRINCIPLES_EN.length,
  content: ({ revealStage, lang }) => (
    <div className="directives">
      {tr(lang, PRINCIPLES_UK, PRINCIPLES_EN).map((p, i) => (
        <PrincipleDirective key={i} ruleNumber={i + 1} color={p.color} hidden={revealStage < i + 1}>
          {p.content}
        </PrincipleDirective>
      ))}
    </div>
  ),
};
