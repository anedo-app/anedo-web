import {IUser} from "@/hooks/useUser";

export interface AnecdoteInterface {
  id: string;
  type: "true" | "false";
  value: string;
}
export interface PartyMemberInterface {
  uid: string;
  isReady: boolean;
  isHost: boolean;
  guessed: boolean;
}

export type FullPartyUserType = PartyMemberInterface & IUser;

export type IParty = {
  id: string;
  name: string;
  isStarted: boolean;
  canStart: boolean;
  membersUid: string[];
  ownerUid: string;
};
