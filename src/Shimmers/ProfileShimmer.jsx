const ProfileShimmer = () => {
  return (
    <div className="flex justify-center p-2">
      <div>
        <div className="flex justify-center m-2 p-1">
          <div className="w-[85%] h-[300px] rounded-md animate-pulse bg-gray-300 m-2 p-2"></div>
        </div>
        <div className="m-3 p-2 flex justify-center">
          <div>
            <div className="w-[200px] h-[15px] rounded-md bg-gray-300 animate-pulse m-2 p-2"></div>
            <div className="w-[200px] h-[15px] rounded-md bg-gray-300 animate-pulse m-2 p-2"></div>
          </div>
        </div>
        <div className="flex justify-center p-2 m-3">
          <div className="w-[150px] h-[150px] rounded-md bg-gray-300 animate-pulse m-2 p-2"></div>
          <div className="w-[150px] h-[150px] rounded-md bg-gray-300 animate-pulse m-2 p-2 "></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
