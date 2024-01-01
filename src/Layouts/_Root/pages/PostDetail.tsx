import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from '../../../ui/Loader';
import { multiFormatDateString } from '../../../functions';
import { useSelector } from 'react-redux';
import DeleteIcon from '../../../ui/Icons/DeleteIcon';
import Spinner from '../../../ui/Spinner';
import CommentCard from '../Components/CommentCard';
import { ID, Models } from 'appwrite';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import PostStats from '../Components/PostStats';
import {
  useCreateNewComment,
  useDeletePost,
  useGetCurrentUserData,
  useGetPostById,
  useSearchPosts,
} from '../../../functions/ReactQuery/queries';
import { useInView } from 'react-intersection-observer';
import NewPostCard from '../Components/NewPostCard';

const PostDetail = () => {
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
  //Recent Posts
  // const { data: posts, isLoading: isLoadingPosts } = useSearchPosts(
  //   post?.caption
  // );
  const {
    data: posts,
    isFetching,
    fetchNextPage: searchNextPage,
    hasNextPage: hasSearchNextPage,
  } = useSearchPosts(post?.caption);
  const { ref: searchRef, inView: searchInview } = useInView();
  useEffect(() => {
    if (searchInview) {
      searchNextPage();
    }
  }, [searchInview]);

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <div className="py-12 px-8">
          <div className="w-full flex-col gap-6">
            <div className="flex flex-col lg:flex-row w-full gap-6 lg:h-[70vh] text-white bg-white bg-opacity-[0.06] p-5 rounded-[20px] flex-shrink-0 ">
              <main className="lg:w-[40%] w-full">
                <img
                  src={post?.imageUrl}
                  alt=""
                  className="w-full rounded-[20px] h-full object-cover"
                />
              </main>
              <div className="lg:w-[60%] w-full">
                <header className="flex gap-3 justify-center items-center ">
                  <Link
                    to={`/in/profile/${post?.creator.$id}`}
                    className="rounded-full"
                  >
                    <img
                      src={post?.creator.profileUrl}
                      alt=""
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </Link>
                  <div className="flex flex-col flex-grow">
                    <span className="text-md capitalize">
                      {post?.creator.name}
                    </span>
                    <div className="flex gap-2 text-sm text-white text-opacity-30">
                      <span> {multiFormatDateString(post?.$createdAt)}</span>
                      <span> - {post?.location}</span>
                    </div>
                  </div>
                  <div>
                    {post?.creator.$id == user?.id && (
                      <div className="flex gap-3 justify-center items-center">
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
                <div className="flex flex-col gap-1 p-1">
                  <p className="capitalize">{post?.caption}</p>
                  <div className="flex flex-wrap w-full gap-2 text-sm text-white text-opacity-30">
                    {post?.tags.map((tag: any, index: any) => (
                      <span key={index}>#{tag}</span>
                    ))}
                  </div>
                  <PostStats post={post} userId={user.id} isPostDetail={true} />
                  <div>
                    <div className=" p-3 flex flex-col gap-7 w-full text-white">
                      <div className="w-full flex justify-between items-center">
                        <div className="text-md">
                          <span>{post?.comments.length} </span> Comments
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full ">
                        <img
                          src={user.profileUrl}
                          alt=""
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div className="flex-grow space-y-2">
                          <input
                            type="text"
                            onChange={(e) => {
                              setInput(e.target.value);
                            }}
                            ref={inputRef}
                            value={input}
                            className=" w-full  outline-none bg-transparent border-[0px] border-solid border-b-white p-1 border-b"
                            placeholder="Add a comment..."
                          />
                          <div className={`flex justify-end items-center`}>
                            {/* <div className="px-3 py-2 rounded-[30px]">Cancel</div> */}
                            <button
                              disabled={!input.trim()}
                              onClick={submitHandler}
                              className="disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white disabled:bg-opacity-20 px-3 py-2 rounded-[30px] inline-flex items-center bg-white text-black "
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="max-h-[300px] overflow-y-scroll flex flex-col gap-4 scrollbar">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-3xl text-white px-6">More Related Posts</h1>
              {/* {isLoadingPosts ? (
                <Spinner />
              ) : posts?.documents.filter((post: any) => post.$id !== id)
                  .length == 0 ? (
                <p className="text-white p-5">No related posts available</p>
              ) : (
                <>
                  <div className="columns-1 lg:columns-3 md:columns-2 xl:columns-4 gap-x-8  w-full p-5">
                    {posts?.documents
                      .filter((post: any) => post.$id !== id)
                      .map((post: any) => (
                        <Link to={`/in/post-detail/${post.$id}`} key={post.$id}>
                          <img
                            className="w-full h-auto object-cover mt-5 rounded-[15px]"
                            src={post?.imageUrl}
                            alt={post?.caption}
                            key={post.$id}
                          />
                        </Link>
                      ))}
                  </div>
                </>
              )} */}
              {isFetching ? (
                <div className="text-white">Loading...</div>
              ) : posts?.pages?.reduce(
                  (acc, page) => acc + page?.documents?.length,
                  0
                ) === 0 ? (
                <div>No results found</div>
              ) : (
                <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-5">
                  {posts?.pages?.map((page) =>
                    page?.documents
                      ?.filter((post: any) => post.$id !== id)
                      .map((post: Models.Document) => (
                        <NewPostCard key={post.$id} post={post}></NewPostCard>
                      ))
                  )}
                  <div ref={searchRef}>{hasSearchNextPage && <Spinner />}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(PostDetail);
