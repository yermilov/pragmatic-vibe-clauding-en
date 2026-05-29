import { SlideDefinition } from '../types/slides';
import { Quote, SlideItem } from '../components/SlideElements';
import dialogueFlow from '/dialogue-flow.png?url';
import dialogueMemory from '/dialogue-memory.png?url';

const DIALOGUE_BULLETS: React.ReactNode[] = [
  <>
    follow the principle <Quote>measure seven times, cut once</Quote>
  </>,
  <>
    steer Claude in the right direction with a step-by-step dialogue
  </>,
  <>
    <Quote>now think about ...</Quote>, <Quote>read this ...</Quote>,{' '}
    <Quote>consider this ...</Quote>
  </>,
  <>
    for LLMs the <Quote>freshest</Quote> <Quote>memories</Quote> are the{' '}
    <Quote>most vivid</Quote> — shape its worldview correctly first, then
    give it the task to solve in the final prompt
  </>,
];

export const DialogueSlide: SlideDefinition = {
  id: 'dialogue',
  title: (
    <>
      <span className="text-dim">&gt;</span> have a dialogue
    </>
  ),
  maxRevealStages: DIALOGUE_BULLETS.length,
  content: ({ revealStage }) => (
    <div className="mcp-slide">
      <img
        src={dialogueFlow}
        alt="Step-by-step dialogue flow"
        className="mcp-slide-image-left"
      />

      <div className="mcp-slide-content">
        {DIALOGUE_BULLETS.map((bullet, i) =>
          revealStage >= i + 1 ? (
            <SlideItem key={i} delay={0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>

      <img
        src={dialogueMemory}
        alt="LLM memory recency"
        className="mcp-slide-image-right"
      />
    </div>
  ),
  notes: 'Dialogue principles for working with LLMs - measure twice, cut once',
};
