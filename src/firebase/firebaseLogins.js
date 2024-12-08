import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.js";
import { checkIfUserExistsInDb } from "../helpers/checkdocumentexists.js";

export const signInWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      let isUserExists = await checkIfUserExistsInDb(user.email);
      if (isUserExists) {
        navigate("/feeds");
      } else {
        localStorage.setItem(
          "sm-auth",
          JSON.stringify({ user_email: user.email })
        );
        navigate("/edit-profile");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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

export const loginUser = (email, password, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      let isUserExists = await checkIfUserExistsInDb(user.email);
      if (isUserExists) {
        navigate("/feeds");
      } else {
        localStorage.setItem(
          "sm-auth",
          JSON.stringify({ user_email: user.email })
        );
        navigate("/edit-profile");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
