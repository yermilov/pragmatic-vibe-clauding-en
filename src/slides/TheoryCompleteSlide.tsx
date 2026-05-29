import { SlideDefinition } from '../types/slides';
import chalkboardImage from '/theory-complete-chalkboard.png?url';

export const TheoryCompleteSlide: SlideDefinition = {
  id: 'theory-complete',
  content: (
    <div className="image-slide">
      <img src={chalkboardImage} alt="That's all the theory, now let's get to practice" />
    </div>
  ),
  notes: 'Transition from theory to practice section.',
};
