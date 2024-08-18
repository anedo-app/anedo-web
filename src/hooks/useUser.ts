import AuthService from "@/api/Auth";
import {create} from "zustand";
import {User} from "firebase/auth";
import {persist} from "zustand/middleware";
import {addUser, getUser} from "@/api/users";

export interface IUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface UserStore {
  user: IUser | undefined;
  login: (mail: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | undefined) => void;
  updateUser: (user: Partial<IUser>) => Promise<void>;
}

const useUser = create(
  persist<UserStore>(
    (set, get) => ({
      user: undefined,
      login: async (mail, password) => {
        const firebaseUser = await AuthService.login(mail, password);
        get().setUser(firebaseUser);
        const firestoreUser = await getUser(firebaseUser.uid);
        if (!firestoreUser)
          await addUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
      },
      loginWithGoogle: async () => {
        const firebaseUser = await AuthService.googleLogin();
        get().setUser(firebaseUser);
        // TODO cleanup
        if (firebaseUser) {
          await addUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        }
      },
      logout: async () => {
        await AuthService.logout();
        get().setUser(undefined);
        window.location.reload();
      },
      register: async (email, password, displayName) => {
        const firebaseUser = await AuthService.register(
          email,
          password,
          displayName,
        );
        // TODO cleanup
        if (firebaseUser) {
          await addUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
          get().setUser(firebaseUser);
        }
      },
      setUser: (firebaseUser) => {
        if (firebaseUser === undefined) return set({user: undefined});
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          },
        });
      },
      updateUser: async (user: Partial<IUser>) => {
        const newUser = await AuthService.updateUser(user);
        if (newUser) {
          const user = {
            uid: newUser.uid,
            email: newUser.email || "",
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
          };
          await addUser(user);
          set({user});
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUser;
