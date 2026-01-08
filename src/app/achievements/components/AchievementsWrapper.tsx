"use client";
import "./AchievementsWrapper.css";
import { useAchievements } from "@/components/AchievementsProvider";
import { gsap } from "gsap";
import { Flip } from "gsap/all";
import { AchievementCard } from "@/components/ui/achievement-card";
import { Grid, Flex, Row, Tag } from "@once-ui-system/core";
import SearchBar from "./SearchBar";
import { useState, useRef } from "react";
import type { PointerEvent } from "react";
import type { Achievement } from "@/types";

export default function AchievementsWrapper() {
  const { achievements, achievementsCount } = useAchievements();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<
    Achievement["rarity"][]
  >([]);
  const achievementsGridRef = useRef<HTMLDivElement>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.title
        .toLowerCase()
        .includes(currentSearchTerm.toLowerCase().trim()) &&
      (currentSelectedFilters.length === 0 ||
        currentSelectedFilters.includes(achievement.rarity)),
  );
  const searchResultDescription = filteredAchievements
    ? `${filteredAchievements.length} result(s) found.`
    : "No results found.";

  const removeFilter = (
    filter: Achievement["rarity"],
    e: PointerEvent<HTMLDivElement>,
  ) => {
    const element = e.currentTarget;

    gsap.to(element, {
      duration: 0.15,
      scale: 0,
      opacity: 0,
      ease: "power1.inOut",
      onComplete: () =>
        setCurrentSelectedFilters(
          currentSelectedFilters.filter((f) => f !== filter),
        ),
    });
    // gsap.registerPlugin(Flip);
    // const state = Flip.getState(element)
    // element.classList.add("")
  };

  return (
    <Flex maxWidth="l" direction="column" gap="m" align="center">
      <Row s={{ width: "100%" }} m={{ width: "80%" }}>
        <SearchBar
          currentSearchTerm={currentSearchTerm}
          setCurrentSearchTerm={setCurrentSearchTerm}
          searchResultDescription={searchResultDescription}
          isFilterDropdownOpen={isFilterDropdownOpen}
          setIsFilterDropdownOpen={setIsFilterDropdownOpen}
          currentSelectedFilters={currentSelectedFilters}
          setCurrentSelectedFilters={setCurrentSelectedFilters}
          achievementsCount={achievementsCount}
        />
      </Row>
      {currentSelectedFilters.length > 0 && (
        <Row>
          {currentSelectedFilters.map((filter) => (
            <Tag
              tabIndex={0}
              onPointerDown={(e) => removeFilter(filter, e)}
              className="achievement-filter-tag"
              size="m"
              label={filter}
              key={filter}
              prefixIcon="close"
              suffixIcon="trophy"
            />
          ))}
        </Row>
      )}
      <Grid
        ref={achievementsGridRef}
        fillWidth
        fillHeight
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
