import { SlideDefinition } from '../types/slides';
import { Quote, revealWindow, SlideItem } from '../components/SlideElements';
import { tr } from '../context/LanguageContext';
import dialogueFlow from '/dialogue-flow.png?url';
import dialogueMemory from '/dialogue-memory.png?url';

// UA copy: the UA deck's DialogueSlide (it translated the example phrases too).
const DIALOGUE_BULLETS_UK: React.ReactNode[] = [
  <>
    використовуйте принцип <Quote>сім раз відмір — один раз відріж</Quote>
  </>,
  <>
    за допомогою покрокового діалогу направляйте агента у правильний напрямок
  </>,
  <>
    <Quote>а подумай про ...</Quote>, <Quote>почитай тут ...</Quote>,{' '}
    <Quote>розглянь це ...</Quote>
  </>,
  <>
    для ллм-ок <Quote>найсвіжіші</Quote> <Quote>спогади</Quote>{' '}
    <Quote>найяскравіші</Quote> — сформуйте їй правильне світосприйняття і
    тоді дайте задачу на вирішення останнім промптом
  </>,
];

const DIALOGUE_BULLETS_EN: React.ReactNode[] = [
  <>
    follow the principle <Quote>measure twice, cut once</Quote>
  </>,
  <>
    steer the agent in the right direction with a step-by-step dialogue
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
  maxRevealStages: DIALOGUE_BULLETS_EN.length,
  content: ({ revealStage, lang }) => (
    // sliding window: three bullets beside the visuals (the two-column cap)
    <div className="mcp-slide">
      <img
        src={dialogueFlow}
        alt="Step-by-step dialogue flow"
        className="mcp-slide-image-left"
      />

      <div className="mcp-slide-content">
        {revealWindow(tr(lang, DIALOGUE_BULLETS_UK, DIALOGUE_BULLETS_EN), revealStage, 3).map(({ item, index, hidden }) => (
          <SlideItem key={index} delay={0} hidden={hidden}>
            {item}
          </SlideItem>
        ))}
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
