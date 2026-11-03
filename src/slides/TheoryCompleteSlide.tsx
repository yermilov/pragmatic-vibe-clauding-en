import { SlideDefinition } from '../types/slides';
import chalkboardImage from '/theory-complete-chalkboard.png?url';
// UA render from the UA deck (Ukrainian lettering); prompt in src/prompts/theory-complete-chalkboard-uk.json
import chalkboardImageUk from '/theory-complete-chalkboard-uk.png?url';
import { tr } from '../context/LanguageContext';

export const TheoryCompleteSlide: SlideDefinition = {
  id: 'theory-complete',
  // UA alt text and image: the UA deck's TheoryCompleteSlide.
  content: ({ lang }) => (
    <div className="image-slide">
      <img
        src={tr(lang, chalkboardImageUk, chalkboardImage)}
        alt={tr(lang, 'Це вся теорія, переходимо до практики', "That's all the theory, now let's get to practice")}
      />
    </div>
  ),
  notes: 'Transition from theory to practice section.',
};
