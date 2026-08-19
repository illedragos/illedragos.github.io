import React, { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SCRIPT = [
  "$ ssh dragos@portfolio.dev",
  "> authenticating... OK",
  "> loading stack [react · typescript · node · docker]",
  "> neural interface online",
  "> access granted",
].join("\n");

/**
 * Types out a fake boot sequence. State is a single monotonic character count
 * rather than an array of partial lines, so a StrictMode double-mount (or any
 * duplicated timer) can't interleave two half-typed versions of the same line.
 */
const TerminalBoot: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(() => (reducedMotion ? SCRIPT.length : 0));

  useEffect(() => {
    if (reducedMotion) {
      setTyped(SCRIPT.length);
      return;
    }

    let cancelled = false;
    let index = 0;
    let timer = 0;

    const tick = () => {
      if (cancelled) return;
      index++;
      setTyped((current) => Math.max(current, index));
      if (index >= SCRIPT.length) return;
      // Pause at line breaks the way a real command would.
      const delay = SCRIPT[index - 1] === "\n" ? 340 : 16 + Math.random() * 36;
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 450);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  const lines = SCRIPT.slice(0, typed).split("\n");

  return (
    <div className="terminal-boot" aria-hidden="true">
      <div className="terminal-boot__chrome">
        <span className="terminal-boot__dot" />
        <span className="terminal-boot__dot" />
        <span className="terminal-boot__dot" />
        <span className="terminal-boot__title">~/dragos — zsh</span>
      </div>
      <pre className="terminal-boot__body">
        {lines.map((line, i) => (
          <span key={i} className="terminal-boot__line">
            {line}
            {i === lines.length - 1 && (
              <span className="terminal-boot__cursor" />
            )}
          </span>
        ))}
      </pre>
    </div>
  );
};

export default TerminalBoot;
