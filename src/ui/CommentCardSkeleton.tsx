import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CommentCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex gap-5">
        <div>
          <Skeleton width={35} height={35} circle />
        </div>
        <div className="flex w-[80%] flex-col gap-1">
          <Skeleton count={2} height={12} />
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
