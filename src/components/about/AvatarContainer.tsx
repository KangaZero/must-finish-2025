"use client";
import Image from "next/image";
import "./AvatarContainer.css";
import { person } from "@/resources";
import { useTheme } from "@once-ui-system/core";

const AvatarContainer = () => {
  const { theme } = useTheme();
  return (
    <div className="avatar-wrapper">
      <div className="avatar-polygon-container"></div>
      <Image
        className={theme === "dark" ? "avatar-img-dark" : "avatar-img"}
        preload
        width={150}
        height={300}
        src={person.avatar}
        alt={person.firstName}
      />
    </div>
  );
};

export { AvatarContainer };
