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
    if (localStorage.getItem("sm-auth")) localStorage.removeItem("sm-auth");
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

/*
export const registerUser = (email, password, navigate) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (localStorage.getItem("sm-auth")) localStorage.removeItem("sm-auth");
      localStorage.setItem(
        "sm-auth",
        JSON.stringify({ user_email: user.email })
      );
      navigate("/edit-profile");
    })
    .catch((error) => {
      throw new Error(error);
    });
};

*/

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (localStorage.getItem("sm-auth")) localStorage.removeItem("sm-auth");
  localStorage.setItem("sm-auth", JSON.stringify({ user_email: user.email }));
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (localStorage.getItem("sm-auth")) localStorage.removeItem("sm-auth");
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
    throw new Error(error);
  }
};
