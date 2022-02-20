import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth, db } from "../apis/firebase";

export const AuthContext = createContext<{
  user: firebase.User | null;
  favorite: firebase.firestore.DocumentData | null;
}>({ user: null, favorite: null });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be rendered inside the AuthProvider");
  }

  return context;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [favorite, setFavorite] =
    useState<firebase.firestore.DocumentData | null>(null);

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubsribe;
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("favorite")
        .doc(user.uid)
        .onSnapshot((docSnapshot) => {
          setFavorite({ data: docSnapshot.data() });
        });
    } else {
      setFavorite(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, favorite: favorite }}>
      {children}
    </AuthContext.Provider>
  );
};
