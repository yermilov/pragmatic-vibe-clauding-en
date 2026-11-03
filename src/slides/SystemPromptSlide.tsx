import { useEffect, useState, useRef } from 'react';
import { SlideDefinition } from '../types/slides';
import { exportRegistry } from '../components/exportRegistry';

const SLIDE_ID = 'system-prompt';
// Offline fallback: a bundled snapshot of the prompt, used when the live
// fetch fails (no network / blocked) so the slide still works on stage Wi-Fi.
import fallbackPrompt from '../assets/cc-system-prompt.md?raw';

const PROMPT_URL = 'https://raw.githubusercontent.com/marckrenn/claude-code-changelog/refs/heads/main/cc-prompt.md';

function SystemPromptContent() {
  const [content, setContent] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch the latest prompt on mount; fall back to the bundled copy on failure.
  useEffect(() => {
    fetch(PROMPT_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then((text) => {
        setContent(text);
      })
      .catch(() => {
        setContent(fallbackPrompt);
      });
  }, []);

  // Start auto-scroll after content loads
  useEffect(() => {
    if (!content || !contentRef.current || !containerRef.current) return;

    // Small delay before starting scroll for dramatic effect
    const startDelay = setTimeout(() => {
      setIsScrolling(true);
    }, 800);

    return () => clearTimeout(startDelay);
  }, [content]);

  // Genuinely async (asyncSettle: true): tell the PDF exporter the slide is
  // ready only once the prompt text — live or the bundled fallback — is in.
  useEffect(() => {
    if (content) exportRegistry.markSlideSettled(SLIDE_ID);
  }, [content]);

  // Loading state - terminal boot sequence
  if (!content) {
    return (
      <div className="system-prompt-loading">
        <div className="system-prompt-loading__status">
          <span className="text-dim">[</span>
          INITIALIZING SECURE CONNECTION
          <span className="text-dim">]</span>
        </div>
        <div className="system-prompt-loading__dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="system-prompt-loading__dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="system-prompt-loading__caption">RETRIEVING SYSTEM PROMPT...</div>
      </div>
    );
  }

  // Pull the version straight out of the fetched prompt's title line
  // (e.g. "# Claude Code Version 2.1.156") so the header never goes stale.
  const versionMatch = content?.match(/Claude Code Version\s+([0-9][0-9.]*)/i);
  const versionLabel = versionMatch ? `v${versionMatch[1]}` : 'LIVE';

  // A machine panel: the prompt scrolls past at the code tier, ever faster.
  return (
    <div ref={containerRef} className="system-prompt-container">
      <div
        ref={contentRef}
        className={`system-prompt-text ${isScrolling ? 'system-prompt-scroll' : ''}`}
      >
        <div className="system-prompt-text__banner">
          {'═'.repeat(48)}
          <br />
          ░░░ SYSTEM PROMPT - CLAUDE CODE {versionLabel} ░░░
          <br />
          {'═'.repeat(48)}
        </div>

        <div>{content}</div>

        <div className="system-prompt-text__footer">
          <br />
          {'─'.repeat(48)}
          <br />
          [END OF TRANSMISSION]
          <br />
          {'─'.repeat(48)}
        </div>
      </div>
      <div className="system-prompt-container__corners" aria-hidden />
    </div>
  );
}

export const SystemPromptSlide: SlideDefinition = {
  id: SLIDE_ID,
  asyncSettle: true,
  title: (
    <>
      <span className="text-dim">&gt;</span> show me Claude's system prompt
    </>
  ),
  content: <SystemPromptContent />,
};
