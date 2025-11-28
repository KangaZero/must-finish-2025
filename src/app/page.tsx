import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Option,
  ContextMenu,
  Icon,
  CodeBlock,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import DrawingPanel from "@/components/DrawingPanel";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <ContextMenu
      placement="bottom-start"
      dropdown={
        <Column gap="2" padding="4" minWidth={10}>
          <Option
            hasPrefix={
              <Icon size="xs" name="edit" onBackground="neutral-weak" />
            }
            label="Edit"
            value="edit"
          />
          <Option
            hasPrefix={
              <Icon size="xs" name="copy" onBackground="neutral-weak" />
            }
            label="Duplicate"
            value="duplicate"
          />
          <Line marginY="2" />
          <Option
            hasPrefix={
              <Icon size="xs" name="delete" onBackground="danger-medium" />
            }
            danger
            label="Delete"
            value="delete"
          />
        </Column>
      }
    >
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth horizontal="center" gap="m">
          <Column
            maxWidth="s"
            horizontal="center"
            align="center"
            position="relative"
          >
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="16"
                paddingBottom="32"
                paddingLeft="12"
              >
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-alpha-medium"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </RevealFx>
            )}
            <RevealFx
              translateY="4"
              fillWidth
              horizontal="center"
              paddingBottom="16"
            >
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx
              translateY="8"
              delay={0.2}
              fillWidth
              horizontal="center"
              paddingBottom="32"
            >
              <Text
                wrap="balance"
                onBackground="neutral-weak"
                variant="heading-default-xl"
              >
                {home.subline}
              </Text>
            </RevealFx>
          </Column>
          <Column horizontal="center" align="center" gap="16">
            <RevealFx
              paddingTop="12"
              delay={0.4}
              horizontal="center"
              paddingLeft="12"
            >
              <CodeBlock
                lineNumbers={true}
                copyButton={true}
                codes={[
                  {
                    code: `// To visit the About page, type this in your browser console:\nwindow.location.href = '/about';`,
                    language: "typescript",
                    startLineNumber: 1,
                    highlight: "2",
                    label: "aboutMe.ts",
                  },
                ]}
              />
              {/* <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Row>
              </Button> */}
            </RevealFx>
          </Column>
        </Column>
        {/* <RevealFx translateY="16" delay={0.6}>
            <Projects range={[1, 1]} />
          </RevealFx> */}
        {/* {
          routes["/blog"] && (
              <Column fillWidth gap="24" marginBottom="l">
                <Row fillWidth paddingRight="64">
                  <Line maxWidth={48} />
                </Row>
                <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
                  <Row flex={1} paddingLeft="l" paddingTop="24">
                    <Heading as="h2" variant="display-strong-xs" wrap="balance">
                      Latest from the blog
                    </Heading>
                  </Row>
                  <Row flex={3} paddingX="20">
                    <Posts range={[1, 2]} columns="2" />
                  </Row>
                </Row>
                <Row fillWidth paddingLeft="64" horizontal="end">
                  <Line maxWidth={48} />
                </Row>
              </Column>
          )
        } */}
        <Projects range={[2]} />
        <Column fillWidth gap="xl" marginTop="xl">
          <Column fillWidth horizontal="center" gap="m" paddingBottom="m">
            <Heading variant="display-strong-m" wrap="balance">
              Creative Drawing Panel
            </Heading>
            <Column maxWidth={40}>
              <Text
                wrap="balance"
                onBackground="neutral-weak"
                variant="body-default-l"
              >
                Unleash your creativity with our interactive drawing panel.
                Draw, add shapes, upload images, and create stunning digital
                art.
              </Text>
            </Column>
          </Column>
          <DrawingPanel />
        </Column>
        {/* <Mailchimp />  */}
      </Column>
      <ReactQueryDevtools initialIsOpen={false} />
    </ContextMenu>
  );
}
