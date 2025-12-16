"use client";

import React, { useEffect, useState } from "react";
import { Icon, Row, ToggleButton, useTheme } from "@once-ui-system/core";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const toggleIconRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light",
    );
  }, []);

  useEffect(() => {
    setCurrentTheme(
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light",
    );
    toggleIconRef.current?.classList.remove(styles.iconSlide);
    // Trigger reflow to restart the animation
    void toggleIconRef.current?.offsetWidth;
    toggleIconRef.current?.classList.add(styles.iconSlide);
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton onClick={() => setTheme(nextTheme)} aria-label={`Switch to ${nextTheme} mode`}>
      <Icon
        ref={toggleIconRef}
        name={icon}
        size="s"
        tooltip={`Switch to ${nextTheme} mode`}
        tooltipPosition="top"
      />
    </ToggleButton>
  );
};
