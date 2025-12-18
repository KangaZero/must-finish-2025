"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Button, Row, useToast } from "@once-ui-system/core";
import { achievementsList, negativeAchievement } from "@/resources/content";
import type { Achievement } from "@/types/content.types";
import Link from "next/link";

type AchievementsContextType = {
  achievements: Achievement[];
  unlockAchievement: (
    ...args:
      | [title: "Speedophile", split: number]
      | [title: Exclude<Achievement["title"], "Speedophile">]
  ) => void;
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
  const [unlockSandMandala, setUnlockSandMandala] = useState(false);

  const unlockAchievement = useCallback(
    (
      ...args:
        | [title: "Speedophile", split: number]
        | [title: Exclude<Achievement["title"], "Speedophile">]
    ) => {
      const [title, split] = args;
      const isCurrentAchievementAlreadyUnlocked = achievements.some(
        (achievement) => achievement.title === title && achievement.isUnlocked,
      );
      if (isCurrentAchievementAlreadyUnlocked) return;
      setAchievements((prev) =>
        prev.map((achievement) => {
          if (achievement.title !== title || achievement.isUnlocked) {
            return achievement;
          }

          // Base update for all achievements
          const updated = {
            ...achievement,
            isUnlocked: true,
            UnlockedAt: new Date(),
          };

          // Add split only if it's the Speedophile achievement
          if (title === "Speedophile") {
            const updatedAchievement: Achievement<"Speedophile"> = {
              ...updated,
              split: split,
            };
            return updatedAchievement;
          }

          return updated;
        }),
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
    },
    [achievements, addToast],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      // could be in .env, but nothing to hide so yeah. also this is just a random git commit
      const keyToUnlockSandMandala = "e1eda57b";
      console.log("stored", stored);
      if (stored && stored !== keyToUnlockSandMandala) {
        setAchievements(JSON.parse(stored));
      } else if (stored === keyToUnlockSandMandala) {
        setUnlockSandMandala(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  // NOTE: No Achievements have been unlocked yet, or it has been reset by the user
  useEffect(() => {
    if (
      !achievements.find(
        (achievement) => achievement.id === 1 && achievement.isUnlocked,
      )
    ) {
      unlockAchievement("New Beginnings");
      if (unlockSandMandala) {
        unlockAchievement("Sand Mandala");
        setUnlockSandMandala(false);
      }
    }
    if (
      achievements.map((achievement) => achievement.isUnlocked).length ===
      achievements.length - 1
    ) {
      //Unlocked 100% trophy
      unlockAchievement("Go Touch Grass");
      achievements.push(negativeAchievement);
      const unlockedAtList: Date[] = achievements
        .map((achievement) => achievement.isUnlocked && achievement.UnlockedAt)
        .filter((item) => item !== false)
        .map((unlockedAt) => new Date(unlockedAt));
      const oldestDate = unlockedAtList.reduce((oldest, current) =>
        oldest.getTime() < current.getTime() ? oldest : current,
      );
      const timeDiffBetweenOldestAndNewestAchievement =
        timeDiffInMilliseconds(oldestDate);
      //TODO consider moving this 67s magic number as a property of achievement
      if (timeDiffBetweenOldestAndNewestAchievement < 67 * 1000) {
        unlockAchievement(
          "Speedophile",
          timeDiffBetweenOldestAndNewestAchievement,
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievements, unlockSandMandala]);

  const value = useMemo(
    () => ({ achievements, unlockAchievement }),
    [achievements, unlockAchievement],
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
