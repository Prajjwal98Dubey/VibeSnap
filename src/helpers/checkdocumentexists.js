import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const checkIfUserExistsInDb = async (email) => {
  const q = query(
    collection(db, "users-details"),
    where("user_email", "==", email)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    let userDetails = {};
    querySnapshot.forEach((doc) => {
      localStorage.setItem("sm-auth", JSON.stringify(doc.data()));
      userDetails = doc.data();
    });
    return userDetails;
  }
  return false;
};
