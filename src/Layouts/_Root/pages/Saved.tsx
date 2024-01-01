import { Loader2 } from '../../../ui/Loader';
import SavedIcon from '../../../ui/Icons/SavedIcon';
import { SavedPostCard } from '../Components/SavedPostCard';
import { useGetUser } from '../../../functions/ReactQuery/queries';
import { useSelector } from 'react-redux';
const Saved = () => {
  const currentUser = useSelector((state: any) => state.auth.user);
  const { data: user, isPending: isLoading } = useGetUser(currentUser?.id);

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : (
        <div className="flex flex-col sm:py-10 py-5 gap-3 px-2 sm:gap-7 w-full">
          <h1 className="flex items-center gap-2">
            <SavedIcon className="fill-red-600 w-[40px] h-[40px]" />
            <span className="text-lg text-white">Saved Posts</span>
          </h1>
          {user?.saves?.length > 0 ? (
            <div className=" xl:columns-4 sm:columns-3 columns-2 gap-x-4  w-full p-5">
              {user?.saves?.map((post: any, index: any) => (
                <SavedPostCard post={post} key={index} showStats={true} />
              ))}
            </div>
          ) : (
            <div className="text-lg w-full text-white">
              No posts saved yet....
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Saved;
