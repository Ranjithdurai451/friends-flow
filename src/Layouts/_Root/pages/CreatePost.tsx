import CreateIcon from '../../../ui/Icons/CreateIcon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import FileUploader from '../Components/FIleUploader';
import { Link, useNavigate } from 'react-router-dom';
import { NewPostType } from '../../../functions/types/types';
import { useSelector } from 'react-redux';
import Spinner from '../../../ui/Spinner';
import { NewPostSchema } from '../../../functions/Schema';
import { useCreateNewPost } from '../../../functions/ReactQuery/queries';

const CreatePost = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [image, setImage] = useState<File[]>([]);
  const [error, setError] = useState({
    is: false,
    message: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<NewPostType>({
    resolver: zodResolver(NewPostSchema),
  });
  const { mutateAsync, isPending } = useCreateNewPost();

  async function submitHandler(data: NewPostType) {
    if (image.length == 0) {
      setError({
        is: true,
        message: 'Please select an image',
      });
      return;
    }

    const newPost = await mutateAsync({
      caption: data.caption,
      location: data.location,
      tags: data.tags,
      image: image,
      id: user.id,
    });
    console.log(newPost, 'postcreation');
    if (!newPost) {
      alert('failed to create post,reduce the image size');
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

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col items-center justify-center w-full min-h-full text-white bg-black "
    >
      <h1 className="flex items-center justify-start w-full gap-2 p-4 text-left">
        <CreateIcon className="fill-white h-[40px] w-[40px]" />
        <span className="text-2xl font-extrabold ">Create Post</span>
      </h1>
      <div className="flex flex-col w-full gap-3 p-2">
        <label htmlFor="" className=" text-[18px]">
          Caption
        </label>
        <input
          {...register('caption')}
          className="w-full h-[200px]  p-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
          placeholder="Write your caption here"
        />
      </div>
      {errors.caption && <p className="error-msg">{errors.caption.message}</p>}
      <div className="flex flex-col w-full gap-3 p-2">
        <label htmlFor="" className=" text-[18px]">
          Add Photos
        </label>
        <FileUploader mediaUrl="" fieldChange={setImage} />
      </div>
      {error.is && <p className="error-msg ">{error.message}</p>}
      <div className="flex flex-col w-full gap-3 p-2">
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
      <div className="flex flex-col w-full gap-3 p-2">
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
      <div className="flex items-center justify-end w-full gap-4 p-2">
        <Link
          to={'/in'}
          className="px-4 py-2 text-orange-500 duration-200 bg-white border border-orange-500 border-solid rounded hover:bg-orange-500 hover:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          className="px-4 py-2 text-white duration-200 bg-orange-500 rounded hover:bg-white hover:text-orange-500 disabled:hover:bg-orange-500 disabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {isPending ? <Spinner /> : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
