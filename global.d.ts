import type { Console } from "@/types/console.types";

export {};

declare global {
  interface Window {
    portfolio: Console;
    __portfolioConsoleWelcomeLogged: boolean;
  }
}
