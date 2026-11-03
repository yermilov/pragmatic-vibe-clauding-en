import { SlideDefinition } from '../types/slides';
import { LevelItem } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';

// UA copy: UA deck AgendaSlide (section names stay English there too). The "scope" rows
// changed in the EN deck, so they are adapted to the EN meaning (UA: own translation).

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
      <span className="text-dim">&gt;</span>{' '}
      <T uk="про що ми сьогодні будемо і не будемо говорити?" en="what we will and won't talk about today?" />
    </>
  ),
  maxRevealStages: 3,
  content: ({ revealStage, lang }) => (
    <div className="agenda-slide">
      <AgendaSection title="tools" hidden={revealStage < 1}>
        <LevelItem level="high" aside={tr(lang, 'будемо багато', 'a lot')}>claude code</LevelItem>
        <LevelItem level="medium" aside={tr(lang, 'будемо мало', 'a little')}>codex, cursor</LevelItem>
        <LevelItem level="low" aside={tr(lang, 'майже не будемо', 'barely at all')}>{tr(lang, 'інші тули', 'everything else')}</LevelItem>
      </AgendaSection>

      <AgendaSection title="scope" hidden={revealStage < 2}>
        <LevelItem level="high" aside={tr(lang, 'будемо', 'yes')}>{tr(lang, 'як стати продуктивнішими з Claude Code?', 'how to become more productive with Claude Code?')}</LevelItem>
        <LevelItem level="medium" aside={tr(lang, 'наступного разу', 'next time')}>{tr(lang, 'як зробити вашу команду AI-first?', 'how to make your team AI-first?')}</LevelItem>
      </AgendaSection>

      <AgendaSection title="audience" hidden={revealStage < 3}>
        <LevelItem level="high" aside={tr(lang, 'будемо', 'yes')}>{tr(lang, 'claude code для інженерів', 'claude code for engineers')}</LevelItem>
        <LevelItem level="low" aside={tr(lang, 'майже не будемо', 'barely at all')}>{tr(lang, 'claude code для не-інженерів', 'claude code for non-engineers')}</LevelItem>
      </AgendaSection>
    </div>
  ),
};
