import {IUser} from "@/hooks/useUser";

export interface AnecdoteInterface {
  id: string;
  type: "true" | "false";
  value: string;
}

export interface IAnecdoteToGuess extends AnecdoteInterface {
  type: never;
}

export interface PartyMemberInterface {
  uid: string;
  isReady: boolean;
  isHost: boolean;
  guessed: boolean;
  nextGuessTime?: number;
}

export type FullPartyUserType = PartyMemberInterface & IUser;

export type IParty = {
  id: string;
  name: string;
  isStarted: boolean;
  isFinished: boolean;
  membersUid: string[];
  ownerUid: string;
};
