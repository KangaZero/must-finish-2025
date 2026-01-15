import { Column, Heading, Text } from "@once-ui-system/core";
import Link from "next/link";
import { type Locale, t } from "@/lib/i18n";

export default function NotFound({ lang }: { lang?: Locale }) {
  const locale = lang ? lang : "en";
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t("notFound.heading", locale)}
      </Heading>
      <Text onBackground="neutral-weak">{t("notFound.text", locale)}</Text>
      <Link href={`/${locale}`}>{t("notFound.link", locale)}</Link>
    </Column>
  );
}
