import { useContext, useEffect } from "react";
import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";
import { Link } from "react-router-dom";
import UserDetailsContext from "../contexts/UserDetails";
const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserDetailsContext);
  useEffect(() => {
    if (Object.keys(userInfo).length === 0)
      setUserInfo(JSON.parse(localStorage.getItem("sm-auth")));
  }, [setUserInfo, userInfo]);

  return (
    <>
      <div className="w-full relative">
        <img
          src={userInfo.user_background}
          alt="loading"
          loading="lazy"
          className="w-full h-[200px] rounded-b-[20px]"
        />
        <div className="absolute top-[140px] left-[20px]">
          <img
            src={userInfo.user_photo}
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
    </>
  );
};

export default Profile;
