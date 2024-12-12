import { useContext, useEffect, useState } from "react";
import UserDetailsContext from "../contexts/UserDetails";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const MyPosts = () => {
  const { userInfo } = useContext(UserDetailsContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMyPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("user_email", "==", userInfo.user_email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        let allPosts = [];
        querySnapshot.forEach((doc) => {
          allPosts.push({ ...doc.data() });
        });
        setPosts(allPosts);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    getMyPosts();
  }, [userInfo.user_email]);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {posts.length >= 1 ? (
            <div className="flex flex-wrap p-2 ml-[3px] w-full">
              {posts.map((post, index) => (
                <div key={index} className="w-1/2 h-[170px] p-1 relative">
                  {post.isVideo && (
                    <video controls className="h-[145px]">
                      <source src={post.images[0]} />
                    </video>
                  )}
                  {!post.isVideo && post.images.length > 1 && (
                    <div className="absolute right-2 top-2 bg-white w-[40px] h-[23px] text-[15px] rounded-[10px] flex justify-center items-center p-2">
                      1/{post.images.length}
                    </div>
                  )}
                  {!post.isVideo && (
                    <img
                      src={post.images[0]}
                      alt="loading"
                      className="w-full h-full rounded-[12px]"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center font-medium text-[20px]">No Posts </div>
          )}
        </>
      )}
    </>
  );
};

export default MyPosts;
