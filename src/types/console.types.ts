export type Console = {
  help: () => void;
  list: () => void;
  navigate: (path: string) => void;
  clear: () => void;
  reset: () => void;
  about: () => void;
  masterLogin: (secretPassword: string) => void;
};
