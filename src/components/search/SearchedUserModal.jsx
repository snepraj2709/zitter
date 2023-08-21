import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { UserAvatar } from "../avatar/UserAvatar";

export function SearchedUserModal() {
  const navigate = useNavigate();
  const { searchedUsers, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className=" w-48 rounded shadow-blue-500/40 border bg-slate-50">
      {
        searchedUsers.length!==0?searchedUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              navigate(`/profile/${user.username}`);
              userDispatch({ type: SearchUser, payload: "" });
            }}
            className=" flex flex-row items-center justify-left ml-2 p-2 text-gray-800 cursor-pointer w-48  "
          >
            <UserAvatar user={user} />
            <div className=" flex flex-col ml-2 text-left">
              <span className="font-medium text-base">{user.firstName + " " + user.lastName}</span>
              <span className="text-sm text-gray-800">{user.username}</span>
            </div>
          </div>
        )):(
            <div className="text-base text-gray-800 p-2">Oops! No user found</div>
        )
      }
    </div>
  );
}
