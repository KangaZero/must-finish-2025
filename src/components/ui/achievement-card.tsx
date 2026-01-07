import { Achievement } from "@/types";
import Image from "next/image";
import { achievementTrophyMapping } from "@/resources";

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
    <div
      key={achievement.id}
      className="achievement-card"
      style={{
        border: `2px solid ${isUnlocked ? "var(--primary-border)" : "var(--border-color)"}`,
        background: isUnlocked
          ? rarityColors[rarity]
          : "var(--background-dark)",
        color: isUnlocked ? "var(--white)" : "var(--border-color)",
        boxShadow: isUnlocked
          ? "0 4px 24px var(--primary-glow)"
          : "0 2px 8px var(--border-color)",
        opacity: isUnlocked ? 1 : 0.6,
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        borderRadius: "16px",
        padding: "1.5em",
        display: "flex",
        alignItems: "center",
        gap: "1em",
        minWidth: "320px",
        maxWidth: "400px",
      }}
    >
      <div style={{ fontSize: "2.5em" }}>
        {image ? (
          <Image
            src={image}
            alt="Achievement Icon"
            style={{ width: 48, height: 48 }}
          />
        ) : (
          achievementTrophyMapping[rarity]
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: "0.25em" }}
        >
          {title}
        </div>
        <div style={{ fontSize: "1em", opacity: 0.85 }}>{description}</div>
        <div style={{ fontSize: "0.85em", marginTop: "0.5em", opacity: 0.7 }}>
          {isUnlocked
            ? `Unlocked${achievement?.unlockedAt ? ` on ${new Date(achievement?.unlockedAt).toLocaleDateString()}` : ""}`
            : "Locked"}
          {" · "}
          <span style={{ textTransform: "capitalize" }}>{rarity}</span>
        </div>
      </div>
    </div>
  );
};
