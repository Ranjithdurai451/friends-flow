import { useForm } from 'react-hook-form';
import { updateEmailType } from '../../../functions/types/types';
import { updateEmailSchema } from '../../../functions/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signOutAccount, updateEmail } from '../../../functions/appwrite/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangeEmail = () => {
  const { user } = useSelector((state: any) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<updateEmailType>({
    resolver: zodResolver(updateEmailSchema),
  });
  const { mutateAsync } = useMutation({
    mutationFn: (data: { email: string; password: string; id: string }) => {
      return updateEmail(data);
    },
  });
  async function submitHandler(data: updateEmailType) {
    const update = await mutateAsync({
      email: data.email,
      password: data.password,
      id: user?.id,
    });
    if (!update) return;
    if (update) {
      window.location.reload();
    }
  }
  const navigate = useNavigate();
  const { mutateAsync: logout } = useMutation({
    mutationFn: signOutAccount,
  });

  async function forgotHandler() {
    await logout();
    navigate('/forgot-password');
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-black  w-full min-h-full text-white flex flex-col justify-center items-center gap-3 "
    >
      <h1>Change Email</h1>
      <input
        type="text"
        placeholder="Enter new email"
        {...register('email')}
        className="sm:w-[450px] w-[80%] p-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
      />
      {errors.email && (
        <p className="text-red-500 text-xs text-right sm:w-[450px] w-[80%]">
          {errors.email.message}
        </p>
      )}
      <input
        type="text"
        placeholder="Password"
        {...register('password')}
        className="sm:w-[450px] w-[80%] p-4 resize-none rounded-lg bg-white bg-opacity-[10%]"
      />
      {errors.password && (
        <p className="text-red-500 text-xs text-right sm:w-[450px] w-[80%]">
          {errors.password.message}
        </p>
      )}
      <div
        onClick={forgotHandler}
        className="text-right cursor-pointer text-blue-600 hover:text-blue-800 sm:w-[450px] w-[80%]"
      >
        Forgot password?
      </div>

      <button
        type="submit"
        className="py-2 px-5 rounded bg-orange-500 hover:bg-opacity-50   "
      >
        Submit
      </button>
    </form>
  );
};

export default ChangeEmail;
