import { SlideDefinition } from '../types/slides';
import { T, tr } from '../context/LanguageContext';
import billionDollarTweet from '/billion-dollar-tweet.png?url';
import peterMobile from '../assets/petermobile.mp4?url';
// Key frame: shown before the video decodes and captured by the PDF export
// (a video otherwise exports as its first frame).
import peterMobilePoster from '../assets/petermobile-poster.jpg?url';

export const BillionDollarSlide: SlideDefinition = {
  id: 'billion-dollar',
  title: (
    <>
      {/* UA: own translation (the UA deck had no title here) */}
      <span className="text-dim">&gt;</span> <T uk="почнімо" en="let's start" />
    </>
  ),
  maxRevealStages: 1,
  content: ({ revealStage, lang }) => (
    <div className="image-slide overlay-slide">
      <img src={billionDollarTweet} alt="Tweet: ok claude, make a billion dollar b2b todo app" />
      {revealStage >= 1 && (
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
};
