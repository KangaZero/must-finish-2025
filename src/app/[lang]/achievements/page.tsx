import { Flex, Meta, Schema } from "@once-ui-system/core";
import { achievements, baseURL, person, about } from "@/resources";
import { Metadata } from "next";
import AchievementsWrapper from "./components/AchievementsWrapper";
import AchievementsTitle from "./components/AchievementsTitle";
export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: achievements.title,
    description: achievements.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(achievements.title)}`,
    path: achievements.path,
  });
}

export default function Achievements() {
  return (
    <Flex direction="column" maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={achievements.path}
        title={achievements.title}
        description={achievements.description}
        image={`/api/og/generate?title=${encodeURIComponent(achievements.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <AchievementsTitle />
      <AchievementsWrapper />
    </Flex>
  );
}
