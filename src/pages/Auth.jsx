import { useEffect } from "react";
import AuthBottomSheet from "../components/AuthBottomSheet";
import AuthPageImages from "../components/AuthPageImages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkIfUserSignedIn = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/feeds");
        }
      });
    };
    checkIfUserSignedIn();
  }, [navigate]);
  return (
    <>
      <div className="relative">
        <AuthPageImages />
        <div className="absolute bottom-0">
          <AuthBottomSheet />
        </div>
      </div>
    </>
  );
};

export default Auth;
