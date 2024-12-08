import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";
import EDIT_ICON from "../assets/icons-images/edit_icon.png";
import { useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import UserDetailsContext from "../contexts/UserDetails";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState("");
  const [userDetails] = useState(JSON.parse(localStorage.getItem("sm-auth")));
  const { setUserInfo } = useContext(UserDetailsContext);

  const handleUserPhoto = (e) => {
    let userPhotoName = e.target.files[0].name + Date.now();
    const userPhotoRef = ref(storage, `users-photo/${userPhotoName}`);
    uploadBytes(userPhotoRef, e.target.files[0]).then(() => {
      getDownloadURL(userPhotoRef)
        .then((url) => {
          setUserPhoto(url);
          alert("user photo upload");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleBackgroundPhoto = (e) => {
    const bgImageName = e.target.files[0].name + Date.now();
    const bgImageRef = ref(storage, `user-bg/${bgImageName})`);
    uploadBytes(bgImageRef, e.target.files[0]).then(() => {
      getDownloadURL(bgImageRef)
        .then((url) => {
          setBackgroundPhoto(url);
          alert("background upload");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleSaveUserDetails = async () => {
    if (!userName) return alert("name is mandatory field.");
    const q = query(
      collection(db, "users_details"),
      where("user_email", "==", userDetails.user_email)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "users_details", docSnap.id);
        await updateDoc(docRef, {
          user_name: userDetails.user_name,
          user_bio: userDetails.user_bio,
          user_email: JSON.parse(localStorage.getItem("sm-auth")).user_email,
          user_photo: userDetails.user_photo,
          user_background: userDetails.user_background,
        });
        setUserInfo({
          user_name: userDetails.user_name,
          user_bio: userDetails.user_bio,
          user_email: JSON.parse(localStorage.getItem("sm-auth")).user_email,
          user_photo: userDetails.user_photo,
          user_background: userDetails.user_background,
        });

        console.log(`Document with ID ${docSnap.id} successfully updated!`);
      });
    } else {
      console.log("No matching documents found.");
    }
    try {
      const docRef = await addDoc(collection(db, "users-details"), {
        user_name: userName,
        user_bio: bio ? bio : "",
        user_email: JSON.parse(localStorage.getItem("sm-auth")).user_email,
        user_photo: userPhoto ? userPhoto : "",
        user_background: backgroundPhoto ? backgroundPhoto : "",
      });

      setUserInfo({
        user_name: userName,
        user_bio: bio ? bio : "",
        user_email: JSON.parse(localStorage.getItem("sm-auth")).user_email,
        user_photo: userPhoto ? userPhoto : "",
        user_background: backgroundPhoto ? backgroundPhoto : "",
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div className="absolute top-[20px] left-[20px]">
          <p className="text-[20px] font-semibold font-sans text-[#ffffff] ">
            Edit Profile
          </p>
        </div>
        <img
          src={
            userDetails.user_background
              ? userDetails.user_background
              : BG_DEFAULT_IMG
          }
          alt="loading"
          loading="lazy"
          className="w-full h-[200px] rounded-b-[20px]"
        />
        <div className="w-[38px] h-[38px] rounded-full bg-[#F4F4F4] flex justify-center items-center absolute top-[150px] left-[350px]">
          <img src={EDIT_ICON} alt="loading" className="w-[13px] h-[13px]" />
          <input
            type="file"
            className=" w-[40px] h-[40px] z-1 absolute top-[3px] rounded-full bg-transparent border-none inset-0 opacity-0"
            onChange={handleBackgroundPhoto}
          />
        </div>
        <div className="absolute top-[140px] left-[20px]">
          <img
            src={
              userDetails.user_photo ? userDetails.user_photo : USER_DEFAULT_IMG
            }
            alt="loading"
            loading="lazy"
            className="w-[115px] h-[115px] rounded-full border border-gray-400"
          />
          <div className="w-[38px] h-[38px] rounded-full bg-[#F4F4F4] flex justify-center items-center absolute top-[75px] right-0">
            <img src={EDIT_ICON} alt="loading" className="w-[13px] h-[13px]" />
            <input
              type="file"
              onChange={handleUserPhoto}
              className=" w-[40px] h-[40px] z-1 absolute top-[3px] rounded-full bg-transparent border-none inset-0 opacity-0"
            />
          </div>
        </div>
      </div>
      <div className="mt-[90px] ml-[20px]">
        <div>
          <p className="font-medium">Name</p>
        </div>
        <input
          type="text"
          placeholder="Virat Kohli"
          className="w-[350px] h-[50px] border border-transparent border-b-gray-400"
          value={userDetails.user_name ? userDetails.user_name : userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mt-[20px] ml-[20px]">
        <div>
          <p className="font-medium">Bio</p>
        </div>
        <input
          type="text"
          placeholder="Hi, I am Goat !!!"
          className="p-1 w-[350px] h-[50px] border border-transparent border-b-gray-400"
          value={userDetails.user_bio ? userDetails.user_bio : bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="fixed bottom-12 transform -translate-x-1/2 left-1/2">
        <button
          className="w-[350px] h-[50px] bg-black text-white font-medium text-center rounded-[36px]"
          onClick={handleSaveUserDetails}
        >
          SAVE
        </button>
      </div>
    </>
  );
};
export default EditProfile;
