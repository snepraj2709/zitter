import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { UserAvatar } from "../UserAvatar";

export function SearchedUserModal() {
  const navigate = useNavigate();
  const { isLoading, searchedUsers, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  return (
    <div className="bg-gray-800 w-48 rounded">
      {
        searchedUsers.length!==0?searchedUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              navigate(`/profile/${user.username}`);
              userDispatch({ type: SearchUser, payload: "" });
            }}
            className="bg-gray-800 flex flex-row items-center justify-center text-white p-2 cursor-pointer w-48 rounded"
          >
            <UserAvatar user={user} />
            <div className="mt-2 text-center flex flex-col m-1 text-left">
              <span className="text-sm">{user.firstName + " " + user.lastName}</span>
              <span className="text-sm text-gray-300">{user.username}</span>
            </div>
          </div>
        )):(
            <div className="text-sm text-gray-300 p-2">Oops! No user found</div>
        )
      }
    </div>
  );
}
