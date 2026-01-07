import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { achievements, baseURL, person, about } from "@/resources";
import { Metadata } from "next";
import AchievementsWrapper from "./components/AchievementsWrapper";
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
    <Column maxWidth="m" paddingTop="24">
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
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {achievements.title}
      </Heading>
      <AchievementsWrapper />
    </Column>
  );
}
