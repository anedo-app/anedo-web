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
  startedPlaying: boolean;
  busted?: boolean;
  nextGuessTime?: number;
  guessedAt?: number;
  bustedAt?: number;
}

export type FullPartyUserType = PartyMemberInterface & IUser;

export type IParty = {
  id: string;
  name: string;
  state: PartyStateEnum;
  membersUid: string[];
  ownerUid: string;
};

export enum PartyStateEnum {
  WAITING = "waiting",
  PLAYING = "playing",
  FINISHED = "finished",
}
