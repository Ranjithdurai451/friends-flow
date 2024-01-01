import React from 'react';
import Skeleton from 'react-loading-skeleton';

const NewPostCardSkeleton = () => {
  return (
    <div className="mt-4 group w-full">
      <div className="text-white h-[300px] mt-6  rounded-[20px] relative overflow-hidden ">
        <Skeleton className=" h-full w-full rounded-[20px] object-cover" />

        <div className="absolute left-0 bottom-0 z-10 p-3 flex items-center justify-between  duration-300 w-full ">
          <Skeleton
            className="
          w-[40px] h-[40px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPostCardSkeleton;
