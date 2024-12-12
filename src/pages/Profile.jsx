import { useContext, useEffect, useState } from "react";
import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";
import { Link, useNavigate } from "react-router-dom";
import UserDetailsContext from "../contexts/UserDetails";
import { lazy } from "react";
const MyPosts = lazy(() => import("../components/MyPosts"));

import {
  ADD_ICON,
  LEFT_ARROW,
  LOGOUT_ICON,
} from "../assets/icons-images/icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProfileShimmer from "../Shimmers/ProfileShimmer";
import toast from "react-hot-toast";
const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserDetailsContext);
  const [isLoading, setIsLoading] = useState(false);
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
          console.log("in the profile page", documentSnapShot.empty);
          if (!documentSnapShot.empty) {
            documentSnapShot.forEach((doc) => {
              setUserInfo({ ...doc.data() });
              setIsLoading(false);
            });
          }
        } else {
          navigate("/");
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [setUserInfo, userInfo, navigate]);
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("sm-auth");
      navigate("/");
      toast.success("Successfully logged out!!!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <ProfileShimmer />
      ) : (
        <>
          <div className="w-full relative">
            <div className="fixed bottom-6 right-6 w-[80px] h-[80px] p-4 rounded-full bg-[#313131] cursor-pointer">
              <Link to="/add">
                <img
                  src={ADD_ICON}
                  alt="loading"
                  className="w-[50px] h-[50px] font-bold"
                />
              </Link>
            </div>
            <img
              src={
                userInfo.user_background
                  ? userInfo.user_background
                  : BG_DEFAULT_IMG
              }
              alt="loading"
              loading="lazy"
              className="w-full h-[200px] rounded-b-[20px]"
            />
            <Link to="/feeds">
              <div
                className="left-2 top-3 absolute bg-gray-600 rounded-full p-1 flex justify-center items-center cursor-pointer"
                // onClick={handleLogOut}
              >
                <img
                  src={LEFT_ARROW}
                  alt="loading"
                  className="w-[25px] h-[25px] m-1"
                />
                <div className="flex justify-center items-center m-1">
                  <p className="text-white font-medium text-[16px]">Feeds</p>
                </div>
              </div>
            </Link>
            <div
              className="right-2 top-3 absolute bg-gray-600 rounded-full p-2 flex justify-center items-center cursor-pointer"
              onClick={handleLogOut}
            >
              <img
                src={LOGOUT_ICON}
                alt="loading"
                className="w-[25px] h-[25px]"
              />
            </div>
            <div className="absolute top-[140px] left-[20px]">
              <img
                src={
                  userInfo.user_photo ? userInfo.user_photo : USER_DEFAULT_IMG
                }
                alt="loading"
                loading="lazy"
                className="w-[115px] h-[115px] rounded-full border border-gray-400"
              />
            </div>
          </div>
          <div className="flex justify-end m-3">
            <Link to="/edit-profile">
              <button className="w-[215px] h-[36px] rounded-[36px] border border-gray-400 text-center font-medium hover:border hover:border-black">
                Edit Profile
              </button>
            </Link>
          </div>
          <div className="mt-[20px] ml-[20px]">
            <p className="text-black font-semibold text-[28px] font-sans">
              {userInfo.user_name}
            </p>
          </div>
          <div className="mt-[2px] ml-[15px] p-1">
            <p className="text-black font-medium text-[16px] font-sans text-left">
              {userInfo.user_bio}
            </p>
          </div>
          <div className="mt-[2px] ml-[15px] p-1">
            <p className="text-black font-bold text-[20px]">My Posts</p>
          </div>
          <div className="w-full">
            <MyPosts />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
