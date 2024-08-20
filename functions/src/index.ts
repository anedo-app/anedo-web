import * as admin from "firebase-admin";

import {
  AnecdoteToGuessInterface,
  IAnecdoteToGuess,
  PartyAnecdoteInterface,
} from "./types";
import {onRequest} from "firebase-functions/v2/https";

admin.initializeApp();

const randomInt = (k: number) => Math.floor((k + 1) * Math.random());

const fisherYatesShuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const shuffleMembersAnecdotes = (
  members: PartyAnecdoteInterface[],
): AnecdoteToGuessInterface[] => {
  const referenceArray = [...members];
  const shuffled = members.map((member) => {
    const randomItem = fisherYatesShuffle([...referenceArray]).find(
      ({uid}) => uid !== member.uid,
    );

    if (!randomItem) return undefined;

    referenceArray.splice(referenceArray.indexOf(randomItem), 1);
    const anecdotes =
      randomItem.anecdotes?.map(({id, value}) => ({
        id,
        value,
      })) || [];

    return {
      guesserUid: member.uid,
      anecdotesOwnerUid: randomItem.uid,
      anecdotes: [...anecdotes]?.sort(() => Math.random() - 0.5),
    };
  });
  if (!shuffled.every((e) => e !== undefined))
    return shuffleMembersAnecdotes(members);
  else return shuffled;
};

export const shuffleAnecdotes = onRequest({cors: true}, async (req, res) => {
  const partyId = req.query.partyId as string;

  if (!partyId) return res.json({status: 403, message: "Missing partyId"});

  const db = admin.firestore();
  const anecdotesDocuments = await db
    .collection(`parties/${partyId}/anecdotes`)
    .listDocuments();

  if (anecdotesDocuments.length === 0)
    return res.json({status: 404, message: "No members found"});

  if (anecdotesDocuments.length === 1)
    return res.json({status: 403, message: "Not enough members"});

  const anecdotes = (await Promise.all(
    anecdotesDocuments.map(async (doc) => {
      const member = await doc.get();
      return member.data();
    }),
  )) as PartyAnecdoteInterface[];

  const shuffledAnecdotes = shuffleMembersAnecdotes(anecdotes);

  await Promise.all(
    shuffledAnecdotes.map(async (member) => {
      await db
        .collection(`parties/${partyId}/anecdotesToGuess`)
        .doc(member.guesserUid)
        .set(member);
    }),
  );

  return res.send({status: 200, data: "Party started"});
});

interface guessInterface {
  partyId: string;
  guesserUid: string;
  anecdotesOwnerUid: string;
  anecdoteId: string;
}

export const makeAGuess = onRequest({cors: true}, async (req, res) => {
  const payload = req.body.data as guessInterface | undefined;

  if (!payload || !Object.keys(payload).length)
    return res.status(400).send({
      data: {code: 400, message: "Missing payload", type: "incorrect"},
    });

  const db = admin.firestore();
  const userSnapshot = await db
    .collection(`parties/${payload.partyId}/members`)
    .doc(payload.guesserUid)
    .get();

  const user = userSnapshot.data();

  if (user?.nextGuessTime) {
    const formattedDate = new Date(user.nextGuessTime);
    if (formattedDate.getTime() > Date.now())
      return res.status(200).send({
        data: {
          code: 200,
          type: "too-early",
        },
      });
    else {
      await db
        .collection(`parties/${payload.partyId}/members`)
        .doc(payload.guesserUid)
        .update({nextGuessTime: Date.now() + 5 * 60 * 1000});
    }
  } else {
    await db
      .collection(`parties/${payload.partyId}/members`)
      .doc(payload.guesserUid)
      .update({nextGuessTime: Date.now() + 5 * 60 * 1000});
  }

  const anecdotesToGuessSnapshot = await db
    .collection(`parties/${payload.partyId}/anecdotes`)
    .doc(payload.anecdotesOwnerUid)
    .get();

  const {anecdotes} = anecdotesToGuessSnapshot.data() as {
    anecdotes: IAnecdoteToGuess[];
  };
  const anecdoteTried = anecdotes.find(({id}) => id === payload.anecdoteId);

  if (!anecdoteTried || anecdoteTried.type === "true")
    return res.status(200).send({
      data: {
        code: 200,
        type: "incorrect",
      },
    });

  await db
    .collection(`parties/${payload.partyId}/members`)
    .doc(payload.guesserUid)
    .update({guessed: true, guessedAt: Date.now()});

  await db
    .collection(`parties/${payload.partyId}/members`)
    .doc(payload.anecdotesOwnerUid)
    .update({busted: true, bustedAt: Date.now()});

  return res.status(200).send({data: {code: 200, type: "correct"}});
});
