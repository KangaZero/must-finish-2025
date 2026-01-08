"use client";
import { useAchievements } from "@/components/AchievementsProvider";
import { AchievementCard } from "@/components/ui/achievement-card";
import { Grid, Flex } from "@once-ui-system/core";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function AchievementsWrapper() {
  const { achievements } = useAchievements();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const filteredAchievements = achievements.filter((achievement) =>
    achievement.title
      .toLowerCase()
      .includes(currentSearchTerm.toLowerCase().trim()),
  );
  const searchResultDescription = filteredAchievements
    ? `${filteredAchievements.length} result(s) found.`
    : "No results found.";

  return (
    <Flex maxWidth="l" direction="column" gap="l" align="center">
      <SearchBar
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
        searchResultDescription={searchResultDescription}
      />
      <Grid
        fillWidth
        columns="3"
        gap="l"
        m={{ columns: "2" }}
        s={{ columns: "1" }}
      >
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </Grid>
    </Flex>
  );
}
