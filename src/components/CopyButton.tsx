import { useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'failed';

/** The old-school path: a hidden textarea + execCommand('copy'). Returns whether it worked. */
function copyViaTextarea(text: string): boolean {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // permission denied / insecure context — fall through to the textarea path
    }
  }
  return copyViaTextarea(text);
}

/**
 * A terminal-chrome copy button: `[ copy ]` → `[ copied ✓ ]`, or `[ copy failed ]` when neither
 * the Clipboard API nor the textarea fallback confirms the copy. It never lets its own click or
 * Enter/Space reach the deck's navigation (the window keydown handler would advance the talk).
 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [state, setState] = useState<CopyState>('idle');
  // Only the NEWEST attempt may set the label or schedule its reset: a retry clears the previous
  // reset timer, and an older attempt that resolves late is ignored.
  const attempt = useRef(0);
  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const run = async () => {
    const mine = ++attempt.current;
    window.clearTimeout(resetTimer.current);
    const ok = await copyText(text);
    if (mine !== attempt.current) return;
    setState(ok ? 'copied' : 'failed');
    resetTimer.current = window.setTimeout(() => setState('idle'), 1800);
  };

  const label = state === 'copied' ? '[ copied ✓ ]' : state === 'failed' ? '[ copy failed ]' : '[ copy ]';

  return (
    <button
      type="button"
      className={`${className ?? ''} ${state === 'copied' ? 'is-copied' : ''} ${state === 'failed' ? 'is-failed' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        void run();
      }}
      onKeyDown={(e) => {
        // activation keys belong to the button, not to the slide navigation
        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
      }}
    >
      {label}
    </button>
  );
}
