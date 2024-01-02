import { useSelector } from 'react-redux';
import { multiFormatDateString } from '../../../functions';
import DotIcon from '../../../ui/Icons/DotIcon';
import { useState } from 'react';

import React from 'react';
import {
  useDeleteComment,
  useUpdateComment,
} from '../../../functions/ReactQuery/queries';
type CommentCardProps = {
  comment: any;
  postId: string;
};

const CommentCard = ({ comment, postId }: CommentCardProps) => {
  const [input, setInput] = useState(comment?.comment);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  //deleteComment
  const { mutateAsync: deleteMutate } = useDeleteComment(postId);
  async function deleteHandler() {
    await deleteMutate({ commentId: comment.$id });
    setDialogVisible(false);
  }
  //updateComment
  const { mutateAsync: updateCommentMuatate } = useUpdateComment(postId);
  async function submitHandler() {
    if (!input.trim()) {
      return;
    }
    try {
      updateCommentMuatate({ commentId: comment.$id, comment: input });
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex  gap-3 flex-shrink-0 btn-show overflow-visible ">
      <div>
        <img
          src={comment.user.profileUrl}
          width={40}
          height={40}
          alt=""
          className="rounded-full aspect-square"
        />
      </div>
      {!editMode && (
        <div className="flex w-full flex-col gap-1">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2">
              <div className="text-[15px]">@{comment.user.name}</div>
              <div className=" text-sm text-white text-opacity-30">
                {multiFormatDateString(comment.$updatedAt)}
              </div>
            </div>
            {comment.user.$id == user.id && (
              <>
                <div>
                  {!dialogVisible && (
                    <button
                      className=" p-1 rounded-full hover:bg-white hover:bg-opacity-10"
                      onClick={() => setDialogVisible((state) => !state)}
                    >
                      <DotIcon className="fill-white w-[25px] h-[25px] " />
                    </button>
                  )}

                  {/* {dialogVisible && (
                    <div
                      className={`flex rounded-xl bg-white bg-opacity-10 p-[1px] py-1 gap-1  `}
                    >
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setDialogVisible(false);
                        }}
                        className="flex py-[1px] sm:px-4  sm:gap-2 hover:bg-white hover:bg-opacity-10 rounded-lg items-center"
                      >
                        <EditIcon className="fill-red-600 sm:w-[15px] sm:h-[15px] w-[10px] h-[10px]" />
                        <span className="sm:text-[13px] text-[10px]">Edit</span>
                      </button>
                      {isDeleting ? (
                        <div>Deleting...</div>
                      ) : (
                        <button
                          onClick={deleteHandler}
                          className="flex py-[1px] sm:px-2 gap-1 hover:bg-white hover:bg-opacity-10 rounded-lg  items-center"
                        >
                          <DustBinIcon className="fill-red-600 sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]" />
                          <span className="sm:text-[12px] text-[10px]">
                            Delete
                          </span>
                        </button>
                      )}
                      <button onClick={() => setDialogVisible(false)}>
                        {' '}
                        <CloseIcon className="fill-red-600 w-[25px] h-[25px]" />{' '}
                      </button>
                    </div>
                  )} */}
                </div>
              </>
            )}
          </div>
          <div className="text-[15px]">{comment.comment}</div>
          {/* <div className="mt-2">
            <button className="flex items-center gap-2">
              <LikeIcon className="fill-red-600 w-[20px] h-[20px]" />
              <span>0</span>
            </button>
          </div> */}
        </div>
      )}
      {editMode && (
        <div className="flex-grow space-y-2">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className=" w-full  outline-none bg-transparent border-[0px] border-solid border-b-white p-1 border-b"
            placeholder="Update your comment..."
          />
          <div
            className={`
              flex justify-end items-center`}
          >
            <div
              onClick={() => {
                setEditMode(false);
              }}
              className="px-3 py-2 rounded-[30px] cursor-pointer"
            >
              Cancel
            </div>
            <button
              disabled={!input.trim()}
              onClick={submitHandler}
              className="text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white disabled:bg-opacity-20 px-3 py-2 rounded-[30px] inline-flex items-center bg-red-600 "
            >
              Update
            </button>
          </div>
        </div>
      )}
      {dialogVisible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDialogVisible(false);
          }}
          className="w-screen h-screen fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center"
        >
          <div className="bg-black">
            <div className="bg-white bg-opacity-20 rounded-xl sm:w-[350px] w-[80vw] flex flex-col">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditMode(true);
                  setDialogVisible(false);
                }}
                className="py-3 w-full border-[0px] border-b border-solid border-white border-opacity-20 "
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler();
                }}
                className="py-3 w-full border-[0px]  border-b-[1px] border-solid border-white border-opacity-20 "
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogVisible(false);
                }}
                className="py-3 w-full border-[0px] "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentCard);
