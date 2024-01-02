import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { authActions, setUserState } from '../../functions/store/authSlice';
import Loader from '../../ui/Loader';

const AuthLayout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isauth = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    async function checkCookie() {
      if (
        !localStorage.getItem('cookieFallback') ||
        localStorage.getItem('cookieFallback') == '[]'
      ) {
        dispatch(authActions.reset());
        setIsLoading(false);
      } else {
        await dispatch(await setUserState());
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
              <header className="w-full flex px-5 py-3 justify-between items-center">
                <div className=" text-white text-5xl font-bold p-1 h-fit">
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-2 -2 24 24"
                      className="w-[35px] h-[35px] fill-orange-500"
                    >
                      <path d="M7.671 13.44L19.926 1.384c.116.408.096.847-.061 1.25l-6.25 16.08c-.395 1.016-1.532 1.538-2.54 1.165a1.9 1.9 0 01-1.097-1.054l-1.981-4.77c-.09-.216-.2-.423-.326-.617zm-1.41-1.288a3.82 3.82 0 00-.317-.148l-4.77-1.981C.185 9.61-.268 8.465.165 7.465a2.022 2.022 0 011.121-1.079l16.08-6.25c.46-.179.94-.175 1.365-.025L6.26 12.152z"></path>
                    </svg>
                    <h1 className="text-orange-500 text-lg newfont ">
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
