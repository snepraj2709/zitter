import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/userContext";
import { UserAvatar } from '../../components/UserAvatar';
import { useNavigate } from 'react-router-dom';

export const SuggestedUser = () => {
  const { userState: { allUsers },followUserHandler } = useUser();
  const { loginUser,token } = useAuth();
  const navigate = useNavigate();

  const usersNotFollowedByLoginUser = allUsers.filter((user) => {
  return user.username !== loginUser.username && !user.followers.some((follower) => follower.username === loginUser.username);
});

  return (
    <div className="sticky top-0">
      <h1 className="flex flex-col font-bold text-2xl p-2">Suggested User</h1>
      <div>
        {usersNotFollowedByLoginUser.length > 0 ? (
          usersNotFollowedByLoginUser.map((user) => (
            <div
              key={user?.id}
              onClick={() => {
                navigate(`/profile/${user?.username}`);
              }}
              className=" flex flex-row items-center justify-between text-white p-2 cursor-pointer w-56 rounded border shadow shadow-blue-500/40 hover:shadow-indigo-500/40"
            >
              <UserAvatar user={user} />
              <div className="mt-2 flex flex-col m-1 text-left">
                <span className="text-sm text-gray-800">{user?.firstName + " " + user?.lastName}</span>
                <span className="text-sm text-gray-800">{user?.username}</span>
              </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg mr-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40" onClick={()=>followUserHandler(user?._id,token)}>
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
