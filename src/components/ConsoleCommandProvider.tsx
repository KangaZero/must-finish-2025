"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useAchievements } from "./AchievementsProvider";
import { useRouter } from "next/navigation";
import { Achievement, Achievements } from "@/types";
import { achievementsList } from "@/resources";
import { LOCAL_STORAGE_KEY } from "@/resources";

type ConsoleCommandContextType = {
  registerCommands: () => void;
};

const ConsoleCommandContext = createContext<
  ConsoleCommandContextType | undefined
>(undefined);

export const ConsoleCommandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { achievements, unlockAchievement } = useAchievements();
  const router = useRouter();

  const registerCommands = useCallback(() => {
    if (typeof window === "undefined") return;

    window.portfolio = {
      help: () => {
        console.log(
          "%c🚀 Portfolio Console Commands 🚀",
          "color: #8e44ad; font-size: 1.5em; font-weight: bold;",
        );
        console.log(
          "%cAvailable commands:",
          "color: #3498db; font-size: 1.2em;",
        );
        console.table([
          ["portfolio.help()", "Display this help message"],
          ["portfolio.list()", "List all achievements"],
          ["portfolio.unlock(title)", "Unlock an achievement by title"],
          ["portfolio.navigate(path)", "Navigate to a page (e.g., '/about')"],
          ["portfolio.clear()", "Clear the console"],
          ["portfolio.reset()", "Reset all achievements"],
          ["portfolio.about()", "Learn about this portfolio"],
          [
            "portfolio.masterLogin(secretPassword)",
            "//TODO remove this\npassword: 'password123'",
          ],
        ]);
        console.log(
          "%cTip: Try unlocking an achievement using the console! 👀",
          "color: #f39c12; font-style: italic;",
        );
      },

      list: () => {
        console.log(
          "%c📜 Achievements List",
          "color: #2ecc71; font-size: 1.3em; font-weight: bold;",
        );
        console.table(
          achievements
            .filter((achievement) => achievement.isUnlocked)
            .map((a) => ({
              ID: a.id,
              Title: a.title,
              Description: a.description,
              Rarity: a.rarity,
              UnlockedAt: a.UnlockedAt || "N/A",
            })),
        );
      },

      navigate: (path: string) => {
        console.log(`%c🧭 Navigating to ${path}...`, "color: #3498db;");
        router.push(path);
      },

      clear: () => {
        console.clear();
        console.log(
          "%c🧹 Console cleared! Type portfolio.help() for available commands.",
          "color: #95a5a6;",
        );
      },

      reset: () => {
        if (typeof window !== "undefined") {
          let isAllowedToUnlockSandMandalaAchievement = false;
          const currentAchievementsLocalStorage =
            localStorage.getItem(LOCAL_STORAGE_KEY);
          if (currentAchievementsLocalStorage) {
            if (currentAchievementsLocalStorage === "e1eda57b") {
              return console.log(
                "Refresh the page! You have a pending achievement to unlock",
              );
            }
            const parsedAchievementsLocalStorage = JSON.parse(
              currentAchievementsLocalStorage,
            ) as Achievement[];
            const currentUnlockedAchievements =
              parsedAchievementsLocalStorage.map((obj) => obj.isUnlocked);
            const noOfAchievementsRequiredToUnlockSandMandala =
              achievementsList.find(
                (achievement) => achievement.title === "Sand Mandala",
              )!.noOfAchievementsRequiredToUnlock;
            if (
              currentUnlockedAchievements.length >=
              noOfAchievementsRequiredToUnlockSandMandala!
            ) {
              console.log(
                "You who fears nothing, you have unlocked the secret achievement!",
                "color: #3498db; font-size: 1.2em; font-weight: bold; font-style: italic;",
              );
              isAllowedToUnlockSandMandalaAchievement = true;
            }
          }
          if (isAllowedToUnlockSandMandalaAchievement) {
            localStorage.setItem(LOCAL_STORAGE_KEY, "e1eda57b");
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
          console.log(
            "%c🔄 Achievements reset! Refresh the page to see changes.",
            "color: #e67e22; font-weight: bold;",
          );
        }
      },

      about: () => {
        console.log(
          "%c💼 About This Portfolio",
          "color: #9b59b6; font-size: 1.3em; font-weight: bold;",
        );
        console.log(
          "%cThis is an interactive portfolio with hidden achievements!",
          "color: #34495e;",
        );
        console.log(
          "%cExplore the site, use console commands, and unlock them all! 🎮",
          "color: #34495e;",
        );
        console.log(
          "%cCreated with human intelligence using Next.js and Once UI",
          "color: #e74c3c; font-style: italic;",
        );
      },
      masterLogin: (secretPassword: string) => {
        const correctPassword = "password123";
        if (secretPassword !== correctPassword) {
          console.log(
            "%cIncorrect password. Try again!",
            "color: #e74c3c; font-weight: bold;",
          );
        } else {
          console.log(
            "%cMaster login successful! 🎉",
            "color: #2ecc71; font-weight: bold;",
          );
          console.log(
            `
            _  _  _ _ _ _  _                                                       _   _       _          _______       _
           (_)(_)(_|_) | || |                                                     (_) (_)     | |        (_______)     (_)       _
            _  _  _ _| | || |  _ ___  ____  ____  _____ ____     _____ _   _  ____ _   _  ____| |  _      _  _  _ _____ _  ___ _| |_ _____  ____
           | || || | | | || |_/ ) _ \|    \|    \| ___ |  _ \   (___  ) | | |/ ___) | | |/ ___) |_/ )    | ||_|| | ___ | |/___|_   _) ___ |/ ___)
           | || || | | | ||  _ ( |_| | | | | | | | ____| | | |   / __/| |_| | |   | |_| ( (___|  _ ( _   | |   | | ____| |___ | | |_| ____| |_
            \_____/|_|\_)_)_| \_)___/|_|_|_|_|_|_|_____)_| |_|  (_____)____/|_|   |____/ \____)_| \_| )  |_|   |_|_____)_(___/   \__)_____)_(_)
                                                                                                    |/
            `,
          );
          unlockAchievement("Woah! Hacker");
        }
      },
    };

    // Welcome message
    console.log(
      "%c🎉 Welcome to the Portfolio Console! 🎉",
      "color: #8e44ad; font-size: 1.5em; font-weight: bold;",
    );
    console.log(
      "%cType portfolio.help() to see available commands.",
      "color: #3498db; font-size: 1.1em;",
    );
  }, [achievements, router, unlockAchievement]);

  useEffect(() => {
    registerCommands();
  }, [achievements, registerCommands]);

  const value = useMemo(() => ({ registerCommands }), [registerCommands]);

  return (
    <ConsoleCommandContext.Provider value={value}>
      {children}
    </ConsoleCommandContext.Provider>
  );
};

export const useConsole = () => {
  const context = useContext(ConsoleCommandContext);
  if (!context)
    throw new Error("useConsole must be used within ConsoleCommandProvider");
  return context;
};
