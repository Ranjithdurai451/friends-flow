import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { signOutAccount } from '../../../functions/appwrite/api';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess } = useMutation({
    mutationFn: signOutAccount,
  });
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
  return (
    <header className="flex justify-between py-2 px-3 w-full bg-black sm:hidden flex-shrink-0 border-[0px] border-b-[2px] border-orange-500 border-solid border-opacity-20">
      <Link to="/in" className="  p-2 h-fit">
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -2 24 24"
            className="w-[35px] h-[35px] fill-orange-500"
          >
            <path d="M7.671 13.44L19.926 1.384c.116.408.096.847-.061 1.25l-6.25 16.08c-.395 1.016-1.532 1.538-2.54 1.165a1.9 1.9 0 01-1.097-1.054l-1.981-4.77c-.09-.216-.2-.423-.326-.617zm-1.41-1.288a3.82 3.82 0 00-.317-.148l-4.77-1.981C.185 9.61-.268 8.465.165 7.465a2.022 2.022 0 011.121-1.079l16.08-6.25c.46-.179.94-.175 1.365-.025L6.26 12.152z"></path>
          </svg>
          <h1 className="text-orange-500 text-lg newfont ">FriendsFlow!</h1>
        </div>
      </Link>
      <div className="p-2 flex gap-2 ">
        <Link to={`in/profile/${user.id}`} className=" rounded-full">
          <img
            src={user.profileUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-full aspect-square"
          />
        </Link>
        <button onClick={submitHandler}>
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={40}
            height={40}
            className=" fill-orange-500 hover:opacity-50 duration-200"
          >
            <g id="grid_system" />
            <g id="_icons">
              <g>
                <path d="M20.9,11.6c-0.1-0.1-0.1-0.2-0.2-0.3l-3-3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.3,1.3H13c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.6    l-1.3,1.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3-3c0.1-0.1,0.2-0.2,0.2-0.3C21,12.1,21,11.9,20.9,11.6z    " />
                <path d="M15.5,18.1C14.4,18.7,13.2,19,12,19c-3.9,0-7-3.1-7-7s3.1-7,7-7c1.2,0,2.4,0.3,3.5,0.9c0.5,0.3,1.1,0.1,1.4-0.4    c0.3-0.5,0.1-1.1-0.4-1.4C15.1,3.4,13.6,3,12,3c-5,0-9,4-9,9s4,9,9,9c1.6,0,3.1-0.4,4.5-1.2c0.5-0.3,0.6-0.9,0.4-1.4    C16.6,18,16,17.8,15.5,18.1z" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
