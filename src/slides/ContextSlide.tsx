import { SlideDefinition } from '../types/slides';

// Shares the `directive` panel with the context-principles slide: a memory
// address (machine voice, code tier) + the layer at body size.
type ColorKey = 'orange' | 'green' | 'cyan' | 'blue';

const LAYERS: { label: string; color: ColorKey }[] = [
  { label: 'system prompt and tool descriptions', color: 'orange' },
  { label: 'MCP server descriptions', color: 'cyan' },
  { label: 'contents of the CLAUDE.md file', color: 'green' },
  { label: 'the entire dialogue since the session started', color: 'blue' },
];

export const ContextSlide: SlideDefinition = {
  id: 'context',
  title: (
    <>
      <span className="text-dim">&gt;</span> what's in the context?
    </>
  ),
  maxRevealStages: LAYERS.length,
  content: ({ revealStage }) => (
    <div className="directives directives--narrow">
      {LAYERS.map((layer, i) => {
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
