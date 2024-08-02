import Auth from "../Auth";
import db from "@/api/firestore";
import {customAlphabet, nanoid} from "nanoid";
import {AnecdoteInterface, IParty, PartyMemberInterface} from "./types";
// import functions from "../functions";
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

const getNewPartyMember = (
  uid: string,
  isHost: boolean = false,
): PartyMemberInterface => ({
  uid,
  isHost,
  isReady: false,
  guessed: false,
  anecdotes: [
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
  ],
});

const addPartyMember = async (
  partyId: string,
  member: PartyMemberInterface,
) => {
  try {
    await setDoc(doc(db, "parties", partyId, "members", member.uid), member);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
      canStart: false,
      membersUid: [ownerUid],
      ownerUid,
    };
    await setDoc(doc(db, "parties", id), party);
    await addPartyMember(id, getNewPartyMember(ownerUid, true));
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
    await addPartyMember(partyId, getNewPartyMember(userId));
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

export const getUserPartyInfos = async (
  partyId: string,
  userUid?: string,
): Promise<PartyMemberInterface> => {
  const id = userUid || (Auth.auth.currentUser?.uid as string);

  const anecdotesSnap = await getDoc(
    doc(db, "parties", partyId, "members", id),
  );

  return anecdotesSnap.data() as PartyMemberInterface;
};

export const addAnecdote = async (
  partyId: string,
  anecdotes: AnecdoteInterface[],
) => {
  const userId = Auth.auth.currentUser?.uid;
  if (!userId) throw new Error("User not found");

  await setDoc(
    doc(db, "parties", partyId, "members", userId),
    {anecdotes},
    {merge: true},
  );
  await updateDoc(doc(db, "parties", partyId, "members", userId), {
    isReady: anecdotes.every((a) => a.value.length > 0),
  });
};
