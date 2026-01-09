"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Fade,
  Flex,
  Line,
  Row,
  ToggleButton,
  Animation,
  IconButton,
  HoverCard,
  Avatar,
  Column,
  Text,
  StyleOverlay,
  useTheme,
} from "@once-ui-system/core";
import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
  MapCircle,
  MapLocateControl,
} from "@/components/ui/map";

import {
  routes,
  display,
  person,
  headerHoverCardDetails,
  about,
  blog,
  work,
  gallery,
  achievements,
} from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";
import React from "react";
import { CustomHeadingNav } from "./CustomHeadingNav";
import { useAchievements } from "./AchievementsProvider";
import TrophiesDisplay from "./ui/trophies-display";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const hoverCardDescriptionRef = useRef<HTMLDivElement>(null);
  const {
    // achievements: achievementsFromProvider,
    unlockAchievement,
    achievementsCount,
  } = useAchievements();
  const pathname = usePathname() ?? "";
  const { theme } = useTheme();
  useEffect(() => {
    const lightThemeBtnElement = document.querySelector(
      '[aria-label="Light theme"]',
    );
    const darkThemeBtnElement = document.querySelector(
      '[aria-label="Dark theme"]',
    );
    const systemThemeBtnElement = document.querySelector(
      '[aria-label="System theme"]',
    );

    const toUnlockOrNotEosAchievement = (mode: "light" | "dark" | "system") => {
      console.trace("theme from useTheme", theme);
      console.trace("mode", mode);
      const documentTheme = document.documentElement.getAttribute("data-theme");
      console.trace("document theme", documentTheme);
      if (theme === mode) return;
      if (mode !== documentTheme) unlockAchievement("Eos");
    };

    lightThemeBtnElement?.addEventListener("pointerdown", () =>
      toUnlockOrNotEosAchievement("light"),
    );
    darkThemeBtnElement?.addEventListener("pointerdown", () =>
      toUnlockOrNotEosAchievement("dark"),
    );
    systemThemeBtnElement?.addEventListener("pointerdown", () =>
      toUnlockOrNotEosAchievement("system"),
    );
    //Clean up event listeners on unmount
    return () => {
      lightThemeBtnElement?.removeEventListener("pointerdown", () =>
        toUnlockOrNotEosAchievement("light"),
      );
      darkThemeBtnElement?.removeEventListener("pointerdown", () =>
        toUnlockOrNotEosAchievement("dark"),
      );
      systemThemeBtnElement?.removeEventListener("pointerdown", () =>
        toUnlockOrNotEosAchievement("system"),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hideMenu, setHideMenu] = useState(false);
  useEffect(() => {
    if (!hoverCardDescriptionRef.current) return;
    function cycleText(
      ref: React.RefObject<HTMLDivElement>,
      texts: string[],
      duration = 3,
      delay = 2,
    ) {
      let index = 0;
      gsap.registerPlugin(ScrollTrigger, TextPlugin);
      const animate = () => {
        gsap.to(ref.current, {
          text: texts[index],
          duration,
          delay,
          onComplete: () => {
            index = (index + 1) % texts.length;
            animate();
          },
        });
      };
      animate();
    }
    cycleText(
      hoverCardDescriptionRef as React.RefObject<HTMLDivElement>,
      headerHoverCardDetails,
    );
  }, []);
  return (
    <>
      <Fade
        s={{ hide: true }}
        fillWidth
        position="fixed"
        height="80"
        zIndex={9}
      />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && (
            <Row s={{ hide: true }}>
              <HoverCard
                tabIndex={0}
                placement="bottom"
                trigger={
                  <span
                    ref={hoverCardDescriptionRef}
                    onTouchStart={() => {
                      unlockAchievement("Snoopy Detective");
                    }}
                    onMouseEnter={() => {
                      unlockAchievement("Snoopy Detective");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {headerHoverCardDetails[0]}
                  </span>
                }
              >
                <Column
                  padding="20"
                  gap="20"
                  radius="l"
                  minHeight={25}
                  minWidth={25}
                  maxWidth={100}
                  background="page"
                  border="neutral-alpha-weak"
                >
                  <Row gap="20" fillWidth vertical="center">
                    <Avatar
                      size={3}
                      src="/trademarks/accenture-logo.svg"
                      aria-description="Accenture logo"
                    />
                    <Column gap="4">
                      <Text variant="heading-strong-m">Accenture Japan</Text>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                        onClick={() => {
                          unlockAchievement("Test");
                        }}
                      >
                        Software Engineer
                      </Text>
                    </Column>
                  </Row>

                  <Map
                    className="border-4 rounded-sm"
                    zoom={12}
                    center={person.locationCoordinates}
                    style={{ height: "200px", width: "100%" }}
                  >
                    <MapZoomControl className="z-20 top-auto right-1 bottom-1 left-auto" />
                    <MapLocateControl className="z-20 top-1" />
                    <MapTileLayer
                      zIndex={1}
                      darkUrl="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}"
                    />
                    <MapCircle
                      center={person.locationCoordinates}
                      radius={200}
                    />
                    <MapMarker
                      key={person.location.split("/")[1]}
                      position={person.locationCoordinates}
                      icon={<span className="text-sm">🦑</span>}
                    >
                      <MapPopup>Hey this is where I work at!</MapPopup>
                    </MapMarker>
                  </Map>
                </Column>
              </HoverCard>
            </Row>
          )}
          {/* {display.location && <Row s={{ hide: true }}>{person.location}</Row>} */}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row
              gap="4"
              vertical="center"
              textVariant="body-default-s"
              suppressHydrationWarning
            >
              {routes["/"] && (
                <>
                  <Row s={{ hide: true }}>
                    <Animation
                      blur={8}
                      triggerType="hover"
                      center
                      duration={400}
                      trigger={
                        <ToggleButton
                          prefixIcon="home"
                          href="/"
                          selected={pathname === "/"}
                        />
                      }
                    >
                      <ToggleButton
                        prefixIcon="home"
                        href="/"
                        selected={pathname === "/"}
                      />
                    </Animation>
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="home"
                      href="/"
                      selected={pathname === "/"}
                    />
                  </Row>
                </>
              )}
              <Row
                className={`${styles.menuItems} ${hideMenu ? styles.menuHidden : styles.menuVisible}`}
              >
                <Line
                  background="neutral-alpha-medium"
                  vert
                  maxHeight="24"
                  s={{ hide: true }}
                />
                {routes["/about"] && (
                  <>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon="person"
                        href="/about"
                        label={about.label}
                        selected={pathname === "/about"}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon="person"
                        href="/about"
                        selected={pathname === "/about"}
                      />
                    </Row>
                  </>
                )}
                {routes["/work"] && (
                  <>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon="grid"
                        href="/work"
                        label={work.label}
                        selected={pathname.startsWith("/work")}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon="grid"
                        href="/work"
                        selected={pathname.startsWith("/work")}
                      />
                    </Row>
                  </>
                )}
                {routes["/blog"] && (
                  <>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon="book"
                        href="/blog"
                        label={blog.label}
                        selected={pathname.startsWith("/blog")}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon="book"
                        href="/blog"
                        selected={pathname.startsWith("/blog")}
                      />
                    </Row>
                  </>
                )}
                {routes["/achievements"] && (
                  <>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon="trophy"
                        href="/achievements"
                        label={achievements.label}
                        selected={pathname.startsWith("/achievements")}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon="trophy"
                        href="/achievements"
                        selected={pathname.startsWith("/achievements")}
                      />
                    </Row>
                  </>
                )}
                {routes["/gallery"] && (
                  <>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon="gallery"
                        href="/gallery"
                        label={gallery.label}
                        selected={pathname.startsWith("/gallery")}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon="gallery"
                        href="/gallery"
                        selected={pathname.startsWith("/gallery")}
                      />
                    </Row>
                  </>
                )}
              </Row>
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <StyleOverlay minHeight={25} overflowY="auto">
                <IconButton
                  tooltip="Open style settings"
                  icon="sun"
                  variant="ghost"
                  //NOTE: full menu needs to be shown else the screen size is too small to access the style settings
                  onPointerDown={() => {
                    setHideMenu(false);
                  }}
                />
              </StyleOverlay>
              {display.menuAccordion && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ToggleButton
                    prefixIcon={hideMenu ? "chevronRight" : "chevronLeft"}
                    onPointerDown={() => setHideMenu(!hideMenu)}
                    aria-label="Toggle menu"
                  />
                </>
              )}
            </Row>
          </Row>
        </Row>

        <Flex fillWidth horizontal="end" vertical="center">
          <Flex s={{ hide: true }}>
            {display.trophies && (
              <>
                <TrophiesDisplay achievementsCount={achievementsCount} />
                {/*<Column>
                             Completion Rate:{" "}
                             {achievementsFromProvider.reduce(
                               (a, b) => a + (b.isUnlocked ? 1 : 0),
                               0,
                             )}
                             /{achievementsFromProvider.length}
                           </Column>*/}
              </>
            )}
          </Flex>
          <Flex
            paddingRight="12"
            paddingLeft="24"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
      <CustomHeadingNav />
    </>
  );
};
