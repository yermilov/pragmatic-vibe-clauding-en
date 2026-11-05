import { SlideDefinition } from '../types/slides';

export interface Step {
  /** index into the slides array */
  index: number;
  revealStage: number;
}

/**
 * The talk as one line: every (slide, reveal) pair in the order the talk
 * visits it, detours inlined. A detour target sits after its origin in the
 * array but is shown in the MIDDLE of the origin's reveals: at `atStage` the
 * target plays in full, then the origin resumes at `returnStage`; the target
 * is not visited again on the linear pass.
 *
 * Navigation is a position on this line — forward is +1, back is −1, and the
 * URL's `#slide-N` is position N — so ids rise monotonically through detours
 * and back always retraces forward.
 */
export function deckPath(slides: SlideDefinition[]): Step[] {
  const detourTargets = new Set(slides.flatMap((s) => (s.detours ?? []).map((d) => d.toId)));
  const steps: Step[] = [];
  const seen = new Set<string>();
  const visit = (index: number, revealStage: number) => {
    const key = `${index}:${revealStage}`;
    if (seen.has(key)) return;
    seen.add(key);
    steps.push({ index, revealStage });
  };

  // Plays one slide's reveals; a detour target is played the same way, so a detour may
  // itself detour (nested). `seen` stops a cycle from looping forever.
  const play = (index: number) => {
    const slide = slides[index];
    const max = slide.maxRevealStages ?? 0;
    for (let stage = 0; stage <= max; stage++) {
      visit(index, stage);
      // Several detours may leave from the same stage: their targets play back to back,
      // in the order listed, and the origin resumes at the last one's returnStage.
      const detours = (slide.detours ?? []).filter((d) => d.atStage === stage);
      for (const detour of detours) {
        const target = slides.findIndex((s) => s.id === detour.toId);
        if (target < 0 || seen.has(`${target}:0`)) continue;
        play(target);
        stage = detour.returnStage - 1; // the loop's ++ lands on returnStage
      }
    }
  };

  slides.forEach((slide, index) => {
    if (!detourTargets.has(slide.id)) play(index);
  });

  return steps;
}
