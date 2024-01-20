import { NavLink } from 'react-router-dom';
import HomeIcon from '../../../ui/Icons/HomeIcon';
import ExploreIcon from '../../../ui/Icons/ExploreIcon';
import SavedIcon from '../../../ui/Icons/SavedIcon';
import CreateIcon from '../../../ui/Icons/CreateIcon';
// import { useSelector } from 'react-redux';
import PeopleIcon from '../../../ui/Icons/PeopleIcon';
const BottomBar = () => {
  // const user = useSelector((state: any) => state.auth.user);
  return (
    <div className="w-full flex sm:hidden justify-between py-2 px-8 bg-black flex-shrink-0 border-t-orange-500 border-t-[2px] border-solid border-opacity-20">
      <NavLink
        to="/in"
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 group act bg-orange-500'
            : 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 '
        }
        end
      >
        <HomeIcon className="w-[25px] h-[25px] fill-orange-500 group-[&.act]:fill-white " />
        {/* <span className="text-orange-500 text-[12px] group-[&.act]:text-black">
          Home
        </span> */}
      </NavLink>
      <NavLink
        to="/in/explore"
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 group act bg-orange-500'
            : 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 '
        }
      >
        <ExploreIcon className="w-[25px] h-[25px] fill-orange-500 group-[&.act]:fill-white " />
        {/* <span className="text-orange-500 text-[12px] group-[&.act]:text-black">
          Explore
        </span> */}
      </NavLink>
      <NavLink
        to="/in/saved"
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 group act bg-orange-500'
            : 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 '
        }
      >
        <SavedIcon className="w-[25px] h-[25px] fill-orange-500 group-[&.act]:fill-white" />
        {/* <span className="text-orange-500 text-[12px] group-[&.act]:text-black">
          Saved
        </span> */}
      </NavLink>
      <NavLink
        to="/in/people"
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 group act bg-orange-500'
            : 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 '
        }
      >
        <PeopleIcon className="w-[25px] h-[25px] fill-orange-500 group-[&.act]:fill-white " />
        {/* <span className="text-orange-500 text-[12px] group-[&.act]:text-black">
          People
        </span> */}
      </NavLink>
      <NavLink
        to="/in/create-post"
        className={({ isActive }) =>
          isActive
            ? 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 group act bg-orange-500'
            : 'flex flex-col justify-center items-center gap-1 rounded px-2 py-1 '
        }
      >
        <CreateIcon className="w-[25px] h-[25px] fill-orange-500 group-[&.act]:fill-white " />
        {/* <span className="text-orange-500 text-[12px] group-[&.act]:text-black">
          Create
        </span> */}
      </NavLink>
    </div>
  );
};

export default BottomBar;
