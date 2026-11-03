import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, Reveal, revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

const BULLETS: ReactNode[] = [
  <>
    don't box yourself into thinking of it as autocomplete or a code generator —
    improvise, talk to it like a{' '}
    <Emphasis color="green">partner in a chat</Emphasis>
  </>,
  <>
    get on Twitter (yeah, I don't like Elon either) and follow the people who
    matter in AI engineering:{' '}
    <SlideLink href="https://x.com/bcherny">@bcherny</SlideLink>,{' '}
    <SlideLink href="https://x.com/trq212">@trq212</SlideLink>,{' '}
    <SlideLink href="https://x.com/ClaudeCodeLog">@ClaudeCodeLog</SlideLink>,{' '}
    <SlideLink href="https://x.com/mitchellh">@mitchellh</SlideLink>,{' '}
    <SlideLink href="https://x.com/steipete">@steipete</SlideLink>,{' '}
    <SlideLink href="https://x.com/jarredsumner">@jarredsumner</SlideLink>,{' '}
    <SlideLink href="https://x.com/ClaudeDevs">@ClaudeDevs</SlideLink>{' '}
    — but filter out the hype and the empty noise
  </>,
  <>try new approaches, but adapt them to your own needs</>,
  <>not sure about something? just ask <Code>@claude-code-guide</Code></>,
  <>
    use Claude Code to boost your <Emphasis color="green">throughput</Emphasis>,
    not your <Emphasis color="orange">latency</Emphasis>
  </>,
  <>
    watch out for <Emphasis color="orange">AI-FOMO</Emphasis> and{' '}
    <Emphasis color="orange">burnout</Emphasis>: AI shifts the bottleneck from
    mechanical tasks to <Emphasis color="green">actual thinking</Emphasis>
  </>,
  <>
    I'll answer all your questions now, but you can also reach out to me on LinkedIn any time{' '}
    <span className="text-blue">→</span>
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
    // The closing replays the takeaways through a sliding window of three;
    // the LinkedIn QR lands on the very last reveal, in a slot that is laid
    // out from the start so the bullets never move when it arrives.
    <div className="split">
      <div className="split__text">
        {revealWindow(BULLETS, revealStage, 3).map(({ item, index, hidden }) => (
          <SlideItem key={index} delay={0} hidden={hidden}>
            {item}
          </SlideItem>
        ))}
      </div>

      <Reveal show={revealStage >= BULLETS.length} className="final-slide__qr">
        <img src={linkedinQr} alt="LinkedIn QR code - Yarik Yermilov" className="split__media" />
      </Reveal>
    </div>
  ),
  notes:
    'Final slide - closing thoughts: think beyond autocomplete, follow AI engineers on Twitter, filter hype, adapt approaches to your needs, focus on throughput not latency, connect on LinkedIn',
};
