// import { useEffect, useRef, useState } from 'react';
// import Modal from '../../../ui/Modal';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import CommentCard from './CommentCard';

// import { CloseIcon } from '../../../ui/Icons/CloseIcon';
// import {
//   useCreateNewComment,
//   useGetCurrentUserData,
//   useGetPostById,
// } from '../../../functions/ReactQuery/queries';
// import CommentCardSkeleton from '../../../ui/CommentCardSkeleton';

// const Comment = () => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { data: currentUser } = useGetCurrentUserData();
//   const [input, setInput] = useState('');
//   const { id } = useParams();
//   const { data: post, isPending: isLoading } = useGetPostById(id ?? '');
//   const navigate = useNavigate();
//   const user = useSelector((state: any) => state.auth);
//   const { mutateAsync: createCommentMutate } = useCreateNewComment(
//     id ?? '',
//     currentUser
//   );
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [input]);
//   async function submitHandler() {
//     if (!input.trim()) {
//       return;
//     }
//     try {
//       const commentData: {
//         id: string;
//         userId: string;
//         postId: string;
//         comment: string;
//       } = {
//         id: Math.random().toString(),
//         userId: user.user.id,
//         comment: input,
//         postId: id ?? '',
//       };
//       setInput('');
//       const comment = await createCommentMutate(commentData);

//       if (!comment) throw new Error();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Modal>
//       <div className="bg-black rounded-lg p-5 flex  flex-col gap-4 sm:w-[450px] w-[95%] text-white">
//         <div className="w-full flex justify-between items-center flex-shrink-0">
//           <div>
//             <span>{post?.comments.length} </span> Comments
//           </div>
//           <button
//             onClick={() => {
//               var modal = document.getElementById('modal');
//               modal?.classList.remove('active2');
//               navigate('..');
//             }}
//           >
//             <CloseIcon className="fill-orange-500 w-[25px] h-[25px]" />
//           </button>
//         </div>

//         <div className="flex items-center gap-3 w-full flex-shrink-0 ">
//           <img
//             src={user.user.profileUrl}
//             alt=""
//             height={40}
//             className="rounded-full w-[12%]"
//           />
//           <div className="flex-grow space-y-2">
//             <input
//               type="text"
//               onChange={(e) => {
//                 setInput(e.target.value);
//               }}
//               ref={inputRef}
//               value={input}
//               className=" w-full  outline-none bg-transparent border-[0px] border-solid border-b-white p-1 border-b"
//               placeholder="Add a comment..."
//             />
//             <div className={`flex justify-end items-center`}>
//               {/* <div className="px-3 py-2 rounded-[30px]">Cancel</div> */}
//               <button
//                 disabled={!input.trim()}
//                 onClick={submitHandler}
//                 className="text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white disabled:bg-opacity-20 px-3 py-2 rounded-[30px] inline-flex items-center bg-orange-500 "
//               >
//                 Comment
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-1S flex flex-col gap-4 scrollbar h-[150px] overflow-y-visible">
//           {isLoading ? (
//             Array(2)
//               .fill(0)
//               .map((_, index) => <CommentCardSkeleton key={index} />)
//           ) : (
//             <>
//               {post?.comments.length > 0 ? (
//                 post?.comments
//                   .sort(
//                     (a: any, b: any) =>
//                       new Date(b.$updatedAt).getTime() -
//                       new Date(a.$updatedAt).getTime()
//                   )
//                   .map((comment: any, index: any) => (
//                     <CommentCard
//                       comment={comment}
//                       key={index}
//                       postId={id ?? ''}
//                     />
//                   ))
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   {' '}
//                   <p>No comments yet</p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default Comment;

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
    <Modal className=" rounded  flex  flex-col   text-white flex-between gap-10 w-full items-center justify-center p-5  ">
      <div className="w-full  pt-5 flex justify-end">
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
            className="w-full h-full object-cover"
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
          <div className="flex flex-col gap-1 p-1  flex-grow w-full ">
            <div>
              <div className=" p-3 flex flex-col gap-4 w-full text-white justify-between flex-grow pt-4">
                <div className="w-full flex justify-between items-center">
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
                      src={post?.creator.profileUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full aspect-square"
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
