import Skeleton from 'react-loading-skeleton';

const UserCardSkeleton = () => {
  return (
    <div className="text-white h-[250px] mt-6 w-[150px] sm:w-[250px]  rounded-[20px] relative overflow-hidden ">
      <Skeleton className=" h-full w-full rounded-[20px] object-cover" />

      <div className="absolute inset-0 z-10 p-3 flex items-center justify-between  duration-300 w-full flex-col gap-4 ">
        <Skeleton
          className="
          w-[75px] h-[75px] rounded-full mt-5"
        />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
