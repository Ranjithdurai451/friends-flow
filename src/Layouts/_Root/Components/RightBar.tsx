import { useSelector } from 'react-redux';
import NewUserCard from './NewUserCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SuggestedUser } from '../../../functions/appwrite/api';
import Spinner from '../../../ui/Spinner';

const RightBar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { data: users, isPending } = useQuery({
    queryKey: ['suggested'],
    queryFn: SuggestedUser,
  });

  return (
    <div className="py-10 px-2  h-full w-[300px] xl:flex hidden flex-col gap-5 fixed right-[60px] top-0">
      <NewUserCard
        name={user.name}
        username={user.username}
        id={user.id}
        profileUrl={user.profileUrl}
      />
      <div className="w-full flex items-center justify-between">
        <h1 className="text-white text-base text-opacity-60">
          Suggested for you
        </h1>
        <Link
          to="/in/people"
          className="text-white hover:text-opacity-50 duration-200 text-[14px]"
        >
          View All
        </Link>
      </div>
      <div className="w-full flex flex-col gap-1">
        {isPending ? (
          <Spinner />
        ) : (
          users?.documents?.map((user: any, index: any) => (
            <NewUserCard
              key={index}
              name={user.name}
              username={user.username}
              id={user.$id}
              profileUrl={user.profileUrl}
            />
          ))
        )}
      </div>
      <div className="p-1">
        <p className="text-white text-opacity-30 text-sm">
          &#169; 2024 FriendsFlow! From NoOne
        </p>
      </div>
    </div>
  );
};

export default RightBar;
