import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';
import coworkImage from '../assets/cowork-reimbursements.png?url';

// UA: own translation (slide is not in the UA deck). The screenshot itself is English.
export const UltimateExampleSlide: SlideDefinition = {
  id: 'ultimate-example',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="доводимо до абсурду" en="taking it to the absurd" />
    </>
  ),
  content: ({ lang }) => (
    <div className="image-slide">
      <img
        src={coworkImage}
        alt={tr(
          lang,
          'Claude замовляє кейтеринг для команди через Chrome extension',
          'Claude ordering team catering through the Chrome extension',
        )}
        loading="lazy"
      />
    </div>
  ),
  notes:
    'Ultimate non-coding example: Claude driving the Chrome extension to order team catering (heycater) and reasoning about menu choices — pushing "do everything with Claude Code" to its logical extreme.',
};
