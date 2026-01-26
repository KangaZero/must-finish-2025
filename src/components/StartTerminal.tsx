import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import "@/components/ui/terminal.css";
import { IconButton } from "@once-ui-system/core";
import { useRef, useState } from "react";

const StartTerminal = () => {
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const terminalCodeAreaRef = useRef<HTMLDivElement | null>(null);
  const [terminalInput, setTerminalInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendTerminalCommand = () => {
    if (terminalInput.trim() === "" || !terminalCodeAreaRef.current) return;
    const newSpan = document.createElement("span");
    newSpan.textContent = `> ${terminalInput}`;
    terminalCodeAreaRef.current.appendChild(newSpan);
    setTerminalInput(""); // Clear input after sending
  };

  return (
    <Terminal>
      <div ref={terminalCodeAreaRef}>
        <TypingAnimation>
          &gt; bunx samuel-yong/portfolio@latest init
        </TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔ Preflight checks.
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">✔ Added content</AnimatedSpan>

        <AnimatedSpan className="text-green-500">✔ Added styles</AnimatedSpan>

        <AnimatedSpan className="text-green-500">✔ Added scripts</AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          ✔ Added dependencies.
        </AnimatedSpan>

        <AnimatedSpan className="text-blue-500">
          <span>ℹ Found 1 project:</span>
          <span className="pl-2">- portfolio/me.exe</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-muted">
          Success! Project initialization completed.
        </AnimatedSpan>

        <AnimatedSpan className="text-muted">exit code: 0</AnimatedSpan>
      </div>
      <AnimatedSpan>
        <div
          tabIndex={0}
          onPointerDown={() => {
            terminalInputRef.current?.focus();
          }}
          onFocus={() => terminalInputRef.current?.focus()}
          role="input"
          className="terminal-input-container"
        >
          <input
            ref={terminalInputRef}
            id="terminal-input"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            spellCheck={false}
            className="terminal-input-native"
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              width: "100%",
              left: 0,
              top: 0,
            }}
          />
          <pre className="terminal-input-display">
            {terminalInput}
            <span className={`custom-caret${isFocused ? " blink" : ""}`} />
          </pre>
          <IconButton
            id="terminal-send-btn"
            tooltip="Send Command"
            icon="send"
            size="m"
            onPointerDown={handleSendTerminalCommand}
          />
        </div>
      </AnimatedSpan>
    </Terminal>
  );
};

export default StartTerminal;
