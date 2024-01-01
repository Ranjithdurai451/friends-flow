import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col sm:w-full w-[80vw] text-white bg-white bg-opacity-5 p-5 rounded-[20px] flex-shrink-0">
      <header className="flex gap-3 justify-center items-center">
        <div className="rounded-full">
          <Skeleton width={45} height={45} circle />
        </div>
        <div className="flex flex-col flex-grow">
          <span className="text-md capitalize">
            <Skeleton />
          </span>
        </div>
      </header>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 p-1">
          <p className="capitalize">
            <Skeleton />
          </p>
          <p className="capitalize">
            <Skeleton />
          </p>
        </div>
        <main>
          <Skeleton className="w-full h-[400px] rounded-[20px]" />
        </main>
      </div>
      <div>
        <Skeleton count={2} />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
