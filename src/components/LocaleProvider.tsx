"use client";

import {
  ReactNode,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import { getLocaleCookieFromClient } from "@/utils/getLocaleCookie";
import { setLocaleCookie } from "@/utils/setLocaleCookie";
import { t, TranslationKey } from "@/lib/i18n";

type OmitSecondParamFromFunction<F> = F extends (
  arg1: infer A,
  arg2: infer B,
) => infer R
  ? (arg1: A) => R
  : never;

type LocaleContextType = {
  locale: "en" | "ja";
  setLocaleCookieAndState: (locale: "en" | "ja") => void;
  translate: OmitSecondParamFromFunction<typeof t>;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<"en" | "ja">("en");

  useEffect(() => {
    const savedLocale = getLocaleCookieFromClient();

    if (!savedLocale) return setLocaleCookie("en");

    setLocale(savedLocale);
  }, []);

  const setLocaleCookieAndState = (newLocale: "en" | "ja") => {
    setLocaleCookie(newLocale);
    setLocale(newLocale);
  };

  const translate = (key: TranslationKey) => {
    return t(key, locale);
  };

  return (
    <LocaleContext.Provider
      value={{ locale, setLocaleCookieAndState, translate }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context)
    throw new Error("useLocale must be used within a LocaleProvider");
  return context;
};
