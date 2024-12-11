import { useContext, useState } from "react";
import LOGO from "../assets/auth-page-images/logo.png";
import { signInWithGoogle } from "../firebase/firebaseLogins.js";
import { lazy } from "react";
import toast from "react-hot-toast";
const RegisterUser = lazy(() => import("./RegisterUser.jsx"));
const Login = lazy(() => import("./Login.jsx"));
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "../contexts/UserDetails.js";
import GOOGLE_LOGO from "../assets/auth-page-images/google-logo.png";

const AuthBottomSheet = () => {
  const [toggleRegisterOrLogin, setToggleRegisterOrLogin] = useState(true);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserDetailsContext);
  const handleGoogleSignIn = async () => {
    let userDetails = await signInWithGoogle();
    if (userDetails) {
      setUserInfo(userDetails);
      navigate("/feeds");
    } else {
      navigate("/edit-profile");
    }
  };
  const handleGuestLogin = () => {
    setUserInfo({
      user_name: "Guest",
      user_email: "guest@gmail.com",
    });
    if (localStorage.getItem("sm-auth")) localStorage.removeItem("sm-auth");
    localStorage.setItem(
      "sm-auth",
      JSON.stringify({
        user_name: "Guest",
        user_email: "guest@gmail.com",
      })
    );
    navigate("/feeds");
    toast.success("Guest Logged in")
  };
  return (
    <>
      <div className="w-[100vw] h-[440px] bg-white rounded-t-bottom-sheet">
        <div className="flex justify-center pt-6">
          <div className="flex justify-center items-center m-1 p-1">
            <img
              src={LOGO}
              alt="loading"
              loading="lazy"
              className="w-[46px] h-[34px]"
            />
          </div>
          <div className="flex justify-center m-1 p-1">
            <p className="text-[#313131] font-bold text-4xl">Vibesnap</p>
          </div>
        </div>
        <div className="flex justify-center m-2">
          <p className="text-gray-700 text-[18px]">
            Moments That Matter, Shared Forever.
          </p>
        </div>
        <div>
          {toggleRegisterOrLogin ? (
            <Login setToggleRegisterOrLogin={setToggleRegisterOrLogin} />
          ) : (
            <RegisterUser setToggleRegisterOrLogin={setToggleRegisterOrLogin} />
          )}
        </div>
        <div className="mt-[4px] mb-[4px] flex justify-center">
          <button
            className="w-[200px] h-[40px] rounded-[26px] bg-[#313131] text-white flex justify-center items-center font-medium"
            onClick={handleGuestLogin}
          >
            Guest Login
          </button>
        </div>
        <div className="flex justify-center mt-[10px]">
          <button className="w-[275px] h-[55px] bg-[#313131] rounded-4xl ">
            <div className="flex justify-center items-center">
              <img
                src={GOOGLE_LOGO}
                alt="loading"
                className="flex justify-center items-center w-[20px] h-[18px] m-1"
              />
              <p
                className="text-white font-medium text-center m-1"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthBottomSheet;
