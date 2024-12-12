import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";
import EDIT_ICON from "../assets/icons-images/edit_icon.png";
import { useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase.js";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import UserDetailsContext from "../contexts/UserDetails";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { NEW_POST_LEFT_ICON } from "../assets/icons-images/icons.js";

const EditProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserDetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(
            collection(db, "users-details"),
            where("user_email", "==", user.email)
          );
          const documentSnapShot = await getDocs(q);
          if (!documentSnapShot.empty) {
            documentSnapShot.forEach((doc) => {
              setUserInfo({ ...doc.data() });
              // setIsLoading(false);
            });
          }
        } else {
          navigate("/");
          toast.error("sign in to access.");
        }
      });
    }
  }, [navigate, userInfo, setUserInfo]);

  const handleUserPhoto = (e) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let userPhotoName = e.target.files[0].name + Date.now();
        const userPhotoRef = ref(storage, `users-photo/${userPhotoName}`);
        uploadBytes(userPhotoRef, e.target.files[0]).then(() => {
          getDownloadURL(userPhotoRef)
            .then((url) => {
              setUserInfo({ ...userInfo, user_photo: url });
              toast.success("user photo uploaded !!");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        toast.error("guest cannot upload image !!!");
      }
    });
  };

  const handleBackgroundPhoto = (e) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const bgImageName = e.target.files[0].name + Date.now();
        const bgImageRef = ref(storage, `user-bg/${bgImageName})`);
        uploadBytes(bgImageRef, e.target.files[0]).then(() => {
          getDownloadURL(bgImageRef)
            .then((url) => {
              setUserInfo({ ...userInfo, user_background: url });
              // alert("background upload");
              toast.success("user photo uploaded !!");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        toast.error("guest cannot upload!!!");
      }
    });
  };

  const handleSaveUserDetails = async () => {
    if (!userInfo.user_name) return toast.error("user name is mandatory ");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "users-details"),
          where("user_email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnap) => {
            const docRef = doc(db, "users-details", docSnap.id);
            const updatedDoc = {
              user_name: userInfo.user_name,
              user_bio: userInfo.user_bio,
              user_email: userInfo.user_email,
              user_photo: userInfo.user_photo,
              user_background: userInfo.user_background,
            };
            await setDoc(docRef, updatedDoc);
            setUserInfo({
              user_name: userInfo.user_name,
              user_bio: userInfo.user_bio,
              user_email: userInfo.user_email,
              user_photo: userInfo.user_photo,
              user_background: userInfo.user_background,
            });
            if (localStorage.getItem("sm-auth")) {
              localStorage.removeItem("sm-auth");
              localStorage.setItem(
                "sm-auth",
                JSON.stringify({
                  user_name: userInfo.user_name,
                  user_bio: userInfo.user_bio,
                  user_email: userInfo.user_email,
                  user_photo: userInfo.user_photo,
                  user_background: userInfo.user_background,
                })
              );
            }
            toast.success("profile updated!!!");
            navigate("/profile");
            console.log(`Document with ID ${docSnap.id} successfully updated!`);
          });
        } else {
          console.log("No matching documents found.");
          try {
            const docRef = await addDoc(collection(db, "users-details"), {
              user_name: userInfo.user_name,
              user_bio: userInfo.user_bio ? userInfo.user_bio : "",
              user_email: JSON.parse(localStorage.getItem("sm-auth"))
                .user_email,
              user_photo: userInfo.user_photo ? userInfo.user_photo : "",
              user_background: userInfo.user_background
                ? userInfo.user_background
                : "",
            });

            setUserInfo({
              user_name: userInfo.user_name,
              user_bio: userInfo.user_bio,
              user_email: JSON.parse(localStorage.getItem("sm-auth"))
                .user_email,
              user_photo: userInfo.user_photo ? userInfo.user_photo : "",
              user_background: userInfo.user_background
                ? userInfo.user_background
                : "",
            });
            if (localStorage.getItem("sm-auth")) {
              localStorage.removeItem("sm-auth");
              localStorage.setItem(
                "sm-auth",
                JSON.stringify({
                  user_name: userInfo.user_name,
                  user_bio: userInfo.user_bio,
                  user_email: userInfo.user_email,
                  user_photo: userInfo.user_photo ? userInfo.user_photo : "",
                  user_background: userInfo.user_background
                    ? userInfo.user_background
                    : "",
                })
              );
            }
            toast.success("profile updated!!!");
            navigate("/profile");

            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } else {
        toast.error("guest can edit profile !!!");
      }
    });
  };

  return (
    <>
      {/* {console.log(userInfo)} */}
      <div className="w-full relative">
        <div className="absolute top-[20px] left-[20px] flex ">
          <Link to="/profile">
            <div className=" p-1 m-1 flex justify-center items-center bg-white rounded-md">
              <img
                src={NEW_POST_LEFT_ICON}
                alt="loading"
                className="w-[22px] h-[22px]"
              />
            </div>
          </Link>
          <p className="text-[20px] font-semibold font-sans text-[#ffffff] text-center flex items-center ">
            Edit Profile
          </p>
        </div>
        <img
          src={
            userInfo.user_background ? userInfo.user_background : BG_DEFAULT_IMG
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
            src={userInfo.user_photo ? userInfo.user_photo : USER_DEFAULT_IMG}
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
          placeholder="Enter Your Full Name"
          className="w-[350px] h-[50px] border border-transparent border-b-gray-400"
          value={userInfo.user_name ? userInfo.user_name : ""}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              user_name: e.target.value,
            });
          }}
        />
      </div>
      <div className="mt-[20px] ml-[20px]">
        <div>
          <p className="font-medium">Bio</p>
        </div>
        <input
          type="text"
          placeholder="Enter Your Bio..."
          className="p-1 w-[350px] h-[50px] border border-transparent border-b-gray-400"
          value={userInfo.user_bio ? userInfo.user_bio : ""}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              user_bio: e.target.value,
            });
          }}
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
