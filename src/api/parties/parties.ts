import Auth from "../Auth";
import db from "@/api/firestore";
import functions from "../functions";
import {customAlphabet, nanoid} from "nanoid";
import {getMultipleUsers, getUser} from "../users";
import {httpsCallableFromURL} from "firebase/functions";
import {
  AnecdoteInterface,
  FullPartyUserType,
  IAnecdoteToGuess,
  IParty,
  PartyMemberInterface,
} from "./types";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getNewAnecdotes = (): AnecdoteInterface[] => [
  {
    id: nanoid(),
    type: "true",
    value: "",
  },
  {
    id: nanoid(),
    type: "true",
    value: "",
  },
  {
    id: nanoid(),
    type: "false",
    value: "",
  },
];

const getNewPartyMember = (
  uid: string,
  isHost: boolean = false,
): PartyMemberInterface => ({
  uid,
  isHost,
  isReady: false,
  guessed: false,
});

const addPartyMember = async (
  partyId: string,
  member: PartyMemberInterface,
  anecdotes: AnecdoteInterface[],
) => {
  await setDoc(doc(db, "parties", partyId, "anecdotes", member.uid), {
    uid: member.uid,
    anecdotes,
  });
  await setDoc(doc(db, "parties", partyId, "members", member.uid), member);
};

