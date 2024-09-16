import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { authActions, setUserState } from '../../functions/store/authSlice';
import Loader from '../../ui/Loader';
import { queryClient } from '../../functions/store';
import {
  getPopularPosts,
  getRecentPosts,
  getRecentUsers,
} from '../../functions/appwrite/api';
import { AnyAction } from '@reduxjs/toolkit';

const AuthLayout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isauth = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    async function checkCookie() {
      queryClient.prefetchInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => getRecentPosts(pageParam),
        initialPageParam: { pageparam: null },
      });
      queryClient.prefetchInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({ pageParam }) => getRecentUsers(pageParam),
        initialPageParam: { pageparam: null },
      });
      queryClient.prefetchInfiniteQuery({
        queryKey: ['popular-posts'],
        queryFn: ({ pageParam }) => getPopularPosts(pageParam),
        initialPageParam: { pageparam: null },
      });
      if (
        !localStorage.getItem('cookieFallback') ||
        localStorage.getItem('cookieFallback') == '[]'
      ) {
        dispatch(authActions.reset());
        setIsLoading(false);
      } else {
        dispatch((await setUserState()) as AnyAction);
        setIsLoading(false);
      }
    }

    checkCookie();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!isauth ? (
            <div className="bg">
              <header className="flex items-center justify-between w-full px-5 py-3">
                <div className="p-1 text-5xl font-bold text-white h-fit">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-2 -2 24 24"
                      className="w-[35px] h-[35px] fill-orange-500"
                    >
                      <path d="M7.671 13.44L19.926 1.384c.116.408.096.847-.061 1.25l-6.25 16.08c-.395 1.016-1.532 1.538-2.54 1.165a1.9 1.9 0 01-1.097-1.054l-1.981-4.77c-.09-.216-.2-.423-.326-.617zm-1.41-1.288a3.82 3.82 0 00-.317-.148l-4.77-1.981C.185 9.61-.268 8.465.165 7.465a2.022 2.022 0 011.121-1.079l16.08-6.25c.46-.179.94-.175 1.365-.025L6.26 12.152z"></path>
                    </svg>
                    <h1 className="text-lg text-orange-500 newfont ">
                      FriendsFlow!
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white text-md underline'
                        : ' text-gray-400 text-sm'
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'text-white text-md underline'
                        : 'text-gray-400 text-sm'
                    }
                    to="/signin"
                  >
                    Signin
                  </NavLink>
                </div>
              </header>

              <div className="w-full h-full flex justify-center  items-start sm:pt-[50px] pt-[50px]">
                <Outlet />
              </div>
            </div>
          ) : (
            <Navigate to="/in"></Navigate>
          )}
        </>
      )}
    </>
  );
};

export default AuthLayout;
