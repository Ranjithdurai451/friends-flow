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
  useGetUser,
  useLikePost,
  useSavePost,
} from '../../../functions/ReactQuery/queries';
import { useSelector } from 'react-redux';
type PostStatsProps = {
  post: any;
  userId: string;
  isPostDetail: boolean;
};

const PostStats = ({ post, userId, isPostDetail }: PostStatsProps) => {
  // const { data: currentUser, isSuccess } = useGetCurrentUserData();
  const user = useSelector((state: any) => state.auth.user);
  const { data: currentUser, isSuccess } = useGetUser(user?.id);
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

      deleteSavedPostMutate({ postId: savedPostId ?? '' });
      setIsSaved(false);
    } else {
      id = Math.random().toString();
      savePostMutate({ postId: post?.$id, userId, id });
      setIsSaved(true);
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
              <LikedIcon className="w-[25px] h-[25px] fill-orange-500" />
            ) : (
              <LikeIcon className="w-[25px] h-[25px] fill-orange-500" />
            )}
          </>
          <span>{likes?.length}</span>
        </button>
        {!isPostDetail && (
          <Link
            to={`/in/comments/${post.$id}`}
            className="flex items-center gap-1"
          >
            <CommentIcon className="w-[25px] h-[25px] fill-orange-500" />
            <span>{post?.comments?.length}</span>
          </Link>
        )}
      </div>

      <button onClick={handleSave}>
        {isSaved ? (
          <Saved2Icon className="w-[25px] h-[25px] fill-orange-500" />
        ) : (
          <SaveIcon className="w-[25px] h-[25px] fill-orange-500" />
        )}
      </button>
    </div>
  );
};

export default PostStats;
