import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/userContext";
import { UserAvatar } from '../../components/UserAvatar';
import { useNavigate } from 'react-router-dom';

export const SuggestedUser = () => {
  const { userState: { allUsers },followUserHandler, handleBtnsClick} = useUser();
  const { loginUser,token } = useAuth();
  const navigate = useNavigate();

  const usersNotFollowedByLoginUser = allUsers.filter((user) => {
  return user.username !== loginUser.username && !user.followers.some((follower) => follower.username === loginUser.username);
});

  return (
    <div className="sticky top-0 m-3">
      <h1 className="flex flex-col font-bold text-xl p-2">Suggested User</h1>
      <div>
        {usersNotFollowedByLoginUser.length > 0 ? (
          usersNotFollowedByLoginUser.map((user) => (
            <div
              key={user?.id}
              onClick={() => {
                navigate(`/profile/${user?.username}`);
              }}
              className=" flex flex-row items-left justify-between m-1 align-items: center text-white p-2 cursor-pointer w-64 rounded border shadow shadow-blue-300/30 "
            >
              <div className="flex flex-row">
                <UserAvatar user={user} />
              <div className="ml-2 flex flex-col text-left">
                <span className="font-medium text-base text-gray-800">{user?.firstName + " " + user?.lastName}</span>
                <span className="text-sm text-gray-800">{user?.username}</span>
              </div>
              </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg h-10 mr-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40" onClick={()=>handleBtnsClick(400, followUserHandler, user?._id,token)}>
                    Follow
                  </button>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-800 p-2">Oops! No user found</div>
        )}
      </div>
    </div>
  );
};
