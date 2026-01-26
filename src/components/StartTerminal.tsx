"use client";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import "@/components/ui/terminal.css";
import { Icon, IconButton } from "@once-ui-system/core";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { terminalCommand } from "@/resources";
import { TerminalCommandTypeKeyType } from "@/types";
import { useUserInfo } from "@/components/UserInfoProvider";

const StartTerminal = () => {
  const pathname = usePathname();
  const { typeSafeUserInfo } = useUserInfo();
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const terminalSendBtnRef = useRef<HTMLButtonElement | null>(null);
  const [terminalInput, setTerminalInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendTerminalCommand = () => {
    if (
      terminalInput.trim() === "" ||
      !terminalInputRef.current ||
      typeof document === "undefined"
    )
      return;

    const allAnimatedSpanElements = document.querySelectorAll(".animated-span");
    const terminalInputDisplayAreaElement = document.getElementById(
      "terminal-input-display-area",
    );
    if (!terminalInputDisplayAreaElement || !allAnimatedSpanElements) return;
    const normalizedTerminalInputCommand = terminalInput
      .toLowerCase()
      .split(" ")[0] as TerminalCommandTypeKeyType;

    const terminalInputArguments = terminalInput.split(" ").slice(1).join(" ");

    //NOTE: The last 2 elements are the current input area and the input wrapper, so we exclude them from removal
    const elementsToRemove = Array.from(allAnimatedSpanElements).slice(0, -2);
    switch (normalizedTerminalInputCommand) {
      case "clear":
        terminalCommand.clear(
          elementsToRemove,
          terminalInputDisplayAreaElement,
        );
        break;
      case "echo":
        terminalCommand.echo(
          terminalInputArguments,
          terminalInputDisplayAreaElement,
        );
        break;
      case "help":
        terminalCommand.help(terminalInputDisplayAreaElement);
        break;
      case "ls":
        terminalCommand.ls(pathname, terminalInputDisplayAreaElement);
        break;
      default:
        terminalInputDisplayAreaElement.innerHTML += `\nCommand not recognized: ${terminalInput}`;
        break;
    }
    setTerminalInput("");
    terminalInputRef?.current?.scrollIntoView();
  };

  //WARNING: Cannot derivatively put the AppendArea directly between AnimatedSpans as it will cause elements after it to not render in
  useEffect(() => {
    if (!terminalInputRef.current) return;
    terminalInputRef.current.focus();
  }, [terminalInputRef]);

  return (
    <Terminal>
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
      <AnimatedSpan id="terminal-input-display-area">{""}</AnimatedSpan>
      <AnimatedSpan className="terminal-input-wrapper">
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
            onChange={(e) => {
              terminalInputRef?.current?.scrollIntoView();
              setTerminalInput(e.target.value);
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendTerminalCommand();
              }
            }}
          />
          {typeSafeUserInfo && (
            <div id="terminal-user-info-icons">
              <Icon name={typeSafeUserInfo.platform} size="s" />
              <Icon
                name={
                  typeSafeUserInfo.bluetoothSupported
                    ? "bluetooth"
                    : "bluetoothDisabled"
                }
                size="s"
              />
              {typeSafeUserInfo.batteryIcon !== "batteryUnknown" &&
                typeSafeUserInfo.batteryLevel && (
                  <IconButton
                    variant="secondary"
                    style={{ pointerEvents: "none" }}
                    tooltip={`${String(typeSafeUserInfo.batteryLevel)}%`}
                    icon={typeSafeUserInfo.batteryIcon}
                    size="s"
                  />
                )}
            </div>
          )}
          <pre className="terminal-input-display">
            {terminalInput}
            <span className={`custom-caret${isFocused ? " blink" : ""}`} />
          </pre>
          <IconButton
            ref={terminalSendBtnRef}
            id="terminal-send-btn"
            tooltip="Send Command (Enter)"
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
