import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import PostShimmer from "../Shimmers/PostShimmer";
import { LEFT_ARROW, RIGHT_ARROW } from "../assets/icons-images/icons";
import { getTimeStamp } from "../helpers/getTimestamp";
import UserDetailsContext from "../contexts/UserDetails";
import USER_DEFAULT_IMG from "../assets/icons-images/user_default.png";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState([]);
  const [lastVisible, setLastVisible] = useState("");
  const [trigger, setTrigger] = useState(false);
  const observer = useRef();
  const lastNodeRef = (node) => {
    console.log("calling for infinite scroll.");
    console.log("in infinte scroll function",lastVisible)
    if (isLoading || lastVisible === undefined) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTrigger(!trigger);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (node) observer.current.observe(node);
  };

  const { userInfo, setUserInfo } = useContext(UserDetailsContext);

  useEffect(() => {
    const getAllPosts = async () => {
      if (lastVisible === undefined) return alert("all posts over");
      if (Object.keys(userInfo).length === 0) {
        setUserInfo(JSON.parse(localStorage.getItem("sm-auth")));
      }
      if (posts.length === 0) {
        const initialFetch = query(collection(db, "posts"), limit(3));
        const documentSnapshots = await getDocs(initialFetch);
        const lV = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lV);
        let allPosts = [];
        documentSnapshots.forEach((doc) => {
          allPosts.push(doc.data());
        });
        setPosts(allPosts);
        setImageIndex(Array(allPosts.length).fill(0));
        setIsLoading(false);
      } else {
        const nextFetch = query(
          collection(db, "posts"),
          startAfter(lastVisible),
          limit(3)
        );
        const documentSnapshots = await getDocs(nextFetch);
        const lV = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lV);
        let allPosts = [];
        documentSnapshots.forEach((doc) => {
          allPosts.push(doc.data());
        });
        setPosts([...posts, ...allPosts]);
        setImageIndex([...imageIndex, ...Array(allPosts.length).fill(0)]);
      }
    };
    getAllPosts();
  }, [trigger]);

  return (
    <>
      {console.log("all posts", posts)}
      {isLoading ? (
        <div className="flex justify-center">
          <PostShimmer />
        </div>
      ) : (
        <div className="p-1">
          <div className="flex ml-[17px] p-1 items-center">
            <div>
              <img
                src={
                  userInfo.user_photo ? userInfo.user_photo : USER_DEFAULT_IMG
                }
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
                  {userInfo.user_name}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className=" p-2 m-2 ml-[17px] text-[26px] font-bold font-sans">
              Feeds
            </p>
          </div>
          {posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div
                  key={post.post_id}
                  className="w-[92%] h-fit p-2 m-2 ml-[15px] rounded-4xl bg-[#F7EBFF]"
                  ref={lastNodeRef}
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
                          if (imageIndex[index] === post.images.length - 1)
                            return;
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
                  </div>
                </div>
              );
            } else {
              return (
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
                          if (imageIndex[index] === post.images.length - 1)
                            return;
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
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default Feeds;
