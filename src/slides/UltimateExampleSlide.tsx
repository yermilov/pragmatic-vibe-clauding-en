import { SlideDefinition } from '../types/slides';
import coworkImage from '../assets/cowork-reimbursements.png?url';

export const UltimateExampleSlide: SlideDefinition = {
  id: 'ultimate-example',
  title: (
    <>
      <span className="text-dim">&gt;</span> taking it to the absurd
    </>
  ),
  content: (
    <div className="image-slide">
      <img src={coworkImage} alt="Claude ordering team catering through the Chrome extension" loading="lazy" />
    </div>
  ),
  notes:
    'Ultimate non-coding example: Claude driving the Chrome extension to order team catering (heycater) and reasoning about menu choices — pushing "do everything with Claude Code" to its logical extreme.',
};
