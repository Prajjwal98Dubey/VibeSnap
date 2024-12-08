/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Webcam from "react-webcam";
const WebCam = ({ setWebCamUrl, handleWebCamImageUpload }) => {
  const webCamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const capture = () => {
    const imageSrc = webCamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setWebCamUrl(imageSrc);
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-black text-white text-center p-4 rounded-[36px]"
          onClick={() => setIsCameraOpen(!isCameraOpen)}
        >
          {isCameraOpen ? "Close Camera" : "Take Photo"}
        </button>
      </div>
      {isCameraOpen && (
        <div className="m-2">
          <div>
            {imgSrc ? (
              <img src={imgSrc} alt="webcam" />
            ) : (
              <Webcam width={300} height={40} ref={webCamRef} />
            )}
            <div className="flex justify-center">
              <button
                onClick={capture}
                className="bg-black w-[100px] h-[40px] text-white rounded-[36px] m-1"
              >
                Capture
              </button>
              <button
                className="bg-black text-white w-[100px] h-[40px] m-1 rounded-[36px]"
                onClick={handleWebCamImageUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebCam;
