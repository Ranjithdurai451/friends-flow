import { Models } from 'appwrite';
import PostCard from '../Components/PostCard';
import { Outlet } from 'react-router-dom';
import { useGetAllPosts } from '../../../functions/ReactQuery/queries';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import PostCardSkeleton from '../../../ui/PostCardSkeleton';
import RightBar from '../Components/RightBar';
import Spinner from '../../../ui/Spinner';

const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostsPending,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetAllPosts();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    if (isError) {
      console.log(isError);
    }
  }, [isError]);
  // console.log(posts);
  return (
    <>
      <div className="w-full flex justify-around  ">
        <div className="flex flex-col sm:w-[600px] w-full bg-black  min-h-full scrollbar sm:p-5 p-2">
          {isPostsPending && !posts ? (
            Array(3)
              .fill(0)
              .map((_, index) => <PostCardSkeleton key={index} />)
          ) : (
            <ul className="flex flex-col gap-5 w-full ">
              {posts?.pages?.map((page) =>
                page?.documents?.map((post: Models.Document) => (
                  <PostCard post={post} key={post.$id} />
                ))
              )}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="w-full h-[250px] flex items-center justify-center"
                >
                  <Spinner />
                </div>
              )}
            </ul>
          )}
        </div>
        <div>
          <RightBar />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
