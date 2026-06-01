import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { Code, Quote, Emphasis, SlideItem } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>
    making changes to your web UI? add{' '}
    <Quote>use frontend-design skill to create well-crafted ui/ux</Quote>
  </>,
  <>
    ask it to{' '}
    <Quote>take a look how similar functionality is already implemented in the repo and follow the same patterns</Quote>
  </>,
  <>
    ask Claude to write tests (<Code>TDD</Code> works really well)
  </>,
  <>
    <Emphasis>repeat after me:</Emphasis> write a stub of the feature by hand and
    ask Claude to finish it
  </>,
  <>
    for really hard tasks,{' '}
    <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
      add{' '}
      <Quote>
        please{' '}
        <span style={{ color: '#ff6b6b' }}>u</span>
        <span style={{ color: '#ffa94d' }}>l</span>
        <span style={{ color: '#ffe066' }}>t</span>
        <span style={{ color: '#8ce99a' }}>r</span>
        <span style={{ color: '#74c0fc' }}>a</span>
        <span style={{ color: '#b197fc' }}>t</span>
        <span style={{ color: '#f783ac' }}>h</span>
        <span style={{ color: '#ff6b6b' }}>i</span>
        <span style={{ color: '#ffa94d' }}>n</span>
        <span style={{ color: '#ffe066' }}>k</span>
        {' '}it
      </Quote>
    </span>{' '}
    configure{' '}
    <code className="code-inline code-inline--orange">/effort</code> level
  </>,
];

export const CodeSlopSlide: SlideDefinition = {
  id: 'code-slop',
  title: (
    <>
      <span className="text-dim">&gt;</span> avoid code slop
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: overflow slide
    const WINDOW = 5;
    const firstVisible = Math.max(0, revealStage - WINDOW);

    return (
      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {BULLETS.map((bullet, i) =>
          revealStage >= i + 1 && i >= firstVisible ? (
            <SlideItem key={i} delay={0}>
              {bullet}
            </SlideItem>
          ) : null,
        )}
      </div>
    );
  },
  notes:
    'Code slop prevention tips - use frontend-design skill, follow repo patterns, teach Claude gotchas, write tests with TDD, write stubs manually, for hard tasks configure /effort level (ultrathink crossed out), document everything',
};
