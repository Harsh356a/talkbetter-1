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
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null);
  const [postLoginCallback, setPostLoginCallback] = useState(null);
const navigate =useNavigate()
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

      // Prepare user data for signup
      const userData = {
        email: currentUser.email,
        password: "Password@123",
        projectId: "664ece853e17537b70918cde",
        name: currentUser.email,
        role: "user",
        status: true,
      };

      try {
        console.log("sign", userData);
        // Store user info in your Mongoose database (signup)
        await axios.post(
          "https://configstaging.trainright.fit/api/users/signUp",
          userData
        );
        localStorage.setItem("UserDetails", JSON.stringify(userData));
        console.log("Signup successful");
      } catch (error) {
        console.error("Error during signup:", error);
      }

      try {
        console.log("login", {
          email: currentUser.email,
          password: "Password@123",
          projectId: "664ece853e17537b70918cde",
        });
        // Log in the user after signup
        const loginResponse = await axios.post(
          "https://configstaging.trainright.fit/api/users/login",
          {
            email: currentUser.email,
            password: "Password@123",
            projectId: "664ece853e17537b70918cde",
          }
        );
        console.log("Login successful", loginResponse.data);
        localStorage.setItem(
          "UserDetails",
          JSON.stringify(loginResponse.data.profile)
        );
        localStorage.setItem("Token", loginResponse.data.authToken);
        navigate("/")

      } catch (error) {
        console.error("Error during login:", error);
      }

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
