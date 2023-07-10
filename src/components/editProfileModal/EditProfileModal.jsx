import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { MdCancel} from '../../utils/icons';
import {useAuth} from '../../context/authContext'
import { useState } from 'react';

export function EditProfileModal({profile,onClose}) {
  const navigate = useNavigate();
  const { isLoading, editUserDetailHandler, userState,userDispatch } = useUser();
  const { SearchUser } = ActionTypes;
  const {token}=useAuth();
  const [editedDetails, setEditedUserDetail] = useState(profile);

  const handleChange = (e) => {
    setEditedUserDetail({
      ...editedDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editUserDetailHandler(editedDetails,token);
    console.log('editedDetails in modal on submit',editedDetails)
    onClose();
  };


  return (
    <div className="bg-gray-200 w-56 rounded items-center">
      
        <div className="flex flex-row">
            <div className="flex flex-row justify-between">
                <MdCancel onClick={onClose}/>
                <span>Edit Profile</span>
            </div>
            
        </div>


<form onSubmit={handleSubmit}>
  <button onClick={(e)=>handleSubmit(e)}>Save</button>
  <br/>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={editedDetails.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={editedDetails.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bio:
          <input
            type="text"
            name="bio"
            value={editedDetails.bio}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={editedDetails.website}
            onChange={handleChange}
          />
        </label>
        <br />
      </form>
     
    </div>
  );
}
