import Auth from "@/api/Auth";
import db from "@/api/firestore";
import {IUser} from "@/hooks/useUser";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const documentRef = (uid: string) => doc(db, "users", uid);

export const addUser = async (user: IUser) => {
  await setDoc(documentRef(user.uid), user);
};

export const updateUser = async (user: IUser) => {
  try {
    await Auth.updateNameAndImage(user);

    await setDoc(documentRef(user.uid), user, {merge: true});
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUser = async (uid: string) => {
  const docRef = documentRef(uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

const spliteArray = (array: string[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const getMultipleUsers = async (uids: string[]): Promise<IUser[]> => {
  if (uids.length > 10) {
    const splitedArray = spliteArray(uids, 10);

    const result: IUser[] = [];
    for (const array of splitedArray) {
      const q = query(collection(db, "users"), where("uid", "in", array));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push(doc.data() as IUser);
      });
    }
    return result;
  } else {
    const result: IUser[] = [];

    const q = query(collection(db, "users"), where("uid", "in", uids));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data() as IUser);
    });

    return result;
  }
};
