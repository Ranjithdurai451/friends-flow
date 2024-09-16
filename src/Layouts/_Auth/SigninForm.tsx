import { Link, redirect } from 'react-router-dom';
import { login } from '../../functions/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserState } from '../../functions/store/authSlice';
import { Loader2 } from '../../ui/Loader';
import { LoginSchema } from '../../functions/Schema';
import { useSignInAccount } from '../../functions/ReactQuery/queries';
import { isEmailAvailable } from '../../functions/appwrite/api';

export const SigninForm = () => {
  const [error, setError] = useState({
    is: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<login>({
    resolver: zodResolver(LoginSchema),
  });
  const { mutateAsync: loginMutate, isPending: isLogging } = useSignInAccount();
  async function submitHandler(data: login) {
    if (!(await isEmailAvailable(data.email))) {
      setError({
        is: true,
        message: 'email not available',
      });
      return;
    }
    try {
      const session = await loginMutate({
        email: data.email,
        password: data.password,
      });
      if (!session) {
        alert('login in failed');
        return;
      }
      // await queryClient.prefetchInfiniteQuery({
      //   queryKey: ['posts'],
      //   queryFn: ({ pageParam }) => getRecentPosts(pageParam),
      //   initialPageParam: { pageparam: null },
      // });
      // queryClient.prefetchInfiniteQuery({
      //   queryKey: ['users'],
      //   queryFn: ({ pageParam }) => getRecentUsers(pageParam),
      //   initialPageParam: { pageparam: null },
      // });
      // queryClient.prefetchInfiniteQuery({
      //   queryKey: ['popular-posts'],
      //   queryFn: ({ pageParam }) => getPopularPosts(pageParam),
      //   initialPageParam: { pageparam: null },
      // });

      setIsLoading(true);
      await dispatch(await setUserState());
      setIsLoading(false);
      redirect('/');
    } catch (error) {
      alert('login in failed');
      redirect('/signin');
    }
  }
  // const { mutateAsync, isPending: google } = useSignInWithGoogle();

  // async function googleLogin() {
  //   await mutateAsync();
  // }
  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <>
          <div className="fade-up bg-white text-black sm:p-3 p-2 sm:w-[450px] w-[95%]  rounded-xl flex flex-col gap-3 justify-center items-center">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -2 24 24"
                className="w-[35px] h-[35px] fill-orange-500"
              >
                <path d="M7.671 13.44L19.926 1.384c.116.408.096.847-.061 1.25l-6.25 16.08c-.395 1.016-1.532 1.538-2.54 1.165a1.9 1.9 0 01-1.097-1.054l-1.981-4.77c-.09-.216-.2-.423-.326-.617zm-1.41-1.288a3.82 3.82 0 00-.317-.148l-4.77-1.981C.185 9.61-.268 8.465.165 7.465a2.022 2.022 0 011.121-1.079l16.08-6.25c.46-.179.94-.175 1.365-.025L6.26 12.152z"></path>
              </svg>
              <h1 className="text-lg text-orange-500 newfont ">FriendsFlow!</h1>
            </div>
            <h1 className="text-2xl font-extrabold">Create a new account</h1>

            <p className="text-gray-500">Log in to your acoount</p>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col w-full gap-2"
            >
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Email :
                </label>
                <input
                  type="text"
                  className={`form-input ${
                    errors.email
                      ? 'border-[1px] border-orange-500 border-solid focus-within:border-orange-500'
                      : ''
                  }`}
                  placeholder="Email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="error-msg">{errors.email.message}</p>
              )}
              {error.is && <p className="error-msg">{error.message}</p>}
              <div className="flex flex-col w-full gap-1">
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Password:
                  </label>

                  <div className="password-wrapper">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className={`form-password ${
                        errors.password
                          ? 'border-[1px] border-orange-500 border-solid focus-within:border-orange-500'
                          : ''
                      }`}
                      placeholder="Password"
                      {...register('password')}
                    />
                    <div
                      className="password-btn"
                      onClick={() => setPasswordVisible((state) => !state)}
                    >
                      {passwordVisible ? (
                        <svg
                          fill="none"
                          height="28"
                          viewBox="0 0 28 28"
                          width="28"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M17.7469 15.4149C17.9855 14.8742 18.1188 14.2724 18.1188 14.0016C18.1188 11.6544 16.2952 9.7513 14.046 9.7513C11.7969 9.7513 9.97332 11.6544 9.97332 14.0016C9.97332 16.3487 12.0097 17.8886 14.046 17.8886C15.3486 17.8886 16.508 17.2515 17.2517 16.2595C17.4466 16.0001 17.6137 15.7168 17.7469 15.4149ZM14.046 15.7635C14.5551 15.7635 15.0205 15.5684 15.3784 15.2457C15.81 14.8566 16 14.2807 16 14.0016C16 12.828 15.1716 11.8764 14.046 11.8764C12.9205 11.8764 12 12.8264 12 14C12 14.8104 12.9205 15.7635 14.046 15.7635Z"
                            fill="black"
                            fillRule="evenodd"
                          />
                          <path
                            clipRule="evenodd"
                            d="M1.09212 14.2724C1.07621 14.2527 1.10803 14.2931 1.09212 14.2724C0.96764 14.1021 0.970773 13.8996 1.09268 13.7273C1.10161 13.7147 1.11071 13.7016 1.11993 13.6882C4.781 8.34319 9.32105 5.5 14.0142 5.5C18.7025 5.5 23.2385 8.33554 26.8956 13.6698C26.965 13.771 27 13.875 27 13.9995C27 14.1301 26.9593 14.2399 26.8863 14.3461C23.2302 19.6702 18.6982 22.5 14.0142 22.5C9.30912 22.5 4.75717 19.6433 1.09212 14.2724ZM3.93909 13.3525C3.6381 13.7267 3.6381 14.2722 3.93908 14.6465C7.07417 18.5443 10.6042 20.3749 14.0142 20.3749C17.4243 20.3749 20.9543 18.5443 24.0894 14.6465C24.3904 14.2722 24.3904 13.7267 24.0894 13.3525C20.9543 9.45475 17.4243 7.62513 14.0142 7.62513C10.6042 7.62513 7.07417 9.45475 3.93909 13.3525Z"
                            fill="black"
                            fillRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          fill="none"
                          height="28"
                          viewBox="0 0 28 28"
                          width="28"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z"
                            fill="black"
                            fillRule="evenodd"
                          />
                          <path
                            d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <p className="error-msg">{errors.password.message}</p>
                )}
                <Link
                  to="/forgot-password"
                  className="w-full text-right text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex flex-col w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 border-solid border-[1px]  w-full rounded-lg  text-white bg-orange-500  disabled:cursor-not-allowed hover:bg-white hover:text-orange-500 duration-200 "
                >
                  {isLogging ? 'logging in...' : 'Sign Up'}
                </button>
                <div className="flex items-center w-full ">
                  <div className=" flex-grow h-[1px] bg-gray-500 ml-[80px]"></div>
                  <p className="p-1">or</p>
                  <div className="flex-grow h-[1px] bg-gray-500 mr-[80px] "></div>
                </div>
                {/* <div
                  onClick={googleLogin}
                  className="flex items-center justify-center w-full gap-2 py-3 text-white duration-200 bg-orange-500 rounded-lg cursor-pointer group hover:bg-white hover:text-orange-500 hover:border hover:border-solid hover:border-orange-500"
                >
                  <div>
                    <svg
                      viewBox="0 0 488 512"
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      fill="white"
                      className="group-hover:fill-orange-500"
                    >
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                  </div>
                  <span>
                    {google ? 'logging in...' : 'Sign in with Google'}
                  </span>
                </div> */}
              </div>

              <p className="w-full text-center">
                Don't have an account{' '}
                <Link
                  to="/signup"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};
