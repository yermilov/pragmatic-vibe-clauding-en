import { SlideDefinition } from '../types/slides';
import { LevelItem } from '../components/SlideElements';

function AgendaSection({ title, hidden, children }: { title: string; hidden: boolean; children: React.ReactNode }) {
  return (
    <section className={`agenda-section ${hidden ? 'is-unrevealed' : 'reveal-enter'}`} aria-hidden={hidden || undefined}>
      <div className="agenda-section__title">{title}</div>
      {children}
    </section>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  title: (
    <>
      <span className="text-dim">&gt;</span> what we will and won't talk about today?
    </>
  ),
  maxRevealStages: 3,
  content: ({ revealStage }) => (
    <div className="agenda-slide">
      <AgendaSection title="tools" hidden={revealStage < 1}>
        <LevelItem level="high" aside="a lot">claude code</LevelItem>
        <LevelItem level="medium" aside="a little">codex, cursor</LevelItem>
        <LevelItem level="low" aside="barely at all">everything else</LevelItem>
      </AgendaSection>

      <AgendaSection title="scope" hidden={revealStage < 2}>
        <LevelItem level="high" aside="yes">how to become more productive with Claude Code?</LevelItem>
        <LevelItem level="medium" aside="next time">how to make your team AI-first?</LevelItem>
      </AgendaSection>

      <AgendaSection title="audience" hidden={revealStage < 3}>
        <LevelItem level="high" aside="yes">claude code for engineers</LevelItem>
        <LevelItem level="low" aside="barely at all">claude code for non-engineers</LevelItem>
      </AgendaSection>
    </div>
  ),
};
