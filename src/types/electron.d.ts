export {};

declare global {
  interface Window {
    uptDesktop?: {
      openExternal?: (url: string) => void;
      setWindowMode?: (mode: 'login' | 'authenticated') => void;
    };
  }
}