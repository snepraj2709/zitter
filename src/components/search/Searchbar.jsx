import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { BiSearch } from "../../utils/icons";
import { SearchedUserModal } from "./SearchedUserModal";

export function Searchbar() {
  const { userState: { searchInput }, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className="flex justify-center  rounded bg-primary relative z-10">
      <div className="flex justify-between items-center rounded-md shadow-md bg-white ">
        <input
          type="text"
          placeholder="Search Users"
          className=" py-2 focus:outline-none text-gray-600 px-2 pb-3 pt-3"
          onChange={(e) =>
            userDispatch({ type: SearchUser, payload: e.target.value })
          }
        />
        <BiSearch className="text-gray-600 w-5 h-5" />
      </div>
      {searchInput && <div className="absolute top-12 left-50 z-50"><SearchedUserModal /></div>}
    </div>
  );
}
