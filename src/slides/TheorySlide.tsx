import { SlideDefinition } from '../types/slides';
import llmInfographic from '/llm-theory-infographic.png?url';

// Full-bleed backdrop: the infographic already sits on the deck background, so `contain`
// fills the slide edge-to-edge without cropping the diagram.
const SLIDE_BG = `var(--terminal-bg) url(${llmInfographic}) center/contain no-repeat`;

export const TheorySlide: SlideDefinition = {
  id: 'theory',
  background: SLIDE_BG,
  title: (
    <>
      <span className="text-dim">&gt;</span> a bit of theory
    </>
  ),
  content: <></>,
  notes: 'LLM has vast knowledge. Input = context + prompt. Context biases retrieval (our focus), prompt directs action (easy).',
};
