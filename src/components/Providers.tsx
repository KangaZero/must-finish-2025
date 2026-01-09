"use client";

import {
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  ThemeProvider,
  ToastProvider,
} from "@once-ui-system/core";
import { style, dataStyle } from "../resources";
import { iconLibrary } from "../resources/icons";
import { AchievementsProvider } from "./AchievementsProvider";
import { ConsoleCommandProvider } from "./ConsoleCommandProvider";
import { LocaleProvider } from "./LocaleProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <ThemeProvider
          brand={style.brand}
          accent={style.accent}
          neutral={style.neutral}
          solid={style.solid}
          solidStyle={style.solidStyle}
          border={style.border}
          surface={style.surface}
          transition={style.transition}
          scaling={style.scaling}
        >
          <DataThemeProvider
            variant={dataStyle.variant}
            mode={dataStyle.mode}
            height={dataStyle.height}
            axis={{
              stroke: dataStyle.axis.stroke,
            }}
            tick={{
              fill: dataStyle.tick.fill,
              fontSize: dataStyle.tick.fontSize,
              line: dataStyle.tick.line,
            }}
          >
            <ToastProvider>
              <LocaleProvider>
                <AchievementsProvider>
                  <ConsoleCommandProvider>
                    <IconProvider icons={iconLibrary}>{children}</IconProvider>
                  </ConsoleCommandProvider>
                </AchievementsProvider>
              </LocaleProvider>
            </ToastProvider>
          </DataThemeProvider>
        </ThemeProvider>
      </LayoutProvider>
    </QueryClientProvider>
  );
}
