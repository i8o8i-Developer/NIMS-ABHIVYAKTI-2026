/**
 * Title Case Logging Wrapper For Frontend.
 */

export const Logger = {
  info: (message: string, context?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.log(`[Info] ${message}`, context || "");
    }
  },
  warn: (message: string, context?: Record<string, any>) => {
    console.warn(`[Warning] ${message}`, context || "");
  },
  error: (message: string, error?: any) => {
    console.error(`[Error] ${message}`, error || "");
  },
};
