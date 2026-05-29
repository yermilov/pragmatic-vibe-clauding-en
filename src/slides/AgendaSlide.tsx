import { SlideDefinition } from '../types/slides';

type Level = 'high' | 'medium' | 'low';

const levelStyles = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    labelColor: 'var(--terminal-white)',
    labelGlow: '0 0 20px rgba(240, 136, 62, 0.3)',
    descColor: 'var(--terminal-green)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-blue)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    descColor: 'var(--terminal-green-dim)',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-dim)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    descColor: 'var(--terminal-white-dim)',
    opacity: 0.85,
  },
};

function AgendaItem({ level, label, desc }: { level: Level; label: string; desc: string }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr auto',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.6rem',
        opacity: s.opacity,
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold' }}>{s.prefix}</span>
      <span
        style={{
          color: s.labelColor,
          textShadow: s.labelGlow,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: s.descColor,
          fontSize: '1.35rem',
          fontStyle: 'italic',
        }}
      >
        {desc}
      </span>
    </div>
  );
}

function AgendaSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div
        style={{
          color: 'var(--terminal-blue)',
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--terminal-border)',
          paddingBottom: '0.25rem',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</div>
    </div>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  title: (
    <>
      <span className="text-dim">&gt;</span> what's on the agenda?
    </>
  ),
  maxRevealStages: 3,
  content: ({ revealStage }) => (
    <>
      <p style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        what we will and won't talk about today?
      </p>

      <div
        style={{
          textAlign: 'left',
          display: 'inline-block',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {revealStage >= 1 && (
          <AgendaSection key={0} title="tools">
            <AgendaItem level="high" label="claude code" desc="a lot" />
            <AgendaItem level="medium" label="codex, cursor" desc="a little" />
            <AgendaItem level="low" label="everything else" desc="barely at all" />
          </AgendaSection>
        )}

        {revealStage >= 2 && (
          <AgendaSection key={1} title="scope">
            <AgendaItem level="high" label="how to pragmatically use claude code in hackathon mode?" desc="yes" />
            <AgendaItem level="medium" label="how to grow a product long-term with claude code?" desc="a bit" />
          </AgendaSection>
        )}

        {revealStage >= 3 && (
          <AgendaSection key={2} title="audience">
            <AgendaItem level="high" label="claude code for engineers" desc="yes" />
            <AgendaItem level="low" label="claude code for non-engineers" desc="barely at all" />
          </AgendaSection>
        )}
      </div>
    </>
  ),
};
