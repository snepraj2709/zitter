import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import { SearchedUserModal } from "./SearchedUserModal";

export function Searchbar() {
  const { userState: { searchInput }, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className="flex h-12">
      <div className="flex items-center rounded-lg w-full px-2 mr-5">
        <input
          type="text"
          placeholder="Search Users"
          className="focus:outline-none text-gray-600 px-2 py-3 w-full rounded-md bg-slate-50 shadow-lg pr-12"
          onChange={(e) =>
            userDispatch({ type: SearchUser, payload: e.target.value })
          }
        />
        {/* <div className=" flex items-center absolute right-24 left-20"> 
          <BiSearch className="text-gray-600 w-6 h-6"/>
        </div> */}
        {searchInput && <div className="absolute top-12 z-20"><SearchedUserModal /></div>}
      </div>
    </div>
  );
}
