"use client";
//WARNING: Using header-date.css
import "./header-date.css";
import { useEffect, useState } from "react";
import { achievementTrophyMapping } from "@/resources";
import { Achievement } from "@/types";
import { Badge, CountFx } from "@once-ui-system/core";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

const TrophiesDisplay = ({
  achievementsCount,
  summarize = true,
}: {
  achievementsCount: Record<Achievement["rarity"], number>;
  summarize?: boolean;
}) => {
  const { locale } = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [totalTrophyCount, setTotalTrophyCount] = useState(0);

  useEffect(() => {
    const totalTrophies = Object.values(achievementsCount).reduce(
      (a, b) => a + b,
      0,
    );
    setTotalTrophyCount(totalTrophies);
  }, [achievementsCount]);

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
        <Link href={`/${locale}/achievements`}>
          <div
            className="link-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(!isHovered)}
          >
            <div className="fallback">{totalTrophyCount} trophies</div>

            <div className={`shape-wrapper ${isHovered ? "active" : ""}`}>
              <div className="shape cyan-fill jelly">
                <svg
                  width="100%"
                  height="35"
                  viewBox="0 0 200 35"
                  preserveAspectRatio="none"
                >
                  <rect width="200" height="35" fill="#00FFFF" />
                </svg>
              </div>
              <div className="shape red-fill jelly">
                <svg
                  width="100%"
                  height="35"
                  viewBox="0 0 200 35"
                  preserveAspectRatio="none"
                >
                  <rect width="200" height="35" fill="#FF0000" />
                </svg>
              </div>
            </div>

            <div className="img-wrapper">
              <div className={`p5DateBox ${isHovered ? "hover-active" : ""}`}>
                <div className="p5DateDay">
                  <span className="p5Day" style={{ marginRight: 8 }}>
                    🏆
                  </span>
                  <CountFx
                    className="p5Day"
                    variant="body-strong-m"
                    value={totalTrophyCount}
                    speed={2000}
                    effect="simple"
                    easing="ease-out"
                  />
                </div>
                {/*<div className="p5DateMonthDay">
                  <span className="p5Month">Trophies</span>
                </div>*/}
              </div>
            </div>
          </div>
          {/*<Badge
            arrow={false}
            href={`/${locale}/achievements`}
            icon="trophy"
            textVariant="label-default-s"
          >
            {Object.values(achievementsCount).reduce((a, b) => a + b, 0)}
          </Badge>*/}
        </Link>
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
