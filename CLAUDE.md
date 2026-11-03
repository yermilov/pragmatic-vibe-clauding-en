# CLAUDE.md

## Project Overview

**Pragmatic Vibe Clauding** — the English version of a talk deck (originally
`pragmatic-vibe-clauding-ua`), a terminal-themed React site with Claude Code-style command
navigation. Hosted on GitHub Pages at https://yermilov.github.io/pragmatic-vibe-clauding-en

## Skills — read these before touching the deck

The deck follows the **presentation-dev** plugin. Load the one that matches the task:

| Task | Skill |
|---|---|
| repo, stack, assets, deploy, publishing | `presentation-dev:presentation-stack` |
| tokens, type scale, colour, lint, light theme | `presentation-dev:deck-design-system` |
| choosing a layout, density caps, overflow | `presentation-dev:slide-layouts` |
| `SlideDefinition`, reveals, navigation, timer, PDF export | `presentation-dev:deck-engine` |
| what goes on a slide, bullets, notes, factual claims | `presentation-dev:slide-content` |
| images, video, diagrams | `presentation-dev:deck-visuals` |
| UA ↔ EN parity | `presentation-dev:deck-translation` |

Project-local skills: `design-system` (this deck's tokens and primitives — read it when styling)
and `generate-image` (slide images + saved prompts).

## Tech Stack

Bun · Vite 5 · React 18 · TypeScript strict · react-syntax-highlighter · qrcode.react ·
roughjs · vite-plugin-imagemin · Playwright (dev, PDF export) · GitHub Pages via Actions.

## Commands

```bash
bun install      # REQUIRED before the first `bun run dev`; also wires the pre-commit hook
bun run dev      # http://localhost:5173/pragmatic-vibe-clauding-en/
bun run check    # deck-lint + async-slide gate + typecheck (what the pre-commit hook runs)
bun run lint:deck
bun run build    # lint:deck → check:async-slides → tsc → vite build
bun run preview
bun run pdf      # 1920×1080 PDF of every slide at max reveal → dist/pragmatic-vibe-clauding-en.pdf
```

## Project Structure

```
src/
├── App.tsx                  # <Presentation slides={slides} />
├── slides/
│   ├── index.ts             # THE RUNNING ORDER — the `slides` array
│   ├── exportContract.ts    # async-slide classification for the PDF exporter
│   └── *Slide.tsx           # one SlideDefinition per file
├── components/
│   ├── Presentation.tsx     # timer, theme, progress, export API
│   ├── Slide.tsx            # .slide wrapper; titled slides get .slide-title + .slide-body
│   ├── SlideElements.tsx    # SlideItem, LevelItem, Reveal, revealWindow, Code, Quote, Emphasis, SlideLink, SectionHeader
│   ├── TerminalInput.tsx · Timer.tsx · SlideProgress.tsx · CodeBlock.tsx · exportRegistry.ts
│   └── pacman/              # the Pac-Man easter egg engine
├── context/LanguageContext.tsx  # UA ↔ EN: tr(), <T>, ?lang=
├── hooks/useSlideNavigation.ts   # step-path navigation (utils/traversal.ts)
├── utils/traversal.ts       # deckPath(): the talk as one line of (slide, reveal) steps
├── utils/preloadAssets.ts   # warms every src/assets/** image, audio, mp4
├── design-system/           # tokens.css · base.css · patterns.css · components.css
├── styles/slide-layouts.css # one block per slide
├── assets/                  # auto-preloaded media (put later-slide media here)
└── prompts/*.json           # prompts of generated images
scripts/deck-lint.ts         # the design-system linter (from the deck-design-system skill)
.githooks/pre-commit         # runs `bun run check`
```

## Adding a slide

1. Create `src/slides/MySlide.tsx` exporting a `SlideDefinition`.
2. Import it in `src/slides/index.ts` and place it in the `slides` array (that array is the talk).

```tsx
import { SlideDefinition } from '../types/slides';
import { revealWindow, SlideItem } from '../components/SlideElements';

const BULLETS = [<>first point</>, <>second point</>, <>third point</>];

export const MySlide: SlideDefinition = {
  id: 'my-slide',
  title: (
    <>
      <span className="text-dim">&gt;</span> <span className="text-green">my</span>{' '}
      <span className="text-orange">slide</span>
    </>
  ),
  maxRevealStages: BULLETS.length,
  content: ({ revealStage }) => (
    <div className="my-slide">
      {revealWindow(BULLETS, revealStage).map(({ item, index, hidden }) => (
        <SlideItem key={index} delay={0} hidden={hidden}>{item}</SlideItem>
      ))}
    </div>
  ),
  notes: 'what you must not forget to say',
};
```

Rules that matter (details in the skills):

- **Four font sizes**: 96 hero / 80 heading / 32 body / 24 code — tokens only. `bun run lint:deck`
  fails on anything else. Never shrink type to fit: split the slide or use a sliding window
  (`revealWindow(items, shown, size)`).
- **A reveal never moves what is on screen**: lay everything out from stage 0, hide what is not
  yet revealed (`hidden` / `<Reveal show>`), don't unmount it.
- **Titled slides**: content lives in `.slide-body`, which has an explicit height. Size media with
  `max-height: 100%` — never `calc(var(--vh-full) - <px>)`.
- **Colours are tokens**; tints are `color-mix()` over a token. No raw hex outside `tokens.css`.
- **Per-slide CSS** goes in `src/styles/slide-layouts.css`; no `<style>` tags or inline styling
  in slides. Shared patterns (`.split`, `LevelItem`, …) live in `src/design-system/`.
- **Async slides** (fetch etc.) set `asyncSettle: true`, call `exportRegistry.markSlideSettled`,
  and are listed in `src/slides/exportContract.ts` — the build fails otherwise.

## Assets

- Import every asset; never hardcode a path. `public/` files: `import img from '/x.png?url'`;
  `src/assets/` files: relative import. A literal `src="/x.png"` 404s on Pages (base path).
- Media a later slide needs goes in `src/assets/` — it is preloaded while the title is up.
- Animated content is **MP4, not GIF** (`petermobile.gif` 5.2 MB → `src/assets/petermobile.mp4` 313 KB):
  ```bash
  ffmpeg -i in.gif -vf "fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 28 out.mp4
  ```
  `<video autoPlay loop muted playsInline src={v} />`
- PNG/JPEG compression happens at build time (`vite-plugin-imagemin`); `loading="lazy"` on
  images after the first slide.

## Navigation

Type in the input box (letters only act on an EMPTY box; anything else just clears it):

- `next` / `n` → next slide · `prev` / `back` / `p` / `b` → previous slide
- `reveal` / `r` / `move` / `m` → next reveal step
- `<N>` → step N (the same N as `#slide-N` in the URL) · `-<N>` → N steps from the end
- `first` / `start` / `home`, `last` / `end`
- `light` / `dark` → theme (persisted)
- `ukrainian` / `english` → slide language (persisted, mirrored in `?lang=uk|en`)

Keys (outside the box): → ↓ Space PageDown Enter advance, ← ↑ PageUp Backspace go back,
Home/End. PageDown/PageUp always work (clicker). Swipes on touch.

**`#slide-N` is a STEP of the talk, not a slide index** — every reveal is a step, detours are
inlined (`utils/traversal.ts`). Adding a slide or a reveal shifts every later step id; say so when
reporting a structural change.

The timer starts when you leave the title slide, resets when you return to it, survives a reload,
and discards a start older than 4 hours. The talk length is `TALK_SECONDS` in `Timer.tsx`. The
progress bar ("context left until auto-compact") weights every reveal equally and appears past
the half-way point.

## Two languages (UA ↔ EN)

The deck is bilingual at runtime, ported from `dou-days-2026`: English is the home language,
Ukrainian the alternate. `src/context/LanguageContext.tsx` gives `tr(lang, uk, en)` and
`<T uk="…" en="…" />`; render-function slides read `lang` from their props.

- Bullet arrays come in pairs, `X_UK` / `X_EN`, **same length, same order** — reveal counts are
  derived from the EN array. A new or edited bullet must be changed in both.
- Ukrainian copy comes from the original `pragmatic-vibe-clauding-ua` deck (or `dou-days-2026`);
  strings marked `// UA: own translation` were translated here and are worth a read by Yarik.
- Stays English in both: what is typed to or shown by a tool (prompts, commands, code, the system
  prompt), product names, the terminal chrome (placeholder, `context left until auto-compact`) and
  speaker notes.
- `?lang=uk` makes a shareable Ukrainian link; `LANG_DECK=uk bun run pdf` exports
  `dist/pragmatic-vibe-clauding-en-uk.pdf`.
- Verify a changed slide in BOTH languages — Ukrainian runs longer; fix overflow by rephrasing
  shorter, never by shrinking type.

## Verifying a change

Per the deck-engine skill: `bun run check`, then `bun run dev`, open the slide in Chrome, step
through **every** reveal and screenshot the last one. Overflow is measured across 1920×1080,
1728×850, 1280×720, 1024×768 and landscape phones (915×412, 844×390, 667×375).

## Image generation

Use the project `generate-image` skill: it delegates to `media:generate-image` (Gemini / ChatGPT in
the logged-in browser), saves the image to `public/` (or `src/assets/` if a later slide needs it
preloaded) and the prompt to `src/prompts/<name>.json` (`filename`, `prompt`, `ratio`,
`timestamp`, `model`) so it can be regenerated.

## Troubleshooting

**`bun install` hangs at "Resolving…"** — the lockfile points at a private registry. Diagnose
with `grep -n "artifactory" bun.lock`; fix with
`rm -rf bun.lock bun.lockb node_modules && bun install`. (Regenerated 2026-11-03 against the
public registry; CI pins bun 1.4.2 to read it.)

**`pngquant-bin` postinstall fails on macOS** — it only affects build-time image compression;
`bun install --ignore-scripts` gets you a working dev server.

## Git

Solo project — commit straight to `main`, messages `Add/Update/Fix/Remove …`, AI co-author
footer. The pre-commit hook runs `bun run check` and refuses unstaged changes it would read.
Pushes need the personal `yermilov` account. Switch to it ONLY for the git operation and back immediately:
`gh auth switch --user yermilov`, push,
then `gh auth switch --user yaroslav-yermilov` (the work account; `yaroslav-yermilov_super` no longer exists).
