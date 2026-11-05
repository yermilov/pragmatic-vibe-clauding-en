import { SlideDefinition } from '../types/slides';
import { Reveal } from '../components/SlideElements';
import { WhoamiMe } from '../components/WhoamiMe';
import { T } from '../context/LanguageContext';
import grammarlyMark from '../assets/about/grammarly-mark.svg';

// Ported from loops-skills-artifacts-factory-en (WAWTech 2026) AboutMeSlide: the same three beats
// and copy, redrawn in this deck's terminal style. The Preply mark is painted through a CSS mask
// (`.whoami__mark--preply`) so it takes a theme token; the Grammarly mark keeps its brand colours.
// The photo and LinkedIn QR are always on screen; only the two cards reveal.
// UA: own translation.

export const BioSlide: SlideDefinition = {
  id: 'bio',
  title: (
    <>
      <span className="text-dim">&gt;</span> whoami
    </>
  ),
  maxRevealStages: 2,
  content: ({ revealStage }) => (
    <div className="whoami">
      <div className="whoami__col">
        <Reveal show={revealStage >= 1} className="whoami__card whoami__card--now">
          <span className="whoami__mark whoami__mark--preply" role="img" aria-label="Preply" />
          <div className="whoami__role">
            <T uk="Principal Engineer у Preply" en="Principal Engineer at Preply" />
          </div>
          <div className="whoami__line">
            <T
              uk="займаюся AI/Agentic трансформацією процесів розробки у компанії"
              en="Leading the AI / agentic transformation of the software development lifecycle"
            />
          </div>
        </Reveal>

        <Reveal show={revealStage >= 2} className="whoami__card">
          <img className="whoami__mark" src={grammarlyMark} alt="Grammarly" />
          <div className="whoami__role">
            <T uk="ex-Platform Tech Lead у Grammarly" en="ex-Platform Tech Lead at Grammarly" />
          </div>
          <div className="whoami__line">
            <T
              uk={
                <>
                  9 років: Java backend-інженер, техлід продукту{' '}
                  <em>Writing Assistant for Professionals</em>, торкався персоналізації,
                  server-driven UI, DevX-тулів, MLOps, LLMOps, навіть комп'ютерної лінгвістики — і
                  був одним із перших, хто розпочав перехід компанії до AI-first розробки
                </>
              }
              en={
                <>
                  9 years: Java backend engineer, tech lead for the{' '}
                  <em>Writing Assistant for Professionals</em> product, touched personalization,
                  server-driven UI, DevX tools, MLOps, LLMOps, even computational linguistics — and
                  paved the path to AI coding
                </>
              }
            />
          </div>
        </Reveal>
      </div>

      <WhoamiMe />
    </div>
  ),
  notes:
    'Photo and LinkedIn QR are up from the start; two beats: Preply today (AI/agentic '
    + 'transformation of the SDLC), then nine years at Grammarly behind it.',
};
