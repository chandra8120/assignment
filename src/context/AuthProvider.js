import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../Email_Auth/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const userData = await getDoc(docRef);

    setUser({ uid: userData.id, ...userData.data() });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        users,
        setUsers,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
