interface IConsole {
  warn: (message?: unknown, ...optionalParams: unknown[]) => void;
  error: (message?: unknown, ...optionalParams: unknown[]) => void;
  info: (message?: unknown, ...optionalParams: unknown[]) => void;
  debug: (message?: unknown, ...optionalParams: unknown[]) => void;
}

export const useLog: IConsole = {
  warn: (message?: unknown, ...optionalParams: unknown[]) => {
    console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️ -> ", message, " ", ...optionalParams);
  },
  error: (message?: unknown, ...optionalParams: unknown[]) => {
    console.log("🚨🚨🚨🚨🚨🚨🚨 -> ", message, " ", ...optionalParams);
  },
  info: (message?: unknown, ...optionalParams: unknown[]) => {
    console.log("🚀🚀🚀🚀🚀🚀🚀 -> ", message, " ", ...optionalParams);
  },
  debug: (message?: unknown, ...optionalParams: unknown[]) => {
    console.log("🐛🐛🐛🐛🐛🐛🐛 -> ", message, " ", ...optionalParams);
  },
};
