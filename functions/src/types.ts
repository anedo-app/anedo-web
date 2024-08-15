export interface AnecdoteToGuessInterface {
  guesserUid: string;
  anecdotesOwnerUid: string;
  anecdotes: Omit<AnecdoteInterface, "type">;
}
export interface AnecdoteInterface {
  id: string;
  type: "true" | "false";
  value: string;
}

export interface IAnecdoteToGuess extends AnecdoteInterface {
  type: never;
}

export interface PartyAnecdoteInterface {
  uid: string;
  anecdotes?: AnecdoteInterface[];
}

export type IParty = {
  id: string;
  name: string;
  isStarted: boolean;
  membersUid: string[];
  ownerUid: string;
};
