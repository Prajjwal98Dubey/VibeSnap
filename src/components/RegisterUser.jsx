/* eslint-disable react/prop-types */
import { useState } from "react";
import { registerUser } from "../firebase/firebaseLogins.js";
import { useNavigate } from "react-router-dom";

const RegisterUser = ({ setToggleRegisterOrLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegisterUser = () => {
    registerUser(email, password, navigate);
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
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </div>
          <div className="flex justify-center">
            <p className="mr-[2px]">already a user? </p>
            <p
              className="w-fit h-fit hover:underline text-blue-600 font-bold"
              onClick={() => setToggleRegisterOrLogin(true)}
            >
              login
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
