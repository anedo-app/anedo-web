interface useEnvReturn {
  isDev: boolean;
  isProd: boolean;
  appVersion: string;
}

const useEnv = (): useEnvReturn => {
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  const appVersion = import.meta.env.VITE_APP_VERSION;

  return {isDev, isProd, appVersion};
};

export default useEnv;
