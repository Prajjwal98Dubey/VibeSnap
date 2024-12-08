import Image1 from "../assets/auth-page-images/image1.png";
import Image2 from "../assets/auth-page-images/image2.png";
import Image3 from "../assets/auth-page-images/image3.png";
import Image4 from "../assets/auth-page-images/image4.png";
import Image5 from "../assets/auth-page-images/image5.png";
import Image6 from "../assets/auth-page-images/image6.png";
import Image7 from "../assets/auth-page-images/image7.png";
import Image8 from "../assets/auth-page-images/image8.png";
import Image9 from "../assets/auth-page-images/image9.png";
const AuthPageImages = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/3 h-[100vh]">
          <div className="w-full h-1/3 pb-2 pr-1">
            <img
              src={Image1}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2 pr-1">
            <img
              src={Image2}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2 pr-1">
            <img
              src={Image3}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-1/3 h-[100vh]">
          <div className="w-full h-1/3 pb-2 pr-1 pl-1">
            <img
              src={Image4}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2 pr-1 pl-1">
            <img
              src={Image5}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2 pr-1 pl-1">
            <img
              src={Image6}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-1/3 h-[100vh]">
          <div className="w-full h-1/3 pb-2  pl-1">
            <img
              src={Image7}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2 pl-1">
            <img
              src={Image8}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-1/3 pb-2  pl-1">
            <img
              src={Image9}
              alt="loadinmkjg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPageImages;
