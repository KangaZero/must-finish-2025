"use client";

import styles from "./ThemeToggle.module.scss";
import React, { useEffect, useState } from "react";
import { Icon, ToggleButton, useTheme } from "@once-ui-system/core";
import { useAchievements } from "./AchievementsProvider";

export const ThemeToggle: React.FC<{ className: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const toggleIconRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark"
        | null) ||
        (window.localStorage.getItem("data-theme") as
          | "light"
          | "dark"
          | null) ||
        "light",
    );
  }, []);

  useEffect(() => {
    setCurrentTheme(
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light",
    );
    toggleIconRef.current?.classList.remove(styles.iconSlide);
    // Trigger reflow to restart the animation
    void toggleIconRef.current?.offsetWidth;
    toggleIconRef.current?.classList.add(styles.iconSlide);
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      className={className}
      onPointerDown={() => {
        setTheme(nextTheme);
        unlockAchievement("Eos");
      }}
      aria-label={`Switch to ${nextTheme} mode`}
    >
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
