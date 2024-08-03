import firebase from "./firebase";
import {IUser} from "@/hooks/useUser";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

const TOKEN_KEY = "authToken";

const auth = getAuth(firebase);

const register = async (email: string, password: string, name: string) => {
  const {user} = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: name,
  });

  const token = await user.getIdToken();
  localStorage.setItem(TOKEN_KEY, token);

  return user;
};

const login = async (email: string, password: string) => {
  const {user} = await signInWithEmailAndPassword(auth, email, password);

  const token = await user.getIdToken();
  localStorage.setItem(TOKEN_KEY, token);

  return user;
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem(TOKEN_KEY);
};

const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);

  if (!credential) throw new Error("No credential");

  localStorage.setItem(TOKEN_KEY, credential.accessToken || "");

  return result.user;
};

const authState = (fcn: NextOrObserver<User>) => onAuthStateChanged(auth, fcn);

const updateNameAndImage = async (user: IUser) => {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, {
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
  return auth.currentUser;
};

const updateUser = async (user: Partial<IUser>) => {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, user);
  return auth.currentUser;
};

export default {
  auth,
  register,
  login,
  logout,
  googleLogin,
  authState,
  updateNameAndImage,
  updateUser,
};
