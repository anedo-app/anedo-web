interface useEnvReturn {
  isDev: boolean;
  isProd: boolean;
  appVersion: string;
}

const useEnv = (): useEnvReturn => {
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  const appVersion = __APP_VERSION__;

  return {isDev, isProd, appVersion};
};

export default useEnv;
