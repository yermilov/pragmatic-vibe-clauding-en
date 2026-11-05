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
      <AgendaSection title="scope" hidden={revealStage < 1}>
        <LevelItem level="high" aside={tr(lang, 'будемо', 'yes')}>{tr(lang, 'як стати продуктивнішими з агентами?', 'how to become more productive with agents?')}</LevelItem>
        <LevelItem level="medium" aside={tr(lang, 'може іншим разом', 'maybe another time')}>{tr(lang, 'як зробити вашу команду AI-first?', 'how to make your team AI-first?')}</LevelItem>
        {/* UA: Yarik's wording; EN: own translation */}
        <LevelItem level="low" aside={tr(lang, 'може іншим разом', 'maybe another time')}>{tr(lang, 'як зробити вашу організацію AI-first?', 'how to make your organization AI-first?')}</LevelItem>
      </AgendaSection>

      {/* UA: Yarik's wording (05.11.2026); EN: own translation */}
      <AgendaSection title="tools" hidden={revealStage < 2}>
        <LevelItem level="high" aside={tr(lang, 'рідний для мене', 'my home tool')}>claude code</LevelItem>
        <LevelItem level="medium" aside={tr(lang, 'також користуюся', 'I use it too')}>codex</LevelItem>
        <LevelItem level="low" aside={tr(lang, 'щось чув', "heard of them")}>{tr(lang, 'інші тули', 'other tools')}</LevelItem>
      </AgendaSection>

      <AgendaSection title="audience" hidden={revealStage < 3}>
        <LevelItem level="high" aside={tr(lang, 'будемо', 'yes')}>{tr(lang, 'claude code для інженерів', 'claude code for engineers')}</LevelItem>
        <LevelItem level="low" aside={tr(lang, 'майже не будемо', 'barely at all')}>{tr(lang, 'claude code для не-інженерів', 'claude code for non-engineers')}</LevelItem>
      </AgendaSection>
    </div>
  ),
};
