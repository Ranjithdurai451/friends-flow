import { Models } from 'appwrite';
import LikeIcon from '../../../ui/Icons/LikeIcon';
import { useEffect, useState } from 'react';
import LikedIcon from '../../../ui/Icons/LikedIcon';
import CommentIcon from '../../../ui/Icons/CommentIcon';
import { Link } from 'react-router-dom';
import SaveIcon from '../../../ui/Icons/SaveIcon';
import { Saved2Icon } from '../../../ui/Icons/Saved2Icon';
import {
  useDeleteSavedPost,
  useGetCurrentUserData,
  useLikePost,
  useSavePost,
} from '../../../functions/ReactQuery/queries';

type PostStatsProps = {
  post: any;
  userId: string;
  isPostDetail: boolean;
};

const PostStats = ({ post, userId, isPostDetail }: PostStatsProps) => {
  const { data: currentUser, isSuccess } = useGetCurrentUserData();
  // const user = useSelector((state: any) => state.auth.user);
  // const { data: currentUser, isSuccess } = useGetUser(user?.id);
  // console.log(newcurrentUser, currentUser);

  const { mutateAsync: likePostMutate } = useLikePost(post?.$id);
  const likeLists = post?.likes.map((user: Models.Document) => user?.$id);
  const [likes, setLikes] = useState(likeLists);
  const [isSaved, setIsSaved] = useState(false);
  async function handleLike(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePostMutate({ postId: post.$id, likesArray: newLikes });
  }
  function checkIsLiked({
    likes,
    userId,
  }: {
    likes: string[];
    userId: string;
  }) {
    if (likes?.includes(userId)) {
      return true;
    }
    return false;
  }
  const { mutateAsync: savePostMutate } = useSavePost(post?.$id, post);

  const { mutateAsync: deleteSavedPostMutate } = useDeleteSavedPost(
    post?.$id,
    post
  );

  async function handleSave() {
    var id: string = '';
    if (isSaved) {
      var savedPostId;
      currentUser?.saves.forEach((save: any) => {
        if (save.posts.$id === post?.$id) {
          savedPostId = save?.$id;
        }
      });
      setIsSaved(false);
      await deleteSavedPostMutate({ postId: savedPostId ?? '' });
    } else {
      setIsSaved(true);
      id = Math.random().toString();
      await savePostMutate({ postId: post?.$id, userId, id });
    }
  }
  useEffect(() => {
    if (isSuccess) {
      currentUser?.saves.forEach((save: any) => {
        if (save?.posts?.$id === post?.$id) {
          setIsSaved(true);
        }
      });
    }
  }, [isSuccess]);

  return (
    <div className="px-2  flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => handleLike(e)}
          className="flex items-center gap-1"
        >
          <>
            {checkIsLiked({ likes, userId }) ? (
              <LikedIcon className="w-[25px] h-[25px] fill-red-600" />
            ) : (
              <LikeIcon className="w-[25px] h-[25px] fill-red-600" />
            )}
          </>
          <span>{likes?.length}</span>
        </button>
        {!isPostDetail && (
          <Link
            to={`/in/comments/${post.$id}`}
            className="flex items-center gap-1"
          >
            <CommentIcon className="w-[25px] h-[25px] fill-red-600" />
            <span>{post?.comments?.length}</span>
          </Link>
        )}
      </div>

      <button onClick={handleSave}>
        {isSaved ? (
          <Saved2Icon className="w-[25px] h-[25px] fill-red-600" />
        ) : (
          <SaveIcon className="w-[25px] h-[25px] fill-red-600" />
        )}
      </button>
    </div>
  );
};

export default PostStats;
