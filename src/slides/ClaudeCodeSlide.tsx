import { ReactNode } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { Quote, Reveal, SlideItem } from '../components/SlideElements';
import { T } from '../context/LanguageContext';

const REPO_URL = 'https://github.com/yermilov/pragmatic-vibe-clauding-en';
const REPO_LABEL = 'github.com/yermilov/pragmatic-vibe-clauding-en';

const TASKS: ReactNode[] = [
  <Quote>hey claude, build static web site from scratch and deploy on github pages</Quote>,
  <Quote>hey claude, use /frontend-design skill to come up with terminal inspired design system</Quote>,
  <Quote>hey claude, generate qr code from link</Quote>,
  <Quote>hey claude, generate images using Gemini</Quote>,
];

const QR_REVEAL_STAGE = 2;
const DS_REVEAL_STAGE = 1;

// Stage 0 is "no design system": white page, black serif, no CRT, no chrome,
// so the slide *looks* like raw unstyled HTML until the /frontend-design
// prompt is revealed. The slide only marks itself with `cc-no-ds`; the frame
// repaints through `.presentation:has(.cc-no-ds)` in slide-layouts.css (a
// slide never reaches out of itself to restyle the frame).
function ClaudeCodeContent({ revealStage }: { revealStage: number }) {
  const dsApplied = revealStage >= DS_REVEAL_STAGE;

  return (
    <div className={`cc-example ${dsApplied ? '' : 'cc-no-ds'}`}>
      <div className="cc-example__bullets">
        {/* UA copy: dou-days-2026 ClaudeCodeSlide; the prompts stay English */}
        <SlideItem delay={0.05}>
          <T uk="цю презентацію повністю створено у Claude Code" en="this entire presentation was built in Claude Code" />
        </SlideItem>

        <div aria-hidden className="cc-example__rule" />

        {TASKS.map((task, i) => (
          <SlideItem key={i} delay={0} reveal hidden={revealStage < i}>
            {task}
          </SlideItem>
        ))}
      </div>

      <div className="cc-example__qr-column">
        <Reveal show={revealStage >= QR_REVEAL_STAGE} className="cc-example__qr">
          <QRCodeSVG value={REPO_URL} size={520} bgColor="transparent" fgColor="currentColor" level="M" />
        </Reveal>

        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="cc-example__repo">
          <span className="cc-example__repo-prompt">$</span>
          {REPO_LABEL}
        </a>
      </div>
    </div>
  );
}

export const ClaudeCodeSlide: SlideDefinition = {
  id: 'explore-and-have-fun',
  title: (
    <>
      <span className="text-dim">&gt;</span> <span className="text-green"><T uk="ну наприклад" en="for example" /></span>
    </>
  ),
  maxRevealStages: TASKS.length - 1,
  content: ({ revealStage }: SlideContentProps) => <ClaudeCodeContent revealStage={revealStage} />,
  notes:
    `Stage 0: thesis + first prompt ('build static web site...'), raw-HTML look. Stage ${DS_REVEAL_STAGE} ('use /frontend-design skill...'): terminal design system snaps in. Stage ${QR_REVEAL_STAGE} ('generate qr code from link'): right-column QR appears alongside its matching prompt.`,
};
