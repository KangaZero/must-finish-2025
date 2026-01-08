import { Achievement } from "@/types";
import { achievementTrophyMapping } from "@/resources";
import {
  Line,
  IconButton,
  Card,
  Row,
  Column,
  Avatar,
  Text,
} from "@once-ui-system/core";
import { PointerEvent } from "react";

const rarityColors = {
  common: "var(--border-color)",
  uncommon: "var(--primary-glow)",
  rare: "linear-gradient(90deg, #7c3aed 0%, #c65385 100%)",
  legendary: "linear-gradient(90deg, gold 0%, orange 100%)",
  mythic: "linear-gradient(90deg, #00c3ff 0%, #ff00cc 100%)",
};

export const AchievementCard = ({
  achievement,
}: {
  achievement: Achievement;
}) => {
  const { title, description, rarity, isUnlocked, image } = achievement;

  return (
    <Row maxWidth={24}>
      <Card
        radius="l-4"
        direction="column"
        border="neutral-alpha-medium"
        style={{
          background: isUnlocked
            ? rarityColors[rarity]
            : "var(--background-dark)",
          color: isUnlocked ? "var(--white)" : "var(--border-color)",
          boxShadow: isUnlocked
            ? "0 4px 24px var(--primary-glow)"
            : "0 2px 8px var(--border-color)",
          opacity: isUnlocked ? 1 : 0.6,
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        }}
      >
        <Row fillWidth paddingX="20" paddingY="12" gap="8" vertical="center">
          {image ? (
            <Avatar size="xs" src={image.src} />
          ) : (
            <Text style={{ fontSize: "2.5em" }}>
              {achievementTrophyMapping[rarity]}
            </Text>
          )}
          <Text variant="label-default-s" style={{ fontWeight: 700 }}>
            {title}
          </Text>
        </Row>
        <Column fillWidth paddingX="20" paddingY="24" gap="8">
          <Text variant="body-default-s">{description}</Text>
          <Text onBackground="neutral-weak" variant="body-default-xs">
            {isUnlocked
              ? `Unlocked${achievement?.unlockedAt ? ` on ${new Date(achievement.unlockedAt).toLocaleDateString()}` : ""}`
              : "Locked"}
            {" · "}
            <span style={{ textTransform: "capitalize" }}>{rarity}</span>
          </Text>
        </Column>
        <Line background="neutral-alpha-medium" />
        <Row
          gap="8"
          vertical="center"
          horizontal="center"
          textVariant="label-default-s"
          onBackground="neutral-medium"
          paddingY="2"
        >
          <IconButton
            tooltip="Share Achievement"
            icon="share"
            variant="ghost"
            onPointerDown={(e: PointerEvent<HTMLButtonElement>) => {
              console.trace("pointerdownevent", e);
              e.stopPropagation();
              // Welcome message
              console.log(
                "%c🎉 Welcome to the Portfolio Console! 🎉",
                "color: #8e44ad; font-size: 1.5em; font-weight: bold;",
              );
              console.log(
                "%cType portfolio.help() to see available commands.",
                "color: #3498db; font-size: 1.1em;",
              );
            }}
          />
        </Row>
      </Card>
    </Row>
  );
};
