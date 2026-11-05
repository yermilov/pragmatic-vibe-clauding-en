import { useState } from 'react';
import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';
import peterMobile from '../assets/petermobile.mp4?url';
// Key frame: shown before the video decodes and captured by the PDF export
// (a video otherwise exports as its first frame).
import peterMobilePoster from '../assets/petermobile-poster.jpg?url';
// Remotion renders (video/src/codex.tsx): the Codex CLI start screen, redrawn from a real capture
// of codex-cli 0.166.0 — the working directory is staged (~/dev/billion-dollar-app).
import codexIdle from '../assets/codex/codex-idle.mp4?url';
import codexTyping from '../assets/codex/codex-typing.mp4?url';
import codexTyped from '../assets/codex/codex-typed.mp4?url';
import codexIdleStill from '../assets/codex/codex-idle-still.png?url';
import codexTypedStill from '../assets/codex/codex-typing-still.png?url';
// The photo from @amritwt's tweet (5 Jul 2025, «ok claude, make a billion dollar b2b todo app.
// make no mistakes.»), cropped out of public/billion-dollar-tweet.png.
import chad from '../assets/billion-dollar-chad.jpg';

const IS_EXPORT = new URLSearchParams(window.location.search).has('export');

/** Stage 0: empty prompt, cursor blinking. Stage 1: the prompt types itself once (while the chad
 *  fades in beside it), then the typed prompt keeps blinking. Stage 2 keeps the typed loop. */
function CodexTerminal({ stage }: { stage: number }) {
  const [typingDone, setTypingDone] = useState(false);
  const label = 'Codex CLI';

  if (IS_EXPORT) {
    return <img className="billion-dollar__codex" src={stage >= 1 ? codexTypedStill : codexIdleStill} alt={label} />;
  }
  if (stage === 0) {
    return <video key="idle" className="billion-dollar__codex" src={codexIdle} poster={codexIdleStill} aria-label={label} autoPlay loop muted playsInline />;
  }
  if (stage === 1 && !typingDone) {
    return (
      <video
        key="typing"
        className="billion-dollar__codex"
        src={codexTyping}
        poster={codexIdleStill}
        aria-label={label}
        autoPlay
        muted
        playsInline
        onEnded={() => setTypingDone(true)}
      />
    );
  }
  return <video key="typed" className="billion-dollar__codex" src={codexTyped} poster={codexTypedStill} aria-label={label} autoPlay loop muted playsInline />;
}

export const BillionDollarSlide: SlideDefinition = {
  id: 'billion-dollar',
  title: (
    <>
      {/* UA: Yarik's wording */}
      <span className="text-dim">&gt;</span> <T uk="з чого починаємо" en="let's start" />
    </>
  ),
  maxRevealStages: 2,
  content: ({ revealStage, lang }) => (
    <div className="billion-dollar">
      <CodexTerminal stage={revealStage} />
      <img
        className={`billion-dollar__chad ${revealStage >= 1 ? 'billion-dollar__chad--in' : 'is-unrevealed'}`}
        src={chad}
        alt={tr(lang, 'чоловік за столом з ноутбуком і монітором', 'a man at a desk with a laptop and a monitor')}
      />
      {revealStage >= 2 && (
        <video
          src={peterMobile}
          poster={peterMobilePoster}
          aria-label={tr(lang, 'реакція Пітера Гріффіна', 'Peter Griffin reaction')}
          className="overlay-gif"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
    </div>
  ),
  notes:
    'Codex with an empty prompt → «please generate billion dollar app» types itself while the chad '
    + 'from the @amritwt tweet (Jul 2025) fades in → Peter Griffin. The Codex screen is a Remotion redraw of a real '
    + 'codex-cli 0.166.0 start screen; only the working directory is staged.',
};
