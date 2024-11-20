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
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 p-2">
        <img
          src={profileUrl}
          className="rounded-full w-[50px] h-[50px] aspect-square object-cover"
          alt=""
          loading="lazy"
        />
        <div className="flex flex-col ">
          <p className="text-white">{name}</p>
          <p className="text-sm text-white text-opacity-30">@{username}</p>
        </div>
      </div>
      <div>
        {user?.id == id ? (
          <button
            onClick={submitHandler}
            className="text-orange-500 duration-200 hover:text-white"
          >
            {isPending ? 'Signing Out...' : 'Sign Out'}
          </button>
        ) : (
          <Link
            to={`/in/profile/${id}`}
            className="text-orange-500 duration-200 hover:text-white"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewUserCard;
