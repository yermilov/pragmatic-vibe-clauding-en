import { useEffect, useRef } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import warcraftComplete from '../assets/warcraft-complete.wav?url';
import warcraftYes from '../assets/warcraft-yes.wav?url';
import warcraftWhat from '../assets/warcraft-what.wav?url';
import peasantFace from '../assets/warcraft-peasant-permission.jpeg?url';

const PROMPT_CODE = `claude> Fetch the Warcraft 2 peon/peasant quotes page at warcraft.wiki.gg/wiki/Quotes_of_Warcraft_II#Peon and download the Ready, Yes, Job Complete and What sounds for both Peasant (Alliance) and Peon (Horde). Skip the "Pissed" category.

Organize them into ~/.claude/sounds/warcraft2/{ready,yes,complete,what}/.

Use curl with a browser User-Agent header and download files sequentially with small delays to avoid rate limiting. Verify each .wav with \`file\` — it must report RIFF/WAVE, not ASCII or JSON.

Then add two hooks to the global ~/.claude/settings.json: a Notification hook that plays a random "What?" sound when Claude waits for permission, and a Stop hook that plays a random ready/yes/complete sound when the session ends. Both with afplay -v 1.5.

Use @claude-code-guide (agent) to confirm hook format.`;

const SCOPED_STYLES = `
  @keyframes warcraftPanelIn {
    from { opacity: 0; transform: translateY(12px) scale(0.99); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  .warcraft-fun-body {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    height: calc(var(--vh-full) - 220px);
    gap: 40px;
    min-height: 0;
    text-align: left;
  }

  .warcraft-fun-bullets {
    flex: 0 0 36%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    min-width: 0;
  }

  .warcraft-fun-right--image {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: warcraftPanelIn 480ms cubic-bezier(0.19, 1, 0.22, 1) both;
  }

  .warcraft-fun-panel {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 14px;
    background: color-mix(in srgb, var(--terminal-bg) 60%, transparent);
    border: 1px solid color-mix(in srgb, var(--terminal-green) 35%, transparent);
    box-shadow:
      0 18px 48px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 color-mix(in srgb, var(--terminal-white) 10%, transparent);
    font-family: var(--font-mono);
    animation: warcraftPanelIn 480ms cubic-bezier(0.19, 1, 0.22, 1) both;
  }

  .warcraft-fun-panel__chrome {
    padding: 10px 18px;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
    color: color-mix(in srgb, var(--terminal-green) 70%, transparent);
    flex-shrink: 0;
  }
  .warcraft-fun-panel__chrome--top {
    border-bottom: 1px solid color-mix(in srgb, var(--terminal-green) 22%, transparent);
  }
  .warcraft-fun-panel__chrome--bottom {
    border-top: 1px solid color-mix(in srgb, var(--terminal-green) 22%, transparent);
    color: color-mix(in srgb, var(--terminal-green) 40%, transparent);
    letter-spacing: 0.12em;
  }

  .warcraft-fun-panel__viewport {
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
    display: flex;
  }

  .warcraft-fun-prompt {
    flex: 1 1 auto;
    margin: 0;
    padding: 1.4rem 1.6rem;
    font-family: var(--font-mono);
    font-size: 0.95rem;
    line-height: var(--line-height-relaxed);
    color: var(--terminal-white);
    white-space: pre-wrap;
    word-break: normal;
    overflow-wrap: anywhere;
    overflow: auto;
  }
`;

function WarcraftFunContent({ revealStage }: { revealStage: number }) {
  // Track which stages have already triggered audio so re-renders within the
  // same stage don't replay the cascade.
  const triggeredRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (triggeredRef.current.has(revealStage)) return;

    if (revealStage === 2) {
      triggeredRef.current.add(2);
      const a = new Audio(warcraftComplete);
      a.volume = 0.95;
      void a.play().catch(() => {});
      return;
    }

    if (revealStage === 3) {
      triggeredRef.current.add(3);
      // 2000s LAN-café cacophony: stagger seven plays across ~1.6s,
      // overlapping yes/complete/what so the office sounds chaotic.
      const cascade = [
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
      ];
      const timers = cascade.map((src, i) =>
        window.setTimeout(() => {
          const a = new Audio(src);
          a.volume = 0.7;
          void a.play().catch(() => {});
        }, i * 220),
      );
      return () => {
        timers.forEach(window.clearTimeout);
      };
    }
  }, [revealStage]);

  const showImage = revealStage === 1;
  const showCode = revealStage >= 2;

  return (
    <>
      <style>{SCOPED_STYLES}</style>

      <div className="warcraft-fun-body">
        {/* Left column — bullets accumulate across reveal stages. */}
        <div className="warcraft-fun-bullets">
          {revealStage >= 1 && revealStage < 3 && (
            <SlideItem delay={0.05}>
              have you ever kick off Claude on a big task, come back{' '}
              <Emphasis color="orange">30 minutes</Emphasis> later — and it spent
              the whole time waiting for permission to run a{' '}
              <Emphasis color="green">grep</Emphasis> on your code?
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              make a <Emphasis color="green">skill</Emphasis> that plays a{' '}
              <Emphasis color="orange">Warcraft unit sound</Emphasis> every time
              Claude stops
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              but get ready for your
              office to sound like a{' '}
              <Emphasis color="green">2000s LAN café</Emphasis>
            </SlideItem>
          )}
        </div>

        {/* Right column — image at stage 1, framed prompt panel at stage 2+. */}
        {showImage && (
          <div className="warcraft-fun-right--image" key="image">
            <img
              src={peasantFace}
              alt="Warcraft II peasant — work, work."
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                borderRadius: '14px',
                boxShadow: '0 18px 48px rgba(0, 0, 0, 0.6)',
                border: '1px solid color-mix(in srgb, var(--terminal-green) 35%, transparent)',
              }}
            />
          </div>
        )}

        {showCode && (
          <div className="warcraft-fun-panel" key="code">
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--top">
              ░░░ prompt ░░░
            </div>
            <div className="warcraft-fun-panel__viewport">
              <pre className="warcraft-fun-prompt">{PROMPT_CODE}</pre>
            </div>
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--bottom">
              [WORK COMPLETE]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const WarcraftFunSlide: SlideDefinition = {
  id: 'warcraft-fun',
  title: (
    <>
      <span className="text-dim">&gt;</span>{' '}
      <span className="text-green">have some fun</span>
    </>
  ),
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <WarcraftFunContent revealStage={revealStage} />,
  notes:
    'Stage 0: question title only. Stage 1: the familiar pain (Claude stuck on a grep permission) + peasant face. Stage 2: the fix — a skill that plays a Warcraft unit sound on the Stop hook + the prompt + one "work complete" sound. Stage 3: marketplace consequence + a cascade of sounds like a 2000s LAN café.',
};
