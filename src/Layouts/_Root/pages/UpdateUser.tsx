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
    await dispatch(await setUserState());
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
      className="bg-black  w-full min-h-full text-white flex flex-col justify-center items-center "
    >
      <h1 className="flex p-4 justify-start items-center gap-2 text-left w-full">
        <CreateIcon className="fill-white h-[40px] w-[40px]" />
        <span className=" font-extrabold text-2xl">Edit Profile</span>
      </h1>
      <div className="p-2 w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <ProfileUploader mediaUrl={user?.profileUrl} fieldChange={setFiles} />
          <Link
            to={`/in/change-email/${user?.$id}`}
            className="text-orange-500 hover:text-white duration-200"
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
      <div className="p-2 w-full flex flex-col gap-3">
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
      <div className="p-2 w-full flex flex-col gap-3">
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
      <div className="flex justify-end items-center gap-4 w-full p-2">
        <Link
          to={'/in/profile/' + user?.$id}
          className="rounded py-2 px-4 bg-white border border-solid border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isUpdating || isSubmitting}
          className="rounded py-2 px-4 hover:bg-white duration-200 hover:text-orange-500 disabled:hover:bg-orange-500 disabled:hover:text-white bg-orange-500 text-white disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
