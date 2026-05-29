import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

const BULLETS: ReactNode[] = [
  <>
    don't box yourself into thinking of it as autocomplete or a code generator —
    improvise, talk to it like a{' '}
    <Emphasis color="green">partner in a chat</Emphasis>
  </>,
  <>
    get on Twitter (yeah, even if Elon's a tool) and follow the people who
    matter in AI engineering:{' '}
    <SlideLink href="https://x.com/bcherny">@bcherny</SlideLink>,{' '}
    <SlideLink href="https://x.com/trq212">@trq212</SlideLink>,{' '}
    <SlideLink href="https://x.com/ClaudeCodeLog">@ClaudeCodeLog</SlideLink>,{' '}
    <SlideLink href="https://x.com/mitchellh">@mitchellh</SlideLink>,{' '}
    <SlideLink href="https://x.com/steipete">@steipete</SlideLink>
  </>,
  <>
    like the Claude Code tweets to train the algorithm — but filter out the hype
    and the empty noise
  </>,
  <>try new approaches, but adapt them to your own needs</>,
  <>
    use Claude Code to boost your <Emphasis color="green">throughput</Emphasis>,
    not your <Emphasis color="orange">latency</Emphasis>
  </>,
  <>
    reach out to me on LinkedIn{' '}
    <span style={{ color: 'var(--terminal-blue)' }}>→</span>
  </>,
];

export const FinalSlide: SlideDefinition = {
  id: 'final',
  title: (
    <>
      <span className="text-dim">&gt;</span> compacting the conversation...
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3xl)',
          width: '100%',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        {/* Left column - bullets */}
        <div
          style={{
            flex: 1,
            maxWidth: '650px',
            textAlign: 'left',
          }}
        >
          {(() => {
            // rolling window: overflow slide
            const WINDOW = 3;
            const firstVisible = Math.max(0, revealStage - WINDOW);
            return BULLETS.map((bullet, i) =>
              revealStage >= i + 1 && i >= firstVisible ? (
                <SlideItem key={i} delay={0}>
                  {bullet}
                </SlideItem>
              ) : null,
            );
          })()}
        </div>

        {/* Right column - QR code */}
        <img
          src={linkedinQr}
          alt="LinkedIn QR code - Yarik Yermilov"
          style={{
            flexShrink: 0,
            maxWidth: '600px',
            maxHeight: 'calc(100vh - 180px)',
            objectFit: 'contain',
            borderRadius: 'var(--input-border-radius)',
            border: '2px solid var(--terminal-border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            opacity: 0,
            animation: 'slideItemFadeIn 0.5s ease-out forwards',
            animationDelay: '0.35s',
          }}
        />
      </div>
    </>
  ),
  notes:
    'Final slide - closing thoughts: think beyond autocomplete, follow AI engineers on Twitter, filter hype, adapt approaches to your needs, focus on throughput not latency, connect on LinkedIn',
};
