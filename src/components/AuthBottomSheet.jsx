import { useState } from "react";
import LOGO from "../assets/auth-page-images/logo.png";
import { lazy } from "react";
const RegisterUser = lazy(() => import("./RegisterUser.jsx"));
const Login = lazy(() => import("./Login.jsx"));
import GoogleSignIn from "./GoogleSignIn.jsx";

const AuthBottomSheet = () => {
  const [toggleRegisterOrLogin, setToggleRegisterOrLogin] = useState(true);
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
        <GoogleSignIn />
      </div>
    </>
  );
};

export default AuthBottomSheet;
