import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, Reveal, SlideItem, SlideLink } from '../components/SlideElements';
import { T } from '../context/LanguageContext';

// UA: own translation (the UA deck has no marketplaces slide; terms follow dou-days-2026).
// Plugin names and /plugin commands stay English in both languages.

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
      <span className="text-dim">&gt;</span> <T uk="маркетплейси" en="marketplaces" />
    </>
  ),
  // intro bullets + one stage per plugin + one final stage for install commands
  maxRevealStages: INTRO_STAGES - 1 + PLUGINS.length + 1,
  content: ({ revealStage }) => {
    const installStage = INTRO_STAGES + PLUGINS.length;
    return (
      <div className="marketplaces">
        <SlideItem delay={0.05}>
          <T
            uk={<>сторонні <Emphasis color="green">скіли / команди / сабагенти</Emphasis>{' '}
              поширюються через <Emphasis color="orange">плагіни</Emphasis> у
              маркетплейсах</>}
            en={<>third-party <Emphasis color="green">skills / commands / subagents</Emphasis>{' '}
              are distributed via <Emphasis color="orange">plugins</Emphasis> on
              marketplaces</>}
          />
        </SlideItem>

        <SlideItem delay={0} hidden={revealStage < 1}>
          <T
            uk="найважливіший — офіційний маркетплейс від Anthropic"
            en="the most important one is the official marketplace from Anthropic"
          />{' '}—{' '}
          <SlideLink href="https://github.com/anthropics/claude-plugins-official">
            claude-plugins-official
          </SlideLink>
        </SlideItem>

        <SlideItem delay={0} hidden={revealStage < 2}>
          <T
            uk="пошукайте плагіни для вашої роботи — кілька моїх фаворитів:"
            en="explore plugins relevant to your work — some picks from me:"
          />
        </SlideItem>

        {/* one plugin per reveal; every chip has its place from stage 0 */}
        <div className="marketplaces__chips">
          {PLUGINS.map((p, i) => (
            <Reveal key={i} as="span" show={revealStage >= INTRO_STAGES + i}>
              <Code>{p}</Code>
            </Reveal>
          ))}
        </div>

        <Reveal show={revealStage >= installStage} className="marketplaces__install">
          <Code variant="orange">/plugin marketplace add anthropics/claude-code</Code>
          <Code variant="orange">/plugin install commit-commands@claude-plugins-official</Code>
        </Reveal>
      </div>
    );
  },
  notes:
    'Marketplaces: third-party skills/commands/subagents ship as plugins; the official one is claude-plugins-official; recommended plugins revealed one at a time; finally the install commands — /plugin marketplace add and /plugin install.',
};
