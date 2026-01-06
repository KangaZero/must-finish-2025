"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  achievementsList,
  negativeAchievement,
  LOCAL_STORAGE_KEY,
} from "@/resources/content";
import type { Achievement } from "@/types/content.types";

type AchievementsContextType = {
  achievements: Achievement[];
  unlockAchievement: (
    ...args:
      | [title: "Speedophile", split: number]
      | [title: Exclude<Achievement["title"], "Speedophile">]
  ) => void;
  currentAchievementUnlocked: null | Achievement;
  setCurrentAchievementUnlocked: React.Dispatch<
    React.SetStateAction<null | Achievement>
  >;
};

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined,
);

export const AchievementsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const LOCAL_STORAGE_ACHIEVEMENTS: string | "e1eda57b" | null =
    typeof window !== undefined
      ? localStorage?.getItem(LOCAL_STORAGE_KEY)
      : null;
  const [achievements, setAchievements] = useState<Achievement[]>(
    JSON.parse(
      LOCAL_STORAGE_ACHIEVEMENTS && LOCAL_STORAGE_ACHIEVEMENTS !== "e1eda57b"
        ? LOCAL_STORAGE_ACHIEVEMENTS
        : JSON.stringify(achievementsList),
    ),
  );
  const [currentAchievementUnlocked, setCurrentAchievementUnlocked] =
    useState<null | Achievement>(null);
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
      setCurrentAchievementUnlocked(
        achievements.find((a) => a.title === title) || null,
      );

      //Next achievement-toast component will handle the rest
      // addToast({
      //   variant: "success",
      //   message: `Achievement "${title}" unlocked!`,
      //   action: (
      //     <Link href="/achievements">
      //       <Button size="s">View Achievements</Button>
      //     </Link>
      //   ),
      // });
    },
    [achievements],
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
    () => ({
      achievements,
      unlockAchievement,
      currentAchievementUnlocked,
      setCurrentAchievementUnlocked,
    }),
    [achievements, currentAchievementUnlocked, unlockAchievement],
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
