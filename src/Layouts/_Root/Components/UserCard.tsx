import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

type UserCardType = {
  user: Models.Document;
};
const UserCard = ({ user }: UserCardType) => {
  return (
    <div className="xm:py-6 py-4 sm:px-10 px-4 w-[150px] sm:w-[250px] flex flex-col items-center justify-center sm:gap-3 gap-2  border-[1px] border-orange-500 border-solid border-opacity-20 rounded-lg  ">
      <img
        src={user?.profileUrl}
        alt=""
        width={50}
        height={50}
        className="rounded-full aspect-square"
      />
      <p className="text-white sm:text-lg text-md">{user?.name}</p>
      <p className="text-sm text-white text-opacity-30">{user?.username}</p>
      <Link
        to={`/in/profile/${user.$id}`}
        className="rounded py-2 sm:px-4 px-3 text-sm sm:text-base hover:bg-white duration-200 hover:text-orange-500 disabled:hover:bg-orange-500 disabled:hover:text-white bg-orange-500 text-white disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Visit
      </Link>
    </div>
  );
};

export default UserCard;
