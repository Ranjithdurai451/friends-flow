import Skeleton from 'react-loading-skeleton';

const UserCardSkeleton = () => {
  return (
    <div className="text-white h-[250px] mt-6 w-[150px] sm:w-[250px]  rounded-[20px] relative overflow-hidden ">
      <Skeleton className=" h-full w-full rounded-[20px] object-cover" />
    </div>
  );
};

export default UserCardSkeleton;
