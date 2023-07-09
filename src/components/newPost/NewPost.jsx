import { useAuth } from "../../context/authContext"
import { UserAvatar } from "../UserAvatar";
import {BiSolidImageAdd} from '../../utils/icons';
import { usePost } from "../../context/postContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {uploadImageToCloudinary} from '../../utils/uploadImageToCloudinary';

export function NewPost(){
    const {loginUser,token}=useAuth();
    const {createNewPostHandler} =usePost();
    const [newPostDetails,setNewPostDetails]=useState({
        content:'', mediaURL:'', mediaAlt:''
    })

    const submitPostHandler=(e)=>{
        e.preventDefault();
    const newPostToast=toast.loading('Creating new Post!');

        if(newPostDetails.mediaURL){
            const response = uploadImageToCloudinary();
            createNewPostHandler(token,{...newPostDetails,mediaURL:response.url,mediaAlt:response.fileName})
        } else{
            createNewPostHandler(token,newPostDetails)
        }
         toast.success("Added new post successfully", { id: newPostToast });
        setNewPostDetails({content:'', mediaURL:'', mediaAlt:''})
    }

    return(
        <div className="border border-gray-500 flex flex-row w-full p-3">
            <UserAvatar user={loginUser}/>
            <div className="flex flex-col w-full m-2">
                 <textarea placeholder='Whats happening!' value={newPostDetails?.content} 
                 rows={3}
                 onChange={(e)=>setNewPostDetails({...newPostDetails,content: e.target.value})}/>
                 <div className="flex flex-row justify-end items-center py-2">
                    <BiSolidImageAdd className="w-6 h-6"/>
                    <button className="flex items-center px-4 bg-blue-500 text-white rounded-md" onClick={(e)=>submitPostHandler(e)}>Post</button>
                 </div>
            </div>
           
        </div>
    )
}