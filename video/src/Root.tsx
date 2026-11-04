import React from 'react';
import { Composition } from 'remotion';
import { ChatTwin, ClaudeTwin, TWIN_FRAMES, WIN_W as TWIN_W, H as TWIN_H } from './twinTyping';
import { CodexIdle, CodexTyped, CodexTyping, FPS, IDLE_FRAMES, TYPING_FRAMES } from './codex';

const W = 1600;
const H = 720;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CodexIdle" component={CodexIdle} durationInFrames={IDLE_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="CodexTyping" component={CodexTyping} durationInFrames={TYPING_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="CodexTyped" component={CodexTyped} durationInFrames={IDLE_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="ChatTwin" component={ChatTwin} durationInFrames={TWIN_FRAMES} fps={FPS} width={TWIN_W} height={TWIN_H} />
    <Composition id="ClaudeTwin" component={ClaudeTwin} durationInFrames={TWIN_FRAMES} fps={FPS} width={TWIN_W} height={TWIN_H} />
  </>
);
