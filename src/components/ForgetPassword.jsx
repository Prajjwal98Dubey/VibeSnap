/* eslint-disable react/prop-types */
import { useState } from "react";
import { EYE_CLOSED_ICON, EYE_OPEN_ICON } from "../assets/icons-images/icons";
import BackDrop from "./BackDrop";
import { auth } from "../firebase/firebase";
import { updatePassword } from "firebase/auth";
const ForgetPassword = ({ setIsForgetPassOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const handleResetPassword = () => {
    if (password.length === 0 || confirmPassword.length === 0)
      return alert("enter all mandatory fields.");
    if (password === confirmPassword) {
      const user = auth.currentUser;
      const newPassword = password;
      updatePassword(user, newPassword)
        .then(() => {
          alert("password reset success.");
          setIsForgetPassOpen(false);
        })
        .catch((err) => console.log(err));
    } else {
      alert("password do not match.");
    }
  };
  return (
    <>
      <div className="cursor-pointer ">
        <BackDrop />
      </div>
      <div className="fixed">
        <div className="z-10 flex justify-center text-white font-bold fixed w-[500px] h-full items-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="w-[85%] h-fit p-4 border border-gray-400 shadow-sm shadow-gray-400 rounded-[36px] bg-[#313131]">
            <div className="flex justify-center">
              <p className="text-center text-white font-bold text-[19px] mt-[2px] mb-[5px]">
                Reset Password
              </p>
            </div>
            <div className="w-full flex justify-center items-start mt-[5px] mb-[15px] relative">
              <input
                type={!isEyeOpen ? "password" : "text"}
                className="w-[70%] h-[40px] rounded-md bg-[#313131] border border-gray-300 text-white font-medium p-2"
                placeholder="enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center items-center absolute right-2 top-1">
                <img
                  src={!isEyeOpen ? EYE_OPEN_ICON : EYE_CLOSED_ICON}
                  alt="loading"
                  className="w-[30px] h-[30px]"
                  onClick={() => setIsEyeOpen(!isEyeOpen)}
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-start mt-[5px] mb-[15px] relative">
              <input
                type={!isEyeOpen ? "password" : "text"}
                className="w-[70%] h-[40px] rounded-md bg-[#313131] border border-gray-300 text-white font-medium p-2"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-center items-center absolute right-2 top-1">
                <img
                  src={!isEyeOpen ? EYE_OPEN_ICON : EYE_CLOSED_ICON}
                  alt="loading"
                  className="w-[30px] h-[30px]"
                  onClick={() => setIsEyeOpen(!isEyeOpen)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-[2px]">
              <button
                className="p-3 text-white bg-black rounded-md cursor-pointer hover:text-green-500"
                onClick={handleResetPassword}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;