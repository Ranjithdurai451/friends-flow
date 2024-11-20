import { Navigate, Outlet, redirect } from 'react-router-dom';

import TopBar from './Components/TopBar';
import BottomBar from './Components/BottomBar';
import LeftBar from './Components/LeftBar';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { authActions, setUserState } from '../../functions/store/authSlice';
import Loader from '../../ui/Loader';
const RootLayout = () => {
  const auth = useSelector((state: any) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    async function checkCookie() {
      if (
        !localStorage.getItem('cookieFallback') ||
        localStorage.getItem('cookieFallback') == '[]'
      ) {
        dispatch(authActions.reset());
        setIsLoading(false);
      } else {
        dispatch((await setUserState()) as AnyAction);
        if (!auth.user.isAuthenticated) {
          redirect('/in');
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      }
    }

    checkCookie();
  }, [dispatch]);

  return (
    <>
      {!isLoading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p></p>
          <div className="flex flex-col w-screen h-screen sm:flex-row">
            <TopBar />
            <LeftBar />
            <div className="flex-grow overflow-y-visible bg-black scrollbar ">
              <Outlet />
            </div>
            {/* <div className="flex-grow hidden h-full sm:block"></div> */}

            <BottomBar />
          </div>
        </SkeletonTheme>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RootLayout;
