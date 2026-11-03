import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';
import llmInfographic from '/llm-theory-infographic.png?url';
// UA render from the UA deck (Ukrainian lettering); prompt in src/prompts/llm-theory-infographic-uk.json
import llmInfographicUk from '/llm-theory-infographic-uk.png?url';

// Full-bleed backdrop: the infographic already sits on the deck background, so `contain`
// fills the slide edge-to-edge without cropping the diagram.
const slideBg = (img: string) => `var(--terminal-bg) url(${img}) center/contain no-repeat`;

export const TheorySlide: SlideDefinition = {
  id: 'theory',
  background: ({ lang }) => slideBg(tr(lang, llmInfographicUk, llmInfographic)),
  title: (
    <>
      {/* UA copy: UA deck TheorySlide heading */}
      <span className="text-dim">&gt;</span> <T uk="тепер трохи теорії" en="a bit of theory" />
    </>
  ),
  content: <></>,
  notes: 'LLM has vast knowledge. Input = context + prompt. Context biases retrieval (our focus), prompt directs action (easy).',
};
