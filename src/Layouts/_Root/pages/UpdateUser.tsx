import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetUser,
  useUpdateUser,
} from '../../../functions/ReactQuery/queries';
import CreateIcon from '../../../ui/Icons/CreateIcon';
import { useEffect, useState } from 'react';
import ProfileUploader from '../Components/ProfileUploader';
import { useForm } from 'react-hook-form';
import { UpdateUserSchema } from '../../../functions/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserType } from '../../../functions/types/types';
import { useDispatch } from 'react-redux';
import { setUserState } from '../../../functions/store/authSlice';
import { AnyAction } from '@reduxjs/toolkit';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState({
    is: false,
    message: '',
  });
  const { id } = useParams();
  const { data: user } = useGetUser(id ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateUserType>({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      bio: user?.bio.join(','),
    },
    resolver: zodResolver(UpdateUserSchema),
  });
  const { mutateAsync, isPending: isUpdating } = useUpdateUser();
  async function submitHandler(data: updateUserType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newPost: any = await mutateAsync({
      name: data?.name,
      username: data.username,
      bio: data.bio,
      image: files,
      id: user?.$id || '',
      imageId: user?.profileId || '',
    });
    if (!newPost) {
      alert('failed to create post');
      return;
    }
    await dispatch((await setUserState()) as AnyAction);
    navigate('/in');
  }
  useEffect(() => {
    if (files?.length > 0) {
      setError({
        is: false,
        message: '',
      });
    }
  }, [files]);
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col items-center justify-center w-full min-h-full text-white bg-black "
    >
      <h1 className="flex items-center justify-start w-full gap-2 p-4 text-left">
        <CreateIcon className="fill-white h-[40px] w-[40px]" />
        <span className="text-2xl font-extrabold ">Edit Profile</span>
      </h1>
      <div className="flex flex-col w-full gap-2 p-2 sm:gap-3">
        <div className="flex items-center justify-between w-full">
          <ProfileUploader mediaUrl={user?.profileUrl} fieldChange={setFiles} />
          <Link
            to={`/in/change-email/${user?.$id}`}
            className="text-sm text-orange-500 duration-200 hover:text-white sm:text-base"
          >
            Change email
          </Link>
        </div>

        {error.is && <p className="error-msg ">{error.message}</p>}
        <label htmlFor="" className=" text-[18px]">
          Name
        </label>
        <input
          className="w-full  p-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
          placeholder={user?.name}
          {...register('name')}
        />
      </div>
      {errors.name && <p className="error-msg">{errors.name.message}</p>}
      <div className="flex flex-col w-full gap-3 p-2">
        <label htmlFor="" className=" text-[18px]">
          Username
        </label>
        <input
          className="w-full   py-3 px-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
          placeholder={user?.username}
          {...register('username')}
        />
      </div>
      {errors.username && (
        <p className="error-msg">{errors.username.message}</p>
      )}
      <div className="flex flex-col w-full gap-3 p-2">
        <label htmlFor="" className=" text-[18px]">
          Add Bio (separated by comma ",")
        </label>
        <input
          className="w-full  h-[200px] py-3 px-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
          placeholder={user?.bio}
          {...register('bio')}
        />
      </div>
      {errors.bio && <p className="error-msg">{errors.bio.message}</p>}
      <div className="flex items-center justify-end w-full gap-4 p-2">
        <Link
          to={'/in/profile/' + user?.$id}
          className="px-4 py-2 text-orange-500 duration-200 bg-white border border-orange-500 border-solid rounded hover:bg-orange-500 hover:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isUpdating || isSubmitting}
          className="px-4 py-2 text-white duration-200 bg-orange-500 rounded hover:bg-white hover:text-orange-500 disabled:hover:bg-orange-500 disabled:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
