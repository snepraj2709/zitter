import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { MdCancel} from '../../utils/icons';

export function EditProfileModal({profile}) {
  const navigate = useNavigate();
  const { isLoading, editUserDetailHandler, userState,userDispatch } = useUser();
  const { SearchUser } = ActionTypes;

  console.log('profile',profile)

  return (
    <div className="bg-gray-200 w-56 rounded items-center">
      <form>
        <div className="flex flex-row">
            <div className="flex flex-row justify-between">
                <MdCancel/>
                <span>Edit Profile</span>
            </div>
            <button>Save</button>
        </div>

      </form>
    </div>
  );
}
