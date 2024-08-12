import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/config.firebase";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null);
  const [postLoginCallback, setPostLoginCallback] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;

      // Get the user's token
      const token = await currentUser.getIdToken();
      localStorage.setItem("Token", token);

      // Store user info in your Mongoose database
      const userData = {
        email: user.email,
        password: user.uid,
        projectId: "664ece853e17537b70918cde",
        name: user.email,
        role: "user",
        status: true,
      };
      console.log(userData);
      const response = await axios.post(
        "https://configstaging.trainright.fit/api/users/signUp",
        userData
      );
      console.log("sign", response);
      if(response){
        localStorage.setItem(
          "UserDetails",
          JSON.stringify(userData)
        );

      }
      // Store user profile in localStorage

      console.log("Login successful", response.data);

      // Set user and execute post-login callback
      setUser(currentUser);
      if (postLoginCallback) {
        await postLoginCallback();
        setPostLoginCallback(null); // Clear callback after execution
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserDetails");
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        localStorage.removeItem("Token");
        setUser(null);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [auth]);

  const authInfo = {
    user,
    loading,
    googleSignIn,
    logOut,
    userPlan,
    setLoading,
    setPostLoginCallback,
    setUserPlan,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
