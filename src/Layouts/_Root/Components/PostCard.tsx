import { Models } from 'appwrite';
import { multiFormatDateString } from '../../../functions';
import { useSelector } from 'react-redux';
import PostStats from './PostStats';
import { Link } from 'react-router-dom';
import {
  useGetPostById,
  useGetUser,
} from '../../../functions/ReactQuery/queries';
type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const {} = useGetPostById(post.$id ?? '');
  const {} = useGetUser(post.creator.$id);

  return (
    <div className="flex flex-col w-full text-white bg-white bg-opacity-5 sm:p-5 p-2 rounded-[20px] flex-shrink-0 border-[0px] border-b-[1px] border-b-red-600 shadow-md border-solid border-opacity-20 ">
      <header className="flex gap-3 justify-center items-center">
        <Link to={`/in/profile/${post.creator.$id}`} className="rounded-full">
          <img
            src={post.creator.profileUrl}
            alt=""
            width={45}
            height={45}
            className="rounded-full aspect-square"
          />
        </Link>
        <div className="flex flex-col flex-grow">
          <span className="text-md capitalize">{post.creator.name}</span>
          <div className="flex gap-2 text-sm text-white text-opacity-30">
            <span> {multiFormatDateString(post.$createdAt)}</span>
            <span> - {post.location}</span>
          </div>
        </div>
        {post.creator.$id == user.id && (
          <div>
            <Link to={`/in/update-post/${post.$id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                className="fill-red-600"
              >
                <path d="M18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 002-2v-8.668l-2 2V19z"></path>
              </svg>
            </Link>
          </div>
        )}
      </header>
      <Link to={`/in/post-detail/${post.$id}`} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 p-1">
          <p className="capitalize">{post.caption}</p>
          <div className="flex flex-wrap w-full gap-2 text-sm text-white text-opacity-30">
            {post.tags.map((tag: any, index: any) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        </div>
        <main>
          <img
            src={post.imageUrl}
            alt=""
            className="w-full rounded-[20px] h-[350px] object-cover  "
          />
        </main>
      </Link>

      <div className="py-5">
        <PostStats post={post} userId={user.id} isPostDetail={false} />
      </div>
    </div>
  );
};

export default PostCard;
