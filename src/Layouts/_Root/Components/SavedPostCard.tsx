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
  console.log(showStats);
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
          loading="lazy"
        />
        {isSuccess && (
          <div className="absolute inset-0 items-center justify-between hidden w-full p-3 duration-300 bg-black group-hover:flex bg-opacity-70">
            <div className="flex items-center justify-center w-full gap-10">
              <button className="flex items-center gap-1">
                <LikeIcon className="w-[35px] h-[35px] fill-orange-500" />
                <span>{data?.likes?.length}</span>
              </button>
              <button className="flex items-center gap-1">
                <CommentIcon className="w-[35px] h-[35px] fill-orange-500" />
                <span>{data?.comments?.length}</span>
              </button>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
