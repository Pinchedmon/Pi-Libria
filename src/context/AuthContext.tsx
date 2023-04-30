import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
type context = {
  signUp: () => void;
  logIn: () => void;
  logOut: () => void;
  user: any;
};
const AuthContext = createContext<any>(null);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState({});

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    // setDoc(doc(db, "users", email), {
    //   savedShows: [],
    // });
  }

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
