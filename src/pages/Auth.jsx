import AuthBottomSheet from "../components/AuthBottomSheet";
import AuthPageImages from "../components/AuthPageImages";

const Auth = () => {
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
