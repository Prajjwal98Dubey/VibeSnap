import { useState } from "react";

const PostShimmer = () => {
  const [postShimmer] = useState(Array(2).fill(""));
  return (
    <>
      <div className="w-full p-1">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="w-[80%] h-[15px] bg-gray-200 rounded-md m-2 p-1 animate-pulse ml-[35px]"></div>
            <div className="w-[80%] h-[15px] bg-gray-200 rounded-md m-2 p-1 animate-pulse ml-[35px]"></div>
          </div>
        </div>

        {postShimmer.map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-4xl w-[95%] h-[400px] animate-pulse p-2 m-2 ml-[8px]"
          ></div>
        ))}
      </div>
    </>
  );
};

export default PostShimmer;

// bg-[#F7EBFF]
