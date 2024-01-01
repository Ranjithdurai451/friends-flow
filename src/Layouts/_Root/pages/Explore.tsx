import { useEffect, useState } from 'react';
import SearchIcon from '../../../ui/Icons/SearchIcon';
import useDebounce from '../../../functions/useDebounce';
import {
  useGetPopularPosts,
  useSearchPosts,
} from '../../../functions/ReactQuery/queries';
import NewPostCard from '../Components/NewPostCard';
import { useInView } from 'react-intersection-observer';
import { Models } from 'appwrite';
import Spinner from '../../../ui/Spinner';
import NewPostCardSkeleton from '../../../ui/NewPostCardSkeleton';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: posts,
    isFetching,
    isFetched,
    fetchNextPage: searchNextPage,
    hasNextPage: hasSearchNextPage,
  } = useSearchPosts(debouncedSearchTerm.trim());
  const { ref: searchRef, inView: searchInview } = useInView();
  useEffect(() => {
    if (searchInview) {
      searchNextPage();
    }
  }, [searchInview]);

  const { ref, inView } = useInView();
  const {
    data: posts2,
    isPending: isPostsPending,
    fetchNextPage,
    hasNextPage,
  } = useGetPopularPosts();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const showSearchResults = debouncedSearchTerm.trim().length > 0;

  return (
    <div className=" flex flex-col sm:pt-10 sm:px-6 pt-6 sm:gap-6 gap-3 items-center text-white">
      <h1 className="text-3xl font-bold">Search Hashtags</h1>
      <div className="w-[80%] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[50px]  rounded-lg relative">
        <span className=" absolute left-3 top-1">
          <SearchIcon className="w-[35px] h-[35px] fill-white" />
        </span>
        <input
          type="text"
          placeholder="Search Hashtags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full bg-white bg-opacity-10 rounded-lg outline-none pl-14 text-white"
        />
      </div>

      {showSearchResults &&
        (isFetching || !isFetched ? (
          <ul className="xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <NewPostCardSkeleton key={index} />
              ))}
          </ul>
        ) : posts?.pages?.reduce(
            (acc, page) => acc + page?.documents?.length,
            0
          ) === 0 ? (
          <div>No results found</div>
        ) : (
          isFetched && (
            <div className="xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
              {posts?.pages?.map((page) =>
                page?.documents?.map((post: Models.Document) => (
                  <NewPostCard key={post.$id} post={post}></NewPostCard>
                ))
              )}

              {hasSearchNextPage && (
                <div
                  ref={searchRef}
                  className="w-full p-6 flex h-[80px] justify-center items-center  "
                >
                  <Spinner />
                </div>
              )}
            </div>
          )
        ))}
      {!showSearchResults && searchTerm.trim().length === 0 && (
        <>
          {isPostsPending && !posts ? (
            <ul className="xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <NewPostCardSkeleton key={index} />
                ))}
            </ul>
          ) : (
            <ul className="xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
              {posts2?.pages?.map((page) =>
                page?.documents?.map((post: Models.Document, index: any) => (
                  <NewPostCard key={post.$id} post={post}></NewPostCard>
                ))
              )}
              {hasNextPage && (
                <div
                  ref={ref}
                  className="w-full p-6 flex h-[80px] justify-center items-center  "
                >
                  <Spinner />
                </div>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
