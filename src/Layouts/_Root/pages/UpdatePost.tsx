import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from '../../../ui/Loader';
import CreateIcon from '../../../ui/Icons/CreateIcon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import FileUploader from '../Components/FIleUploader';
import { Link } from 'react-router-dom';
import { NewPostType } from '../../../functions/types/types';
import { useSelector } from 'react-redux';

import { UpdatePostSchema } from '../../../functions/Schema';
import {
  useGetPostById,
  useUpdatePost,
} from '../../../functions/ReactQuery/queries';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: fetchedPost,
    isPending: isLoading,
    isSuccess,
  } = useGetPostById(id ?? '');

  const user = useSelector((state: any) => state.auth.user);
  const [image, setImage] = useState<File[]>([]);
  const [error, setError] = useState({
    is: false,
    message: '',
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPostType>({
    resolver: zodResolver(UpdatePostSchema),
  });
  const { mutateAsync, isPending: isUpdating } = useUpdatePost(id ?? '');

  async function submitHandler(data: NewPostType) {
    const newPost: any = await mutateAsync({
      caption: data.caption,
      location: data.location,
      tags: data.tags,
      image: image,
      userId: user.id,
      imageId: fetchedPost?.imageId,
      postId: fetchedPost?.$id || '',
      imageUrl: fetchedPost?.imageUrl,
    });
    if (!newPost) {
      alert('failed to create post');
      return;
    }
    navigate('/in');
  }
  useEffect(() => {
    if (image.length > 0) {
      setError({
        is: false,
        message: '',
      });
    }
  }, [image]);
  useEffect(() => {
    if (isSuccess) {
      reset({
        caption: fetchedPost?.caption,
        location: fetchedPost?.location,
        tags: fetchedPost?.tags.join(','),
      });
    }
  }, [isSuccess]);
  return (
    <>
      {isLoading || !fetchedPost ? (
        <Loader2 />
      ) : (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-black  w-full min-h-full text-white flex flex-col justify-center items-center "
        >
          <h1 className="flex p-4 justify-start items-center gap-2 text-left w-full">
            <CreateIcon className="fill-white h-[40px] w-[40px]" />
            <span className=" font-extrabold text-2xl">Create Post</span>
          </h1>
          <div className="p-2 w-full flex flex-col gap-3">
            <label htmlFor="" className=" text-[18px]">
              Caption
            </label>
            <input
              {...register('caption')}
              className="w-full h-[200px]  p-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
              placeholder="Write your caption here"
            />
          </div>
          {errors.caption && (
            <p className="error-msg">{errors.caption.message}</p>
          )}
          <div className="p-2 w-full flex flex-col gap-3">
            <label htmlFor="" className=" text-[18px]">
              Add Photos
            </label>
            <FileUploader
              mediaUrl={fetchedPost?.imageUrl}
              fieldChange={setImage}
            />
          </div>
          {error.is && <p className="error-msg ">{error.message}</p>}
          <div className="p-2 w-full flex flex-col gap-3">
            <label htmlFor="" className=" text-[18px]">
              Add Location
            </label>
            <input
              {...register('location')}
              className="w-full   py-3 px-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
              placeholder="Add your location here"
            />
          </div>
          {errors.location && (
            <p className="error-msg">{errors.location.message}</p>
          )}
          <div className="p-2 w-full flex flex-col gap-3">
            <label htmlFor="" className=" text-[18px]">
              Add Tags (separated by comma ",")
            </label>
            <input
              {...register('tags')}
              className="w-full   py-3 px-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
              placeholder="React , Node , Next , Typescript"
            />
          </div>
          {errors.tags && <p className="error-msg">{errors.tags.message}</p>}
          <div className="flex justify-end items-center gap-4 w-full p-2">
            <Link
              to={'/in'}
              className="rounded py-2 px-4 bg-white border border-solid border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded py-2 px-4 hover:bg-white duration-200 hover:text-orange-500 disabled:hover:bg-orange-500 disabled:hover:text-white bg-orange-500 text-white disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdatePost;
