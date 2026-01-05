"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useAchievements } from "../AchievementsProvider";
import { Sparkles } from "lucide-react";
import styles from "./achievement-toast.module.scss";
import {
  HoloFx,
  IconButton,
  ShineFx,
  ToggleButton,
} from "@once-ui-system/core/components";
import StarBorder from "../StarBorder";

export interface AchievementToastProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

// Convert kebab-case to camelCase for CSS modules
const positionClassMap = {
  "top-left": styles.topLeft,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-right": styles.bottomRight,
};

export const AchievementToast: React.FC<AchievementToastProps> = ({
  position,
}) => {
  const { currentAchievementUnlocked, setCurrentAchievementUnlocked } =
    useAchievements();

  // useEffect(() => {
  //   if (!currentAchievementUnlocked) return;

  //   const timer = setTimeout(() => {
  //     setCurrentAchievementUnlocked(null);
  //   }, 6000);

  //   return () => clearTimeout(timer);
  // }, [currentAchievementUnlocked, setCurrentAchievementUnlocked]);

  if (!currentAchievementUnlocked) {
    //TODO replace this when test is done
    setCurrentAchievementUnlocked({
      id: 6,
      title: "Test",
      description: "Test achievement for development purposes",
      rarity: "uncommon",
      isUnlocked: false,
    });
    return null;
  }
  const { title, image, description, rarity, isUnlocked } =
    currentAchievementUnlocked;

  const unlockedAt =
    isUnlocked && "UnlockedAt" in currentAchievementUnlocked
      ? new Date(currentAchievementUnlocked.UnlockedAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        )
      : null;

  const toastClasses = [
    styles.toast,
    styles[rarity],
    positionClassMap[position],
  ].join(" ");

  return (
    <StarBorder as="div">
      <div className={toastClasses}>
        <div className={styles.cancelButton}>
          <IconButton
            onClick={() => setCurrentAchievementUnlocked(null)}
            tooltip="Close"
            icon="outlineCancel"
            variant="primary"
            className={styles.cancelButton}
          />
        </div>
        <HoloFx
          border="brand-alpha-weak"
          aspectRatio={1}
          radius="l"
          shine={{
            opacity: 30,
            blending: "color-dodge",
          }}
          burn={{
            opacity: 30,
            blending: "color-dodge",
          }}
          texture={{
            opacity: 10,
            image: "/images/textures/foil.jpg",
            blending: "color-dodge",
          }}
        >
          {/* Image */}
          {image ? (
            <div className={styles.imageContainer}>
              <Image src={image.src} alt={image.alt} width={64} height={64} />
            </div>
          ) : (
            <div className={styles.placeholder}>
              <Sparkles />
            </div>
          )}
        </HoloFx>
        {/* Content */}
        <div className={styles.content}>
          {/* Header with badge */}
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <ShineFx
              speed={5}
              variant="heading-default-xs"
              className={styles.badge}
            >
              {rarity}
              {/*<span className={styles.badge}>{rarity}</span>*/}
            </ShineFx>
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Metadata */}
          {unlockedAt && (
            <div className={styles.metadata}>
              <Sparkles />
              <span>Unlocked: {unlockedAt}</span>
            </div>
          )}
        </div>
      </div>
    </StarBorder>
  );
};
