import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';
import mcpToolCallFlow from '/mcp-tool-call-flow.png?url';
import mcpContextPollution from '/mcp-context-pollution.png?url';

const MCP_BULLETS: React.ReactNode[] = [
  <>
    <Code>MCP</Code> (Model Context Protocol) — the hyped standard for
    integrating LLM apps with tools
  </>,
  <>
    <Code>tool</Code> — a way to let the LLM perform actions, not just
    generate text
  </>,
  <>
    but in reality MCP is a fairly controversial technology, since it has plenty of problems and limitations
  </>,
  <>
    for Claude Desktop or ChatGPT there's no alternative, but for Claude Code you should always reach for the CLI first
  </>,
  <>
    for example: instead of the GitHub MCP, use the <Code>gh</Code> CLI
  </>,
  <>
    in some cases, you can use the Claude Chrome extension
  </>,
  <>
    the one MCP server I can recommend almost without hesitation is{' '}
    <SlideLink href="https://github.com/ChromeDevTools/chrome-devtools-mcp">
      chrome-devtools-mcp
    </SlideLink> (and the Slack connector, to some extent)
  </>,
  <>
    don't forget to hint to Claude that you'd like it to use a particular MCP
  </>,
];

export const McpSlide: SlideDefinition = {
  id: 'mcp',
  title: (
    <>
      <span className="text-dim">&gt;</span> what is MCP?
    </>
  ),
  maxRevealStages: MCP_BULLETS.length,
  content: ({ revealStage }) => {
    // rolling window: overflow slide — show at most 4 bullets at a time
    const WINDOW = 4;
    const firstVisible = Math.max(0, revealStage - WINDOW);

    return (
      <div className="mcp-slide">
        <img
          src={mcpToolCallFlow}
          alt="LLM tool call token flow"
          className="mcp-slide-image-left"
        />

        <div className="mcp-slide-content">
          {MCP_BULLETS.map((bullet, i) =>
            revealStage >= i + 1 && i >= firstVisible ? (
              <SlideItem key={i} delay={0}>
                {bullet}
              </SlideItem>
            ) : null,
          )}
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
