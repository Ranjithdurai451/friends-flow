import LikeIcon from '../../../ui/Icons/LikeIcon';
import CommentIcon from '../../../ui/Icons/CommentIcon';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewPostCard = ({ post }: { post: any }) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <div className="mt-4 group">
      <Link
        to={`/in/post-detail/${post?.$id}`}
        className="text-white h-[auto] mt-6  rounded-[20px] relative overflow-hidden "
      >
        <img
          src={post?.imageUrl}
          alt=""
          className=" h-auto w-full rounded-[20px] object-cover"
        />

        <div className="absolute inset-0 z-10 items-center justify-between hidden w-full p-3 duration-300 bg-black group-hover:flex bg-opacity-70">
          <div className="flex items-center justify-center w-full gap-10">
            <button className="flex items-center gap-1">
              <LikeIcon className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] fill-orange-500" />
              <span>{post?.likes?.length}</span>
            </button>
            <button className="flex items-center gap-1">
              <CommentIcon className="md:w-[35px] md:h-[35px]  w-[25px] h-[25px] fill-orange-500" />
              <span>{post?.comments?.length}</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-0 flex items-center justify-between w-full p-3 duration-300 ">
          {post?.creator?.profileUrl ? (
            <img
              src={post?.creator?.profileUrl}
              className="
          w-[40px] h-[40px] rounded-full"
              alt=""
              loading="lazy"
            />
          ) : (
            <img
              src={user?.profileUrl}
              className="
          w-[40px] h-[40px] rounded-full"
              alt=""
              loading="lazy"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default NewPostCard;
