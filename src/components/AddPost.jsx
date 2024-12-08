import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import BG_DEFAULT_IMG from "../assets/icons-images/bg_default.png";
import { nanoid } from "nanoid";
import { EDIT_ICON } from "../assets/icons-images/icons";
import WebCam from "./WebCam";
import UserDetailsContext from "../contexts/UserDetails";
const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [webCamUrl, setWebCamUrl] = useState("");
  const { userInfo, setUserInfo } = useContext(UserDetailsContext);
  useEffect(() => {
    if (Object.keys(userInfo).length === 0)
      setUserInfo(JSON.parse(localStorage.getItem("sm-auth")));
  }, [setUserInfo, userInfo]);

  const handleUploadImage = (e) => {
    // if (!imageUpload) return alert("select some image to upload.");
    const imageName = e.target.files[0].name + Date.now();
    const imageStorageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageStorageRef, e.target.files[0]).then(() => {
      getDownloadURL(imageStorageRef)
        .then((url) => {
          setImageUrls([...imageUrls, url]);
          alert("file uploaded");
        })
        .catch((err) => console.log(err));
    });
  };
  const handleTags = () => {
    if (tagName) {
      setTags([...tags, tagName]);
      setTagName("");
    }
  };
  const handleWebCamImageUpload = () => {
    const imageName = userInfo.user_name + Date.now();
    const imageStorageRef = ref(storage, `images/${imageName}`);
    uploadString(imageStorageRef, webCamUrl, "data_url").then(() => {
      getDownloadURL(imageStorageRef)
        .then((url) => {
          setImageUrls([...imageUrls, url]);
          alert("file uploaded");
        })
        .catch((err) => console.log(err));
    });
  };
  const handleUploadPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        post_id: nanoid(),
        user_email: userInfo.user_email,
        user_name: userInfo.user_name,
        user_photo: userInfo.user_photo,
        desc: desc,
        tags: tags,
        images: imageUrls,
        timestamp: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div>
          <div className="pl-4 pt-2">
            <p className="font-bold text-[21px] font-sans">New Post</p>
          </div>
          <div className="ml-6 mb-1">
            <WebCam
              setWebCamUrl={setWebCamUrl}
              handleWebCamImageUpload={handleWebCamImageUpload}
            />
          </div>
          <div className="w-full flex justify-center relative">
            <img
              src={BG_DEFAULT_IMG}
              alt="loading"
              loading="lazy"
              className="w-[92%] h-[170px] rounded-b-md"
            />
            <div className="w-[87px] h-[87px] rounded-full flex justify-center items-center absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-gray-400">
              <img
                src={EDIT_ICON}
                alt="loading"
                className="w-[45px] h-[45px]"
              />
              <div className="absolute inset-0 w-[100px] h-[300px] rounded-full top-[30px] opacity-0">
                <input
                  type="file"
                  className="w-[100%] h-[100%] fixed top-0 left-0"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </div>
          <div>
            {imageUrls.length > 0 && (
              <div className="flex">
                {imageUrls.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="loading"
                    loading="lazy"
                    className="w-[45px] h-[45px] rounded-md m-2 "
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center m-1">
            <textarea
              placeholder="write caption for post ..."
              className="w-[95%] h-[100px] rounded-md border border-gray-400 p-1 font-bold"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <input
              className="w-[65%] h-[50px] rounded-md border border-gray-300 p-1 m-1"
              placeholder="add tags"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <button
              className="w-[100px] h-[50px] rounded-md bg-[#313131]  cursor-pointer text-white font-bold m-1"
              onClick={handleTags}
            >
              add
            </button>
          </div>
          {tags.length >= 1 && (
            <div className="flex flex-wrap">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-md p-1 text-[15px] w-fit h-fit text-white font-bold m-[3px]"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div className="fixed bottom-2 transform -translate-x-1/2 left-1/2">
            <button
              className="w-[350px] h-[50px] bg-black text-white font-medium text-center rounded-[36px]"
              onClick={handleUploadPost}
            >
              CREATE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
