/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { loginUser } from "../firebase/firebaseLogins";
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "../contexts/UserDetails";
import ForgetPassword from "./ForgetPassword";
import toast from "react-hot-toast";

const Login = ({ setToggleRegisterOrLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserDetailsContext);
  const [isForgetPassOpen, setIsForgetPassOpen] = useState(false);
  const handleLoginUser = async () => {
    if (!email || !password) return toast.error("enter all mandatory fields.");
    try {
      let userDetails = await loginUser(email, password);
      if (userDetails) {
        setUserInfo(userDetails);
        navigate("/feeds");
      } else {
        navigate("/edit-profile");
      }
    } catch {
      toast.error("Invalid Credentials !!!");
      console.log("inside the catch block");
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center m-1">
            <input
              type="email"
              className="w-[250px] h-[45px] rounded-md p-1 border border-gray-400"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center m-1">
            <input
              type="password"
              className="w-[250px] h-[45px] rounded-md p-1 border border-gray-400"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center m-1">
            <button
              className="rounded-4xl bg-[#313131] text-white text-[17px] w-[200px] h-[40px] font-medium"
              onClick={handleLoginUser}
            >
              Login
            </button>
          </div>
          <div className="flex justify-center">
            <p
              className="text-blue-700 text-[16px] m-1 hover:underline cursor-pointer"
              onClick={() => setIsForgetPassOpen(true)}
            >
              Forget Password
            </p>
          </div>
          {isForgetPassOpen && (
            <ForgetPassword setIsForgetPassOpen={setIsForgetPassOpen} />
          )}
          <div className="flex justify-center">
            <p className="mr-[2px]">new user? </p>
            <p
              className="w-fit h-fit hover:underline text-blue-600 font-bold"
              onClick={() => setToggleRegisterOrLogin(false)}
            >
              register now
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
