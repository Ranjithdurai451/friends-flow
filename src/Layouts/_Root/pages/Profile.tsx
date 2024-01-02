import { Link, useParams } from 'react-router-dom';
import {
  useFollowUser,
  useGetUser,
  useUnFollowUser,
} from '../../../functions/ReactQuery/queries';
import EditIcon from '../../../ui/Icons/EditIcon';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewPostCard from '../Components/NewPostCard';
import Spinner from '../../../ui/Spinner';

const Profile = () => {
  // const { data: currentUserData, isSuccess, refetch } = useGetCurrentUserData();
  const [isFollow, setIsFollow] = useState(false);
  const currentUser = useSelector((state: any) => state.auth.user);
  const {
    data: currentUserData,
    refetch,
    isSuccess,
  } = useGetUser(currentUser?.id);
  const [active, setActive] = useState('posts');
  const { id } = useParams();
  const { data: user, refetch: refetchUser } = useGetUser(id ?? '');

  var content;
  if (active == 'posts') {
    content =
      user?.posts?.length > 0 ? (
        <div className=" xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
          {user?.posts?.map((post: any) => (
            <NewPostCard key={post.$id} post={post}></NewPostCard>
          ))}
        </div>
      ) : (
        <div className="text-lg w-full text-white">No posts yet</div>
      );
  } else if (active == 'saved') {
    content =
      user?.saves?.length > 0 ? (
        <div className="xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
          {user?.saves?.map((post: any) => (
            <NewPostCard key={post.$id} post={post.posts}></NewPostCard>
          ))}
        </div>
      ) : (
        <div className="text-lg w-full text-white">No posts saved yet</div>
      );
  }

  const { mutateAsync: followMutate, isPending: isFollowing } = useFollowUser();

  const { mutateAsync: unFollowMutate, isPending: isUnFollowing } =
    useUnFollowUser();

  async function handleFollow() {
    if (isFollow) {
      var followId;
      currentUserData?.followings?.forEach((follow: any) => {
        if (follow?.user?.$id == user?.$id) {
          followId = follow?.$id;
        }
      });
      // console.log(currentUserData);
      // console.log(followId);

      await unFollowMutate({ id: followId ?? '' });
      setIsFollow(false);
      refetchUser();
      refetch();
    } else {
      await followMutate({
        followerId: currentUser?.id ?? '',
        userId: user?.$id ?? '',
      });
      setIsFollow(true);
      await refetch();
      refetchUser();
    }
  }
  useEffect(() => {
    if (isSuccess) {
      currentUserData?.followers?.forEach((follow: any) => {
        if (follow.$id == user?.$id) {
          setIsFollow(true);
        }
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex w-full sm:py-20 py-10 sm:px-10 px-3 flex-col sm:gap-10 gap-8">
      <div>
        <Link to={'/in'} className="text-orange-500">
          <span></span> Back
        </Link>
      </div>
      <div className="flex w-full  sm:gap-8 gap-4 text-white ">
        <aside>
          <img
            src={user?.profileUrl}
            alt=""
            className="sm:w-[150px] sm:h-[150px] h-[60px] w-[60px] rounded-full"
          />
        </aside>
        <main className="flex justify-between sm:w-[360px] w-[300px] lg:w-[450px] sm:pt-5 flex-col gap-4">
          <div className="w-full  flex justify-between items-center">
            <div>
              <p className="text-white capitalize sm:text-lg text-md">
                {user?.name}
              </p>
              <p className="text-gray-500 sm:text-md text-sm text-left">
                {user?.username}
              </p>
            </div>
            <div className="">
              {currentUser?.id == user?.$id ? (
                <Link
                  to={`/in/update-profile/${user?.$id}`}
                  className="flex gap-3 items-center group sm:px-5 sm:py-4 px-3 py-2 rounded hover:bg-orange-500 hover:bg-opacity-10"
                >
                  <EditIcon className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] fill-orange-500" />
                  <span className="text-orange-500 text-sm sm:text-md">
                    Edit Profile
                  </span>
                </Link>
              ) : (
                <button
                  onClick={handleFollow}
                  className="flex gap-3 items-center group sm:px-5 sm:py-4 px-3 py-2 rounded hover:bg-orange-500 hover:bg-opacity-10"
                >
                  <span className="text-orange-500 text-sm sm:text-md">
                    {isFollowing || isUnFollowing ? (
                      <Spinner />
                    ) : isFollow ? (
                      'Following'
                    ) : (
                      'Follow'
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className=" flex w-full justify-between items-center">
            <div className="flex flex-col ">
              <div className="sm:text-md text-[18px] text-orange-500">
                {user?.posts.length}
              </div>
              <div className="sm:text-md text-[18px]">Posts</div>
            </div>
            <div className="flex flex-col ">
              <div className="sm:text-md text-[18px] text-orange-500">
                {user?.followers.length}
              </div>
              <div className="sm:text-md text-[18px]">Followers</div>
            </div>
            <div className="flex flex-col ">
              <div className="sm:text-md text-[18px] text-orange-500">
                {user?.followings.length}
              </div>
              <div className="sm:text-md text-[18px]">Following</div>
            </div>
          </div>
        </main>
      </div>
      <div className="w-full flex flex-col gap-8 px-10">
        <div className=" flex w-full gap-5 items-center">
          <button
            className={` flex gap-3 items-center group  sm:px-5 sm:py-4 px-3 py-2 rounded  ${
              active == 'posts' ? 'newactive' : 'newunactive'
            }`}
            onClick={() => setActive('posts')}
          >
            <span className="">Posts</span>
          </button>
          {currentUser?.id == user?.$id && (
            <button
              className={` flex gap-3 items-center group  sm:px-5 sm:py-4 px-3 py-2 rounded  ${
                active == 'saved' ? 'newactive' : 'newunactive'
              }`}
              onClick={() => setActive('saved')}
            >
              <span className="">Saved</span>
            </button>
          )}
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Profile;
