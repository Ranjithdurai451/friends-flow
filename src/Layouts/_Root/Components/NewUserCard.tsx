import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAccount } from '../../../functions/appwrite/api';
import { useMutation } from '@tanstack/react-query';
type NewUserCardProps = {
  name: string;
  username: string;
  id: string;
  profileUrl: string;
};
const NewUserCard = ({ name, username, id, profileUrl }: NewUserCardProps) => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isPending } = useMutation({
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
    <div className="flex items-center w-full justify-between">
      <div className="flex p-2 gap-3">
        <img
          src={profileUrl}
          className="rounded-full w-[50px] h-[50px] aspect-square object-cover"
          alt=""
        />
        <div className="flex flex-col ">
          <p className="text-white">{name}</p>
          <p className="text-white text-sm text-opacity-30">@{username}</p>
        </div>
      </div>
      <div>
        {user?.id == id ? (
          <button
            onClick={submitHandler}
            className="text-red-600 hover:text-white duration-200"
          >
            {isPending ? 'Signing Out...' : 'Sign Out'}
          </button>
        ) : (
          <Link
            to={`/in/profile/${id}`}
            className="text-red-600 hover:text-white duration-200"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewUserCard;
