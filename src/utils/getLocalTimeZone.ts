import type { IANATimeZone } from "@/types";

const getLocalTimeZone = (): IANATimeZone => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone as IANATimeZone;
};

export { getLocalTimeZone };
