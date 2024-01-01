import LikeIcon from '../../../ui/Icons/LikeIcon';
import CommentIcon from '../../../ui/Icons/CommentIcon';
import { Link } from 'react-router-dom';

const NewPostCard = ({ post }: { post: any }) => {
  console.log(post);
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

        <div className="absolute z-10 hidden inset-0 p-3 group-hover:flex items-center justify-between  duration-300 w-full bg-black bg-opacity-70">
          <div className="flex items-center gap-10 w-full justify-center">
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
        <div className="absolute left-0 bottom-0 z-0 p-3 flex items-center justify-between  duration-300 w-full ">
          <img
            src={post?.creator?.profileUrl}
            className="
          w-[40px] h-[40px] rounded-full"
            alt=""
          />
        </div>
      </Link>
    </div>
  );
};

export default NewPostCard;
