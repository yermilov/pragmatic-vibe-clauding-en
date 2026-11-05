import { SlideDefinition } from '../types/slides';
import { Code, revealWindow, SlideItem, SlideLink } from '../components/SlideElements';
import { T, tr } from '../context/LanguageContext';
import mcpToolCallFlow from '/mcp-tool-call-flow.png?url';
import mcpContextPollution from '/mcp-context-pollution.png?url';

// UA copy: the UA deck's McpSlide; the connectors aside is Yarik's wording (05.11.2026),
// EN: own translation.
const MCP_BULLETS_UK: React.ReactNode[] = [
  <>
    <Code>MCP</Code> (Model Context Protocol) — стандарт інтеграції LLM з тулами
  </>,
  <>
    <Code>tool</Code> — спосіб дозволити LLM виконувати дії, а не лише
    генерувати текст
  </>,
  <>
    але насправді MCP — доволі контроверсійна технологія, оскільки вона має багато проблем і обмежень
  </>,
  <>
    для Claude Desktop чи ChatGPT альтернатив їй немає, а от для кодінг агентів варто завжди в першу чергу використовувати CLI
  </>,
  <>
    приклад: замість GitHub MCP використовуйте <Code>gh</Code> CLI
  </>,
  <>
    єдиний MCP сервер, який майже без вагань можу порекомендувати, — це{' '}
    <SlideLink href="https://github.com/ChromeDevTools/chrome-devtools-mcp">
      chrome-devtools-mcp
    </SlideLink> (а також коннектори — Slack, Google Docs, Google Calendar, …)
  </>,
  <>
    не забувайте підказувати агенту, що ви би хотіли, щоб він використав певний MCP
  </>,
];

const MCP_BULLETS_EN: React.ReactNode[] = [
  <>
    <Code>MCP</Code> (Model Context Protocol) — the standard for integrating LLMs with tools
  </>,
  <>
    <Code>tool</Code> — a way to let the LLM perform actions, not just
    generate text
  </>,
  <>
    but in reality MCP is a fairly controversial technology, since it has plenty of problems and limitations
  </>,
  <>
    for Claude Desktop or ChatGPT there's no alternative, but for coding agents you should always reach for the CLI first
  </>,
  <>
    for example: instead of the GitHub MCP, use the <Code>gh</Code> CLI
  </>,
  <>
    the one MCP server I can recommend almost without hesitation is{' '}
    <SlideLink href="https://github.com/ChromeDevTools/chrome-devtools-mcp">
      chrome-devtools-mcp
    </SlideLink> (plus connectors — Slack, Google Docs, Google Calendar, …)
  </>,
  <>
    don't forget to hint to the agent that you'd like it to use a particular MCP
  </>,
];

export const McpSlide: SlideDefinition = {
  id: 'mcp',
  title: (
    <>
      <span className="text-dim">&gt;</span> <T uk="що таке MCP?" en="what is MCP?" />
    </>
  ),
  maxRevealStages: MCP_BULLETS_EN.length,
  content: ({ revealStage, lang }) => {
    // sliding window: three bullets beside the visual (the two-column cap);
    // a spoken bullet drops off when the fourth arrives
    const slots = revealWindow(tr(lang, MCP_BULLETS_UK, MCP_BULLETS_EN), revealStage, 3);

    return (
      <div className="mcp-slide">
        <img
          src={mcpToolCallFlow}
          alt="LLM tool call token flow"
          className="mcp-slide-image-left"
        />

        <div className="mcp-slide-content">
          {slots.map(({ item, index, hidden }) => (
            <SlideItem key={index} delay={0} hidden={hidden}>
              {item}
            </SlideItem>
          ))}
        </div>

        <img
          src={mcpContextPollution}
          alt="MCP context window pollution"
          className="mcp-slide-image-right"
        />
      </div>
    );
  },
  notes: 'MCP servers overview - what they are, how to use them, and current recommendations',
};
