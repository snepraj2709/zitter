import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import { SearchedUserModal } from "./SearchedUserModal";

export function Searchbar() {
  const { userState: { searchInput }, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div>
      <div className="flex items-center border border-gray-400 w-56 rounded-md ">
        <input
          type="text"
          placeholder="Search Users"
          className=" px-3 py-2 focus:outline-none"
          onChange={(e) =>
            userDispatch({ type: SearchUser, payload: e.target.value })
          }
        />
        <BiSearch className="text-gray-500" />
      </div>
      {searchInput && <div><SearchedUserModal /></div>}
    </div>
  );
}
