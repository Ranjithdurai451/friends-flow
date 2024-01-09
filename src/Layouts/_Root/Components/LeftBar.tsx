import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import HomeIcon from '../../../ui/Icons/HomeIcon';
import ExploreIcon from '../../../ui/Icons/ExploreIcon';
import CreateIcon from '../../../ui/Icons/CreateIcon';
import SavedIcon from '../../../ui/Icons/SavedIcon';
import { useEffect } from 'react';
import { useSignOutAccount } from '../../../functions/ReactQuery/queries';
import PeopleIcon from '../../../ui/Icons/PeopleIcon';

const LeftBar = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useSignOutAccount();
  function submitHandler() {
    mutate();
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('success');
      navigate('/');
    }
  }, [isSuccess]);
  const user = useSelector((state: any) => state.auth.user);
  // const { data: user } = useGetUser(currentUser?.id);
  return (
    <div className="h-full py-5 xl:px-6 xl:pr-[50px] bg-black hidden sm:flex flex-col gap-5 shrink-0 border-r-[1px] border-red-600 border-solid border-opacity-20">
      <div>
        <Link to="/in" className="  p-1 h-fit">
          <div className="flex gap-1 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -2 24 24"
              className="w-[35px] h-[35px] fill-red-600"
            >
              <path d="M7.671 13.44L19.926 1.384c.116.408.096.847-.061 1.25l-6.25 16.08c-.395 1.016-1.532 1.538-2.54 1.165a1.9 1.9 0 01-1.097-1.054l-1.981-4.77c-.09-.216-.2-.423-.326-.617zm-1.41-1.288a3.82 3.82 0 00-.317-.148l-4.77-1.981C.185 9.61-.268 8.465.165 7.465a2.022 2.022 0 011.121-1.079l16.08-6.25c.46-.179.94-.175 1.365-.025L6.26 12.152z"></path>
            </svg>
            <h1 className="text-red-600 text-lg newfont xl:block hidden w-full  ">
              FriendsFlow!
            </h1>
          </div>
        </Link>
      </div>
      <Link
        to={`/in/profile/${user?.id}`}
        className="pl-3 flex gap-2 justify-start items-center "
      >
        <img
          src={user?.profileUrl}
          alt=""
          width={50}
          height={50}
          className="rounded-full aspect-square"
        />
        <div className="p-1  flex-col gap-0 xl:flex hidden  ">
          <p className="text-white capitalize text-[20px]">{user?.name}</p>
          <p className="text-gray-500 text-[12px] text-left">
            {user?.username}
          </p>
        </div>
      </Link>
      <div className="flex flex-col justify-between items-center flex-grow ">
        <nav className="flex flex-col gap-4 py-5 px-2">
          <NavLink
            to="/in"
            className={({ isActive }) =>
              isActive
                ? 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px] bg-red-600 group act '
                : 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px]  hover:bg-red-600 hover:bg-opacity-10  duration-200'
            }
            end
          >
            <HomeIcon className="w-[30px] h-[30px] fill-red-600 group-[&.act]:fill-white " />
            <span className="xl:block hidden text-red-600 text-[14px] group-[&.act]:text-white">
              Home
            </span>
          </NavLink>
          <NavLink
            to="/in/explore"
            className={({ isActive }) =>
              isActive
                ? 'flex justify-start items-center gap-2 rounded w-fit xl:w-[200px]  px-4 py-2 bg-red-600  group act'
                : 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px]  hover:bg-red-600 hover:bg-opacity-10  duration-200'
            }
          >
            <ExploreIcon className="w-[30px] h-[30px] fill-red-600 group-[&.act]:fill-white " />
            <span className="xl:block hidden text-red-600 text-[14px] group-[&.act]:text-white">
              Explore
            </span>
          </NavLink>
          <NavLink
            to="/in/people"
            className={({ isActive }) =>
              isActive
                ? 'flex justify-start items-center gap-2 rounded w-fit xl:w-[200px]  px-4 py-2 bg-red-600 group act'
                : 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px]  hover:bg-red-600 hover:bg-opacity-10  duration-200'
            }
          >
            <PeopleIcon className="w-[30px] h-[30px] fill-red-600 group-[&.act]:fill-white " />
            <span className="xl:block hidden text-red-600 text-[14px] group-[&.act]:text-white">
              People
            </span>
          </NavLink>
          <NavLink
            to="/in/saved"
            className={({ isActive }) =>
              isActive
                ? 'flex justify-start items-center gap-2 rounded w-fit xl:w-[200px]  px-4 py-2 bg-red-600 group act'
                : 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px]  hover:bg-red-600 hover:bg-opacity-10  duration-200'
            }
          >
            <SavedIcon className="w-[30px] h-[30px] fill-red-600 group-[&.act]:fill-white " />
            <span className="xl:block hidden text-red-600 text-[14px] group-[&.act]:text-white">
              Saved
            </span>
          </NavLink>
          <NavLink
            to="/in/create-post"
            className={({ isActive }) =>
              isActive
                ? 'flex justify-start items-center gap-2 rounded w-fit xl:w-[200px]  px-4 py-2 bg-red-600 group act'
                : 'flex  items-center gap-2 rounded px-4 py-3 w-fit xl:w-[200px]  hover:bg-red-600 hover:bg-opacity-10 duration-200'
            }
          >
            <CreateIcon className="w-[30px] h-[30px] fill-red-600 group-[&.act]:fill-white " />
            <span className="xl:block hidden text-red-600 text-[14px] group-[&.act]:text-white">
              Create
            </span>
          </NavLink>
        </nav>
        <button
          onClick={submitHandler}
          className="text-red-600 flex w-fit items-center p-2 rounded justify-start xl:w-[200px]   py-3  hover:bg-red-600 hover:bg-opacity-10  duration-200"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={35}
            height={35}
            className=" fill-red-600  "
          >
            <g id="grid_system" />
            <g id="_icons">
              <g>
                <path d="M20.9,11.6c-0.1-0.1-0.1-0.2-0.2-0.3l-3-3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.3,1.3H13c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.6    l-1.3,1.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3-3c0.1-0.1,0.2-0.2,0.2-0.3C21,12.1,21,11.9,20.9,11.6z    " />
                <path d="M15.5,18.1C14.4,18.7,13.2,19,12,19c-3.9,0-7-3.1-7-7s3.1-7,7-7c1.2,0,2.4,0.3,3.5,0.9c0.5,0.3,1.1,0.1,1.4-0.4    c0.3-0.5,0.1-1.1-0.4-1.4C15.1,3.4,13.6,3,12,3c-5,0-9,4-9,9s4,9,9,9c1.6,0,3.1-0.4,4.5-1.2c0.5-0.3,0.6-0.9,0.4-1.4    C16.6,18,16,17.8,15.5,18.1z" />
              </g>
            </g>
          </svg>
          <span className="xl:block hidden">
            {' '}
            {isPending ? 'Logging out ...' : 'Logout'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
