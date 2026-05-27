import { SlideDefinition } from '../types/slides';
import billionDollarTweet from '/billion-dollar-tweet.png?url';
import peterMobileGif from '/petermobile.gif?url';

export const BillionDollarSlide: SlideDefinition = {
  id: 'billion-dollar',
  title: (
    <>
      <span className="text-dim">&gt;</span> let's start
    </>
  ),
  maxRevealStages: 2,
  content: ({ revealStage }) => (
    <div className="image-slide overlay-slide">
      <img
        src={billionDollarTweet}
        alt="Tweet: ok claude, make a billion dollar b2b todo app"
        className={`billion-dollar-tweet${revealStage >= 1 ? ' billion-dollar-tweet--locked' : ''}`}
      />
      {revealStage >= 2 && (
        <img
          src={peterMobileGif}
          alt="Peter Griffin reaction"
          className="overlay-gif"
          style={{ transform: 'translate(-50%, -50%) scale(2)' }}
          loading="lazy"
        />
      )}
    </div>
  ),
};
