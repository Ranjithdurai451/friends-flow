import { Link } from 'react-router-dom';
import { useGetPostById } from '../../../functions/ReactQuery/queries';
import CommentIcon from '../../../ui/Icons/CommentIcon';
import LikeIcon from '../../../ui/Icons/LikeIcon';

export const SavedPostCard = ({
  post,
  showStats,
}: {
  post: any;
  showStats?: boolean;
}) => {
  const { data, isSuccess } = useGetPostById(post?.posts.$id);
  return (
    <div className="mt-5 group">
      <Link
        to={`/in/post-detail/${post?.posts.$id}`}
        className="text-white h-[auto] mt-4  rounded-[10px] relative overflow-hidden "
      >
        <img
          src={post?.posts.imageUrl}
          alt=""
          className=" h-auto w-full rounded-[10px] object-cover"
        />
        {isSuccess && (
          <div className="absolute hidden inset-0 p-3 group-hover:flex items-center justify-between  duration-300 w-full bg-black bg-opacity-70">
            <div className="flex items-center gap-10 w-full justify-center">
              <button className="flex items-center gap-1">
                <LikeIcon className="w-[35px] h-[35px] fill-orange-600" />
                <span>{data?.likes?.length}</span>
              </button>
              <button className="flex items-center gap-1">
                <CommentIcon className="w-[35px] h-[35px] fill-orange-600" />
                <span>{data?.comments?.length}</span>
              </button>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
