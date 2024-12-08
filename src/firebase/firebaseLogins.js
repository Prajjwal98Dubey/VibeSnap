import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.js";
import { checkIfUserExistsInDb } from "../helpers/checkdocumentexists.js";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    let isUserExists = await checkIfUserExistsInDb(user.email);
    if (isUserExists) {
      return isUserExists;
    } else {
      localStorage.setItem(
        "sm-auth",
        JSON.stringify({ user_email: user.email })
      );
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (email, password, navigate) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      localStorage.setItem(
        "sm-auth",
        JSON.stringify({ user_email: user.email })
      );
      navigate("/edit-profile");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    let isUserExists = await checkIfUserExistsInDb(user.email);
    if (isUserExists) {
      return isUserExists;
    } else {
      localStorage.setItem(
        "sm-auth",
        JSON.stringify({ user_email: user.email })
      );
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
