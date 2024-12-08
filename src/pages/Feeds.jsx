import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import PostShimmer from "../Shimmers/PostShimmer";
import { LEFT_ARROW, RIGHT_ARROW } from "../assets/icons-images/icons";
import { getTimeStamp } from "../helpers/getTimestamp";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      let allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
      setPosts(allPosts);
      setImageIndex(Array(allPosts.length).fill(0));
      setIsLoading(false);
    };
    getAllPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <PostShimmer />
        </div>
      ) : (
        <div className="p-1">
          <div className="flex ml-[17px] p-1 items-center">
            <div>
              <img
                src={JSON.parse(localStorage.getItem("sm-auth")).user_photo}
                alt="loading"
                className="w-[75px] h-[75px] rounded-full"
              />
            </div>
            <div className="ml-[7px]">
              <div>
                <p className="text-gray-500 text-[16px]">Welcome Back,</p>
              </div>
              <div>
                <p className="text-[25px] font-semibold">
                  {JSON.parse(localStorage.getItem("sm-auth")).user_name}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className=" p-2 m-2 ml-[17px] text-[26px] font-bold font-sans">
              Feeds
            </p>
          </div>
          {/* {console.log(imageIndex)} */}
          {posts.map((post, index) => (
            <div
              key={post.post_id}
              className="w-[92%] h-fit p-2 m-2 ml-[15px] rounded-4xl bg-[#F7EBFF]"
            >
              <div className="flex justify-start p-3">
                <div>
                  <div className="">
                    <img
                      src={post.user_photo}
                      className="w-[70px] h-[70px] rounded-full"
                      alt="loading"
                    />
                  </div>
                </div>
                <div className="ml-[6px] mt-[3px]">
                  <div>
                    <p className="text-[17px]">{post.user_name}</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-600">
                      {getTimeStamp(post.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 flex justify-start text-[#313131] font-bold">
                <div>
                  <p>{post.desc}</p>
                  <div className="flex">
                    {post.tags.map((tag, i) => (
                      <div
                        className="text-blue-600 mr-[3px] font-medium"
                        key={i}
                      >
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-1 flex justify-center relative">
                {post.images.length > 1 && (
                  <div
                    className="absolute left-4 top-[45%] bg-[#313131] p-1 rounded-full"
                    onClick={() => {
                      if (imageIndex[index] === 0) return;
                      let newImagesIndex = [];
                      for (let i = 0; i < imageIndex.length; i++) {
                        if (i === index) {
                          newImagesIndex.push(imageIndex[i] - 1);
                        } else {
                          newImagesIndex.push(imageIndex[i]);
                        }
                      }
                      setImageIndex(newImagesIndex);
                    }}
                  >
                    <img
                      src={LEFT_ARROW}
                      alt="loading"
                      loading="lazy"
                      className="w-[30px] h-[30px]"
                    />
                  </div>
                )}
                {post.images.length > 1 && (
                  <div
                    className="absolute right-4 top-[45%] bg-[#313131] p-1 rounded-full"
                    onClick={() => {
                      if (imageIndex[index] === post.images.length - 1) return;
                      let newImagesIndex = [];
                      for (let i = 0; i < imageIndex.length; i++) {
                        if (i === index) {
                          newImagesIndex.push(imageIndex[i] + 1);
                        } else {
                          newImagesIndex.push(imageIndex[i]);
                        }
                      }
                      setImageIndex(newImagesIndex);
                    }}
                  >
                    <img
                      src={RIGHT_ARROW}
                      alt="loading"
                      loading="lazy"
                      className="w-[30px] h-[30px]"
                    />
                  </div>
                )}

                <img
                  className="w-[96%] h-[210px] rounded-md"
                  src={post.images[imageIndex[index]]}
                  alt="loading"
                  loading="lazy"
                />
                {/* {post.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-[96%] h-[210px] rounded-md"
                    src={image}
                    alt="loading"
                    loading="lazy"
                  />
                ))} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Feeds;
