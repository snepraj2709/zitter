import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import { SearchedUserModal } from "./SearchedUserModal";

export function Searchbar() {
  const { userState: { searchInput }, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className="flex justify-center">
      <div className="flex items-center rounded-md shadow-md bg-white">
        <input
          type="text"
          placeholder="Search Users"
          className="px-3 py-2 focus:outline-none text-gray-600"
          onChange={(e) =>
            userDispatch({ type: SearchUser, payload: e.target.value })
          }
        />
        <BiSearch className="text-gray-600 w-5 h-5" />
      </div>
      {searchInput && <div><SearchedUserModal /></div>}
    </div>
  );
}
