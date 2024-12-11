import { useContext, useEffect } from "react";
import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";
import { Link, useNavigate } from "react-router-dom";
import UserDetailsContext from "../contexts/UserDetails";
import { lazy } from "react";
const MyPosts = lazy(() => import("../components/MyPosts"));

import { ADD_ICON, LOGOUT_ICON } from "../assets/icons-images/icons";
const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserDetailsContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(userInfo).length === 0)
      setUserInfo(JSON.parse(localStorage.getItem("sm-auth")));
  }, [setUserInfo, userInfo]);
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("sm-auth");
    // setUserInfo({});
  };
  return (
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
            userInfo.user_background ? userInfo.user_background : BG_DEFAULT_IMG
          }
          alt="loading"
          loading="lazy"
          className="w-full h-[200px] rounded-b-[20px]"
        />
        <div
          className="right-2 top-3 absolute bg-gray-600 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={handleLogOut}
        >
          <img src={LOGOUT_ICON} alt="loading" className="w-[25px] h-[25px]" />
        </div>
        <div className="absolute top-[140px] left-[20px]">
          <img
            src={userInfo.user_photo ? userInfo.user_photo : USER_DEFAULT_IMG}
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
  );
};

export default Profile;
