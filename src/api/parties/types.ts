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
  anecdotes: AnecdoteInterface[];
}

export type IParty = {
  id: string;
  name: string;
  isStarted: boolean;
  canStart: boolean;
  membersUid: string[];
  ownerUid: string;
  members: string[];
};
