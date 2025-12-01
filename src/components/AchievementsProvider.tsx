"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Button, Row, useToast } from "@once-ui-system/core";
import { achievementsList } from "@/resources/content";
import type { Achievement } from "@/types/content.types";
import Link from "next/link";

type AchievementsContextType = {
  achievements: Achievement[];
  unlockAchievement: (title: Achievement["title"]) => void;
};

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined,
);

export const AchievementsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const LOCAL_STORAGE_KEY = "achievements";
  const { addToast } = useToast();
  const [achievements, setAchievements] =
    useState<Achievement[]>(achievementsList);

  const unlockAchievement = (title: Achievement["title"]) => {
    const isCurrentAchievementAlreadyUnlocked = achievements.some(
      (achievement) => achievement.title === title && achievement.isUnlocked,
    );
    if (isCurrentAchievementAlreadyUnlocked) return;

    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.title === title && !achievement.isUnlocked
          ? { ...achievement, isUnlocked: true, UnlockedAt: new Date() }
          : achievement,
      ),
    );
    addToast({
      variant: "success",
      message: `Achievement "${title}" unlocked!`,
      action: (
        <Link href="/achievements">
          <Button size="s">View Achievements</Button>
        </Link>
      ),
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setAchievements(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    if (
      !achievements.find(
        (achievement) => achievement.id === 1 && !achievement.isUnlocked,
      )
    ) {
      unlockAchievement("New Beginnings");
    }
  }, [achievements]);

  const value = useMemo(
    () => ({ achievements, unlockAchievement }),
    [achievements],
  );

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context)
    throw new Error("useAchievements must be used within AchievementsProvider");
  return context;
};
