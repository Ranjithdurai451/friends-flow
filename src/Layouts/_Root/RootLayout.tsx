import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import TopBar from './Components/TopBar';
import BottomBar from './Components/BottomBar';
import LeftBar from './Components/LeftBar';
import { SkeletonTheme } from 'react-loading-skeleton';
import {
  useGetCurrentUserData,
  useGetUser,
} from '../../functions/ReactQuery/queries';
const RootLayout = () => {
  const isauth = useSelector((state: any) => state.auth.isAuthenticated);
  const user = useSelector((state: any) => state.auth.user);
  const {} = useGetUser(user.id ?? '');
  return (
    <>
      {isauth ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p></p>
          <div className="w-screen h-screen flex flex-col sm:flex-row">
            <TopBar />
            <LeftBar />
            <div className="flex-grow overflow-y-visible scrollbar bg-black ">
              <Outlet />
            </div>
            {/* <div className="flex-grow sm:block hidden h-full"></div> */}

            <BottomBar />
          </div>
        </SkeletonTheme>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
};

export default RootLayout;
