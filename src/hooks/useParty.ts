import useUser from "./useUser";
import lodashSet from "lodash/set";
import lodashGet from "lodash/get";
import {create} from "zustand";
import {Unsubscribe} from "firebase/firestore";
import {throwIfUndefined} from "@/types/utils";
import {
  listenCurrentUser,
  listenParty,
  listenPartyMembers,
} from "@/api/parties";
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
  resetPartyData: () => void;
  subscribeMembers: () => Unsubscribe;
  subscribeParty: () => Unsubscribe;
  subscribeCurrentUser: () => Unsubscribe;
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
  setPartyData: (key, value) => {
    if (key === "") return set({...(value as Partial<PartyStoreState>)});
    set({...lodashSet(get(), key, value)});
  },
  getPartyData: <T>(key: Paths<PartyStoreState>) => lodashGet(get(), key) as T,
  resetPartyData: () =>
    set({party: null, userInfos: null, anecdotes: null, members: null}),
  subscribeMembers: () => {
    const party = get().party;
    throwIfUndefined<IParty>(party);
    return listenPartyMembers(party.id, (members) => {
      set({members});
    });
  },
  subscribeParty: () => {
    const party = get().party;
    throwIfUndefined<IParty>(party);
    return listenParty(party.id, (party) => {
      set({party});
    });
  },
  subscribeCurrentUser: () => {
    const party = get().party;
    throwIfUndefined<IParty>(party);
    return listenCurrentUser(party.id, (userInfos) => {
      set({userInfos});
    });
  },
}));

export default useParty;
