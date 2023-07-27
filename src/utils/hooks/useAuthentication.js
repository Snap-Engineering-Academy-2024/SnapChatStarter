import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import db from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);

          // get Doc from User collection
          getDoc(doc(db, "Users", user.uid))
            .then((userData) => {
              // console.log("User Doc", userData.data());
              setUserData(userData.data());
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    userData,
  };
}
