import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import { SearchedUserModal } from "./SearchedUserModal";

export function Searchbar() {
  const { userState: { searchInput }, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className="flex h-12">
      <div className="flex items-center rounded-lg w-full px-2 mr-5 bg-gray-100">
        <BiSearch className="text-gray-600 w-6 h-6 mr-2"/>
        <input
          type="text"
          placeholder="Search Users"
          className="outline-none text-gray-600 w-full bg-transparent flex-1"
          onChange={(e) =>
            userDispatch({ type: SearchUser, payload: e.target.value })
          }
        />
        {searchInput && <div className="absolute top-12 z-20"><SearchedUserModal /></div>} 
      </div>
    </div>
  );
}
