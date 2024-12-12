import { ERROR_ICON } from "../assets/icons-images/icons";

const Error = () => {
  return (
    <>
    <div className="w-full h-[55px] bg-purple-500 flex justify-center items-center p-1">
        <p className="text-[25px] font-bold text-white">VibeSnap</p>
    </div>
    <div className="w-full h-[100%] flex justify-center items-center mt-[50px]">
      <img src={ERROR_ICON} alt="loading" className="w-[40px] h-[40px] m-2" />
      <div className="m-2">
        <p className="font-medium text-[22px]">This Page does not exist.</p>
      </div>
    </div>
    
    </>
  );
};

export default Error;
