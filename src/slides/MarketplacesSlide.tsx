import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, Reveal, SlideItem, SlideLink } from '../components/SlideElements';
import { T } from '../context/LanguageContext';

// UA: own translation (the UA deck has no marketplaces slide; terms follow dou-days-2026).
// Plugin names and /plugin commands stay English in both languages.

const PLUGINS = [
  'claude-code-setup',
  'claude-md-management',
  'code-simplifier',
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

        {/* how to install, per agent. Codex column verified 05.11.2026 on codex-cli 0.166.0 in a
            throwaway CODEX_HOME: it adds anthropics/claude-plugins-official as a marketplace and
            installs commit-commands, frontend-design, pr-review-toolkit and skill-creator from it.
            The example plugin is frontend-design (Yarik's favourites list, 05.11.2026) */}
        <Reveal show={revealStage >= installStage} className="marketplaces__install">
          <div className="marketplaces__agent">
            <div className="marketplaces__agent-name">Claude Code</div>
            <Code variant="orange">/plugin marketplace add anthropics/claude-plugins-official</Code>
            <Code variant="orange">/plugin install frontend-design@claude-plugins-official</Code>
          </div>
          <div className="marketplaces__agent">
            <div className="marketplaces__agent-name">Codex</div>
            <Code variant="orange">codex plugin marketplace add anthropics/claude-plugins-official</Code>
            <Code variant="orange">codex plugin add frontend-design@claude-plugins-official</Code>
          </div>
        </Reveal>
      </div>
    );
  },
  notes:
    'Marketplaces: third-party skills/commands/subagents ship as plugins; the official one is claude-plugins-official; recommended plugins revealed one at a time; finally the install commands side by side — Claude Code (/plugin marketplace add, /plugin install) and Codex (codex plugin marketplace add, codex plugin add), which reads the same claude-plugins-official marketplace.',
};
