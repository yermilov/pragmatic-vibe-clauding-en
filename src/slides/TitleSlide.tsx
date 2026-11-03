import { SlideDefinition } from '../types/slides';
import { T } from '../context/LanguageContext';

// UA copy: title from the UA deck TitleSlide; subtitle as in dou-days-2026 TitleSlide.

export const TitleSlide: SlideDefinition = {
  id: 'title',
  content: (
    <div className="title-slide">
      <h1 className="hero title-glow"><T uk="Прагматичний вайб клодінг" en="Pragmatic Vibe Clauding" /></h1>
      <p className="title-subtitle"><T uk="Ярослав Єрмілов" en="Yaroslav Yermilov" />, Principal Software Engineer @ Superhuman (formerly Grammarly)</p>
    </div>
  ),
};
