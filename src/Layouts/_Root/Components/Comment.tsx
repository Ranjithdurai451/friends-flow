import { Link, useNavigate, useParams } from 'react-router-dom';
import { multiFormatDateString } from '../../../functions';
import { useSelector } from 'react-redux';
import DeleteIcon from '../../../ui/Icons/DeleteIcon';
import Spinner from '../../../ui/Spinner';
import CommentCard from '../Components/CommentCard';
import { ID } from 'appwrite';
import { useEffect, useRef, useState } from 'react';
import PostStats from '../Components/PostStats';
import {
  useCreateNewComment,
  useDeletePost,
  useGetCurrentUserData,
  useGetPostById,
} from '../../../functions/ReactQuery/queries';
import Modal from '../../../ui/Modal';
import { CloseIcon } from '../../../ui/Icons/CloseIcon';

const Comment = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.auth.user);
  const { data: post, isPending: isLoading } = useGetPostById(id ?? '');

  const { mutateAsync, isPending: isDeletingPost } = useDeletePost(id ?? '');
  const navigate = useNavigate();
  async function deleteHandler() {
    try {
      const perform = confirm('Are you sure you want to delete this post?');
      if (!perform) return;
      await mutateAsync({
        postId: id ?? '',
        imageId: post?.imageId,
      });
      navigate('/in');
    } catch (error) {
      alert('failed to delete');
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const { data: currentUser } = useGetCurrentUserData();
  const [input, setInput] = useState('');

  const { mutateAsync: createCommentMutate } = useCreateNewComment(
    id ?? '',
    currentUser
  );
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [input]);
  async function submitHandler() {
    if (!input.trim()) {
      return;
    }
    try {
      const commentData: {
        id: string;
        userId: string;
        postId: string;
        comment: string;
      } = {
        id: ID.unique(),
        userId: user.id,
        comment: input,
        postId: id ?? '',
      };
      setInput('');
      const comment = await createCommentMutate(commentData);

      if (!comment) throw new Error();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal className="flex flex-col items-center justify-center w-full gap-10 p-5 text-white rounded flex-between">
      <div className="flex justify-end w-full pt-5">
        <button
          onClick={() => {
            var modal = document.getElementById('modal');
            modal?.classList.remove('active2');
            navigate('..');
          }}
        >
          <CloseIcon className="fill-white lg:w-[45px] lg:h-[45px] w-[30px] h-[30px]" />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row sm:w-[75dvw] w-[95dvw] sm:h-[80vh]   text-white bg-black   flex-shrink-0 ">
        <main className="lg:w-[55%] w-full lg:block hidden">
          <img
            src={post?.imageUrl}
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </main>
        <div className="lg:w-[45%] w-full h-full flex flex-col justify-between ">
          <header className="flex gap-3  justify-center w-full items-center p-3 border-[0px] border-b-[1px] border-orange-500 border-solid border-opacity-20">
            <img
              src={post?.creator.profileUrl}
              alt=""
              width={40}
              height={40}
              className="rounded-full aspect-square"
            />
            <div className="flex flex-col flex-grow">
              <span className="text-[18px] capitalize">
                {post?.creator.name}
              </span>
              <div className="flex gap-2 text-sm text-white text-opacity-30">
                <span> {multiFormatDateString(post?.$createdAt)}</span>
                <span> - {post?.location}</span>
              </div>
            </div>
            <div>
              {post?.creator.$id == user?.id && (
                <div className="flex items-center justify-center gap-3">
                  <Link to={`/in/update-post/${post?.$id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      className="fill-orange-500"
                    >
                      <path d="M18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                      <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 002-2v-8.668l-2 2V19z"></path>
                    </svg>
                  </Link>
                  <button onClick={deleteHandler}>
                    {isDeletingPost ? (
                      <Spinner />
                    ) : (
                      <DeleteIcon className="fill-orange-500 w=[35px] h-[35px]" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </header>
          <div className="flex flex-col flex-grow w-full gap-1 p-1 ">
            <div>
              <div className="flex flex-col justify-between flex-grow w-full gap-4 p-3 pt-4 text-white ">
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-white text-opacity-50">
                    <span>{post?.comments.length} </span> Comments
                  </div>
                </div>

                <div className="min-h-[350px] max-h-[3px] flex-grow overflow-y-scroll flex flex-col gap-4 scrollbar border-[0px] border-b-[1px] border-orange-500 border-solid border-opacity-20">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      {post?.comments.length > 0 ? (
                        post?.comments
                          .sort(
                            (a: any, b: any) =>
                              new Date(b.$updatedAt).getTime() -
                              new Date(a.$updatedAt).getTime()
                          )
                          .map((comment: any) => (
                            <CommentCard
                              comment={comment}
                              key={comment.$id}
                              postId={id ?? ''}
                            />
                          ))
                      ) : (
                        <p>No comments yet</p>
                      )}
                    </>
                  )}
                </div>
                <PostStats post={post} userId={user.id} isPostDetail={true} />
                <div className="w-full h-[80px] flex-grow  flex justify-center items-center flex-shrink-0 space-y-2 gap-3 border-[0px] border-t-[1px] border-orange-500 border-solid border-opacity-20">
                  <div className="rounded-full">
                    <img
                      src={user.profileUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full aspect-square"
                      loading="lazy"
                    />
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    ref={inputRef}
                    value={input}
                    className=" flex-grow  outline-none py-2 bg-transparent border-[0px] border-b-[1px] border-orange-500 border-solid border-opacity-20"
                    placeholder="Add a comment..."
                  />
                  <div className={`flex justify-end items-center`}>
                    <button
                      disabled={!input.trim()}
                      onClick={submitHandler}
                      className="disabled:cursor-not-allowed disabled:opacity-50  px-3 text-orange-500  text-[18px] "
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
