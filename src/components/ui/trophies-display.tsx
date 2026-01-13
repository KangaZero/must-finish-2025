"use client";
import { achievementTrophyMapping } from "@/resources";
import { Achievement } from "@/types";
import { Badge } from "@once-ui-system/core";

const TrophiesDisplay = ({
  achievementsCount,
  summarize = true,
}: {
  achievementsCount: Record<Achievement["rarity"], number>;
  summarize?: boolean;
}) => {
  const rarity: Achievement["rarity"][] = [
    "common",
    "uncommon",
    "rare",
    "legendary",
    "mythic",
  ];
  return (
    <>
      {summarize ? (
        <>
          <Badge
            arrow={false}
            href="/achievements"
            icon="trophy"
            textVariant="label-default-s"
          >
            {Object.values(achievementsCount).reduce((a, b) => a + b, 0)}
          </Badge>
        </>
      ) : (
        <>
          {rarity.map((tier) => (
            <Badge
              textVariant="label-default-xs"
              key={tier}
              icon={achievementTrophyMapping[tier]}
            >
              {achievementsCount[tier]}
            </Badge>
          ))}
        </>
      )}
    </>
  );
};

export default TrophiesDisplay;
