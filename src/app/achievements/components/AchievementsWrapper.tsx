"use client";
import { useAchievements } from "@/components/AchievementsProvider";
import { AchievementCard } from "@/components/ui/achievement-card";
import { Grid } from "@once-ui-system/core";

export default function AchievementsWrapper() {
  const { achievements } = useAchievements();
  return (
    <Grid fillWidth columns="3" gap="l">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </Grid>
  );
}
