import Skeleton from 'react-loading-skeleton';

const NewPostCardSkeleton = () => {
  return (
    <div className="mt-4 group w-full">
      <div className="text-white h-[300px] mt-6  rounded-[20px] relative overflow-hidden ">
        <Skeleton className=" h-full w-full rounded-[20px] object-cover" />
      </div>
    </div>
  );
};

export default NewPostCardSkeleton;
