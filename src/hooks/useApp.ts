import lodashSet from "lodash/set";
import {create} from "zustand";
import {IParty} from "@/api/parties/types";
import {persist} from "zustand/middleware";

type Paths<T> = T extends object
  ? {[K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`}[keyof T]
  : never;

type AppStoreState = {
  parties: IParty[];
};

type AppStore = AppStoreState & {
  setAppData: (key: Paths<AppStoreState>, value: unknown) => void;
};

const useApp = create(
  persist<AppStore>(
    (set, get) => ({
      parties: [],
      setAppData: (key, value) => set(lodashSet(get(), key, value)),
    }),
    {
      name: "anedo-web-storage",
    },
  ),
);

export default useApp;
