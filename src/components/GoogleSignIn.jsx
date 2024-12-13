import toast from "react-hot-toast";
import GOOGLE_LOGO from "../assets/auth-page-images/google-logo.png";
import { signInWithGoogle } from "../firebase/firebaseLogins";
import { useNavigate } from "react-router-dom";
const GoogleSignIn = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    let result = await signInWithGoogle();
    if (result) {
      toast.success("google signIn");
      navigate("/feeds");
    } else {
      navigate("/edit-profile");
    }
  };
  return (
    <>
      <div className="flex justify-center mt-[10px]">
        <button
          className="w-[275px] h-[55px] bg-[#313131] rounded-4xl"
          onClick={handleGoogleSignIn}
        >
          <div className="flex justify-center items-center">
            <img
              src={GOOGLE_LOGO}
              alt="loading"
              className="flex justify-center items-center w-[20px] h-[18px] m-1"
            />
            <p className="text-white font-medium text-center m-1">
              Continue with Google
            </p>
          </div>
        </button>
      </div>
    </>
  );
};

export default GoogleSignIn;
