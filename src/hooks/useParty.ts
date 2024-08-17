import useUser from "./useUser";
import lodashSet from "lodash/set";
import lodashGet from "lodash/get";
import {create} from "zustand";
import {
  AnecdoteInterface,
  FullPartyUserType,
  IAnecdoteToGuess,
  IParty,
  PartyMemberInterface,
} from "@/api/parties/types";

type Paths<T> = T extends object
  ? {[K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`}[keyof T]
  : never;

type PartyStoreState = {
  party: IParty | null;
  userInfos: PartyMemberInterface | null;
  anecdotes: AnecdoteInterface[] | null;
  anecdotesToGuess: IAnecdoteToGuess[] | null;
  members: FullPartyUserType[] | null;
};

type PartyStore = PartyStoreState & {
  computed: {
    isOwner: () => boolean; //read-only
  };
  setPartyData: (key: Paths<PartyStoreState>, value: unknown) => void;
  getPartyData: <T>(key: Paths<PartyStoreState>) => T;
};

const useParty = create<PartyStore>((set, get) => ({
  party: null,
  userInfos: null,
  anecdotes: null,
  anecdotesToGuess: null,
  members: null,
  computed: {
    isOwner: () => get().party?.ownerUid === useUser.getState().user?.uid,
  },
  setPartyData: (key, value) => set({...lodashSet(get(), key, value)}),
  getPartyData: <T>(key: Paths<PartyStoreState>) => lodashGet(get(), key) as T,
}));

export default useParty;
