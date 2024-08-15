import * as Cors from "cors";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const {onRequest} = require("firebase-functions/v2/https");

import {
  AnecdoteInterface,
  AnecdoteToGuessInterface,
  PartyAnecdoteInterface,
} from "./types";
import {log} from "firebase-functions/logger";

admin.initializeApp();
const cors = Cors({origin: false});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const randomInt = (k: number) => Math.floor((k + 1) * Math.random());

const shuffleUsers = <T>(arr: T[]): T[] => {
  arr.sort(() => Math.random() - 0.5);
  functions.logger.info(JSON.stringify(arr));

  let associations = {};

  for (let i = 0; i < arr.length; i++) {
    let utilisateur = arr[i];
    let autreUtilisateur = arr[(i + 1) % arr.length];
    associations[utilisateur] = autreUtilisateur;
  }

  return associations;
};

const shuffleMembersAnecdotes = (
  members: PartyAnecdoteInterface[],
): AnecdoteToGuessInterface[] => {
  const shuffled = shuffleUsers(members.map((m) => m.uid));

  functions.logger.info(JSON.stringify(shuffled));
  return shuffled;
};

export const shuffleAnecdotes = onRequest({cors: true}, async (req, res) => {
  const partyId = req.query.partyId as string;

  if (!partyId) {
    cors(req, res, () => res.json({status: 404, message: "Missing partyId"}));
    return;
  }
  const db = admin.firestore();
  const anecdotesDocuments = await db
    .collection(`parties/${partyId}/anecdotes`)
    .listDocuments();

  if (anecdotesDocuments.length === 0) {
    cors(req, res, () => res.json({status: 404, message: "No members found"}));
    return;
  }

  const anecdotes = (await Promise.all(
    anecdotesDocuments.map(async (doc) => {
      const member = await doc.get();
      return member.data();
    }),
  )) as PartyAnecdoteInterface[];

  const shuffledAnecdotes = shuffleMembersAnecdotes(anecdotes);

  // await Promise.all(
  //   shuffledAnecdotes.map(async (member) => {
  //     await db
  //       .collection(`parties/${partyId}/anecdotesToGuess`)
  //       .doc(member.guesserUid)
  //       .set(member);
  //   }),
  // );
  // cors(req, res, () => res.send({status: "ok", data: "Party started"}));
});

interface guessInterface {
  partyId: string;
  guesserUid: string;
  anecdotesOwnerUid: string;
  anecdote: string;
}

export const test = onRequest({cors: true}, async (req, res) => {
  log("test");
  cors(req, res, () =>
    res.status(400).send({
      data: {code: 200, message: "Missing payload", isCorrect: false},
    }),
  );
});

export const makeAGuess = functions.https.onRequest(async (req, res) => {
  const payload = req.body.data as guessInterface | undefined;

  if (!payload || !Object.keys(payload).length) {
    cors(req, res, () =>
      res.status(400).send({
        data: {code: 400, message: "Missing payload", isCorrect: false},
      }),
    );
    return;
  }

  const db = admin.firestore();
  const userSnapshot = await db
    .collection(`parties/${payload.partyId}/members`)
    .doc(payload.guesserUid)
    .get();

  const user = userSnapshot.data();

  if (user?.lastGuessDate) {
    const formattedDate = new Date(user.lastGuessDate.seconds * 1000);
    if (formattedDate.getTime() > Date.now() - 3600000) {
      cors(req, res, () =>
        res.status(200).send({
          data: {
            code: 200,
            message: "You can only make a guess once an hour",
            isCorrect: false,
            isTooEarly: true,
          },
        }),
      );
      return;
    }
  }

  const anecdotesToGuessSnapshot = await db
    .collection(`parties/${payload.partyId}/anecdotesToGuess`)
    .doc(payload.guesserUid)
    .get();

  const anecdotesToGuess = anecdotesToGuessSnapshot.data() as {
    anecdotesOwnerUid: string;
    anecdotes: AnecdoteInterface[];
  };
  const anecdotesOwnerUid = anecdotesToGuess.anecdotesOwnerUid;
  const falseAnecdote = anecdotesToGuess.anecdotes.find(
    ({type}) => type === "false",
  );

  if (
    anecdotesOwnerUid !== payload.anecdotesOwnerUid ||
    falseAnecdote?.value !== payload.anecdote
  ) {
    cors(req, res, () =>
      res.status(200).send({
        data: {
          code: 200,
          message: "One of your answer is incorrect",
          isCorrect: false,
        },
      }),
    );
    return;
  }
  cors(req, res, () =>
    res
      .status(200)
      .send({data: {code: 200, message: "Success", isCorrect: true}}),
  );
});
