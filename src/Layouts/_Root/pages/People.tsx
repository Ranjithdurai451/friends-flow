import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useGetAllUsers,
  useSearchUsers,
} from '../../../functions/ReactQuery/queries';
import Spinner from '../../../ui/Spinner';
import { Models } from 'appwrite';
import UserCard from '../Components/UserCard';
import useDebounce from '../../../functions/useDebounce';
import SearchIcon from '../../../ui/Icons/SearchIcon';
import UserCardSkeleton from '../../../ui/UserCardSkeleton';

const People = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: users,
    isFetching,
    isFetched,
    fetchNextPage: searchNextPage,
    hasNextPage: hasSearchNextPage,
  } = useSearchUsers(debouncedSearchTerm.trim());
  const { ref: searchRef, inView: searchInview } = useInView();
  useEffect(() => {
    if (searchInview) {
      searchNextPage();
    }
  }, [searchInview]);

  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostsPending,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetAllUsers();
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
  const showSearchResults = debouncedSearchTerm.trim() !== '';
  return (
    <div className=" flex flex-col sm:pt-10 sm:px-6 pt-4 sm:gap-6 gap-2 items-center text-white">
      <h1 className="sm:text-3xl text-lg font-bold">Search Creators</h1>
      <div className="w-[80%] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[50px]  rounded-lg relative">
        <span className=" absolute left-3 top-1">
          <SearchIcon className="w-[35px] h-[35px] fill-white" />
        </span>
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full bg-white bg-opacity-10 rounded-lg outline-none pl-14 text-white"
        />
      </div>
      {showSearchResults &&
        (isFetching || !isFetched ? (
          <div className="flex items-center justify-center w-full h-[200px] sm:[400px]">
            <Spinner />
          </div>
        ) : users?.pages?.reduce(
            (acc, page) => acc + page?.documents?.length,
            0
          ) === 0 ? (
          <div>No results found</div>
        ) : (
          isFetched && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5 sm:p-5 p-2 gap-3">
              {users?.pages?.map((page) =>
                page?.documents?.map((user: Models.Document) => (
                  <UserCard user={user} key={user.$id} />
                ))
              )}
              <div
                ref={searchRef}
                className="w-full p-8 flex justify-center items-center"
              >
                {hasSearchNextPage && <Spinner />}
              </div>
            </div>
          )
        ))}

      {!showSearchResults &&
        (isPostsPending && !posts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5 sm:p-5 p-2 gap-3">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <UserCardSkeleton key={index} />
              ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5 sm:p-5 p-2 gap-3">
              {posts?.pages?.map((page) =>
                page?.documents?.map((user: Models.Document) => (
                  <UserCard user={user} key={user.$id} />
                ))
              )}
            </div>
            <div className="w-full p-8 flex justify-center items-center">
              <div ref={ref}>{hasNextPage && <Spinner />}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default People;