export const createParty = async (name: string): Promise<string | void> => {
  try {
    if (!Auth.auth.currentUser) return;
    const ownerUid = Auth.auth.currentUser?.uid;
    const nanoid = customAlphabet(alphabet, 8);
    const id = nanoid();
    const party: Omit<IParty, "members"> = {
      id,
      name,
      isStarted: false,
      isFinished: false,
      membersUid: [ownerUid],
      ownerUid,
    };
    await setDoc(doc(db, "parties", id), party);
    await addPartyMember(
      id,
      getNewPartyMember(ownerUid, true),
      getNewAnecdotes(),
    );
    return id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getParty = async (uid: string): Promise<IParty> => {
  const docRef = doc(db, "parties", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IParty;
  } else {
    throw new Error("No such document!");
  }
};

export const getParties = async (uid?: string): Promise<DocumentData[]> => {
  const userUid = uid || Auth.auth.currentUser?.uid;

  if (!userUid) return [];

  const q = query(
    collection(db, "parties"),
    where("membersUid", "array-contains", uid),
  );
  const querySnapshot = await getDocs(q);
  const docs: DocumentData[] = [];

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  } else {
    return docs;
  }
};

export const listenParties = (
  uid: string,
  callback: (parties: IParty[]) => void,
) => {
  const q = query(
    collection(db, "parties"),
    where("membersUid", "array-contains", uid),
  );

  return onSnapshot(q, (querySnapshot) => {
    const parties: IParty[] = [];
    querySnapshot.forEach((doc) => {
      parties.push(doc.data() as IParty);
    });
    callback(parties);
  });
};

export const listenParty = (
  partyUid: string,
  callback: (partyData: IParty) => void,
) =>
  onSnapshot(doc(db, "parties", partyUid), (querySnapshot) => {
    if (querySnapshot.exists()) callback(querySnapshot.data() as IParty);
  });

export const updateParty = async (party: IParty) => {
  try {
    await setDoc(doc(db, "parties", party.id), party, {merge: true});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const joinParty = async (partyId: string) => {
  try {
    const userId = Auth.auth.currentUser?.uid;
    if (!userId) throw new Error("User not found");
    await updateDoc(doc(db, "parties", partyId), {
      membersUid: arrayUnion(userId),
    });
    await addPartyMember(partyId, getNewPartyMember(userId), getNewAnecdotes());
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const leaveParty = async (partyId: string) => {
  const userId = Auth.auth.currentUser?.uid;
  if (!userId) throw new Error("User not found");

  await updateDoc(doc(db, "parties", partyId), {
    membersUid: arrayRemove(userId),
  });
  await deleteDoc(doc(db, "parties", partyId, "members", userId));
};

export const deleteParty = async (partyId: string) => {
  await deleteDoc(doc(db, "parties", partyId));
};

export const startParty = async (partyId: string) => {
  const shuffleAnecdotes = httpsCallableFromURL(
    functions,
    import.meta.env.VITE_FUNCTIONS_BASE_URL +
      "shuffleAnecdotes?partyId=" +
      partyId,
  );
  await shuffleAnecdotes({partyId});
  await updateDoc(doc(db, "parties", partyId), {isStarted: true});
};

export const getUserPartyInfos = async (
  partyId: string,
  userUid?: string,
): Promise<{
  anecdotes: AnecdoteInterface[];
  anecdotesToGuess: IAnecdoteToGuess[];
  userInfo: PartyMemberInterface;
}> => {
  const id = userUid || (Auth.auth.currentUser?.uid as string);

  const userPartyInfoSnap = await getDoc(
    doc(db, "parties", partyId, "members", id),
  );
  const userAnecdotesSnap = await getAnecdotes(partyId);
  const anecdotesToGuess = await getAnecdotesToAnswer(partyId, id);

  return {
    anecdotes: userAnecdotesSnap,
    anecdotesToGuess: anecdotesToGuess || null,
    userInfo: userPartyInfoSnap.data() as PartyMemberInterface,
  };
};

export const getAnecdotes = async (partyId: string, uid?: string) => {
  const userId = uid || Auth.auth.currentUser?.uid;
  if (!userId) throw new Error("User not found");

  const docSnap = await getDoc(
    doc(db, "parties", partyId, "anecdotes", userId),
  );

  if (docSnap.exists()) {
    return docSnap.data().anecdotes as AnecdoteInterface[];
  } else {
    throw new Error("No such document!");
  }
};

export const addAnecdote = async (
  partyId: string,
  anecdotes: AnecdoteInterface[],
) => {
  const userId = Auth.auth.currentUser?.uid;
  if (!userId) throw new Error("User not found");

  await setDoc(
    doc(db, "parties", partyId, "anecdotes", userId),
    {anecdotes, uid: userId},
    {merge: true},
  );
  await updateDoc(doc(db, "parties", partyId, "members", userId), {
    isReady: anecdotes.every((a) => a.value.length > 0),
  });
};

export const getPartyMember = async (partyId: string, memberUid: string) => {
  const memberPersonalInfos = await getUser(memberUid);
  const memberStatus = await getDoc(
    doc(db, "parties", partyId, "members", memberUid),
  );
  return {...memberStatus.data(), ...memberPersonalInfos};
};

export const getAllPartyMembers = async (
  partyId: string,
  membersUids: string[],
): Promise<FullPartyUserType[]> => {
  const membersPersonalInfos = await getMultipleUsers(membersUids);
  const membersPartyInfosSnapshot = await getDocs(
    collection(db, "parties", partyId, "members"),
  );
  const membersStatus: PartyMemberInterface[] = [];
  membersPartyInfosSnapshot.forEach((doc) => {
    if (doc.exists()) membersStatus.push(doc.data() as PartyMemberInterface);
  });

  const result = membersPersonalInfos.map((personalInfos) => ({
    ...personalInfos,
    ...membersStatus.find((member) => member.uid === personalInfos.uid),
  })) as FullPartyUserType[];

  return result;
};

export const getAnecdotesToAnswer = async (
  partyId: string,
  memberUid: string,
): Promise<IAnecdoteToGuess[]> => {
  const docRef = doc(
    db,
    "parties",
    partyId,
    "anecdotesToGuess",
    memberUid,
  ).withConverter({
    toFirestore: () => ({}),
    fromFirestore: (snapshot) => snapshot.data().anecdotes,
  });
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const makeAGuess = async (payload: {
  partyId: string;
  anecdotesOwnerUid: string;
  anecdoteId: string;
}): Promise<{
  type: "too-early" | "correct" | "incorrect";
}> => {
  const userId = Auth.auth.currentUser?.uid;
  if (!userId) throw new Error("User not found");

  const makeAGuessApi = httpsCallableFromURL<
    {
      partyId: string;
      guesserUid: string;
      anecdotesOwnerUid: string;
      anecdoteId: string;
    },
    {
      type: "too-early" | "correct" | "incorrect";
    }
  >(functions, import.meta.env.VITE_FUNCTIONS_BASE_URL + "makeAGuess");
  const {data} = await makeAGuessApi({guesserUid: userId, ...payload});
  return data;
};
