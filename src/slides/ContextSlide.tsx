import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';

// Shares the `directive` panel with the context-principles slide: a memory
// address (machine voice, code tier) + the layer at body size.
type ColorKey = 'orange' | 'green' | 'cyan' | 'blue';

// UA copy: the UA deck's ContextSlide.
const LAYERS_UK: { label: string; color: ColorKey }[] = [
  { label: 'системний промпт і опис тулів', color: 'orange' },
  { label: 'скорочений опис доступних MCP серверів і скілів', color: 'cyan' }, // UA: Yarik's wording
  { label: 'зміст AGENTS.md файлу', color: 'green' }, // UA: Yarik's wording
  { label: 'весь діалог з початку сесії', color: 'blue' },
];

const LAYERS_EN: { label: string; color: ColorKey }[] = [
  { label: 'system prompt and tool descriptions', color: 'orange' },
  { label: 'short descriptions of the available MCP servers and skills', color: 'cyan' }, // EN: own translation
  { label: 'contents of the AGENTS.md file', color: 'green' },
  { label: 'the entire dialogue since the session started', color: 'blue' },
];

export const ContextSlide: SlideDefinition = {
  id: 'context',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="що в контексті?" en="what's in the context?" />
    </>
  ),
  maxRevealStages: LAYERS_EN.length,
  content: ({ revealStage, lang }) => (
    <div className="directives directives--narrow">
      {tr(lang, LAYERS_UK, LAYERS_EN).map((layer, i) => {
        const hidden = revealStage < i + 1;
        return (
          <div
            key={i}
            className={`directive directive--${layer.color} ${hidden ? 'is-unrevealed' : 'reveal-enter'}`}
            aria-hidden={hidden || undefined}
          >
            <span className="directive__tag directive__tag--address">[0x0{i + 1}]</span>
            <div className="directive__body">{layer.label}</div>
          </div>
        );
      })}
    </div>
  ),
};
