import { useAuth } from "../../context/authContext"
import { UserAvatar } from "../UserAvatar";
import { usePost } from "../../context/postContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {uploadFile} from '../../utils/uploadFile';
import { BiSolidImageAdd } from "../../utils/icons";

export function NewPost(){
    const {loginUser,token}=useAuth();
    const {createNewPostHandler} =usePost();
    const [newPostDetails,setNewPostDetails]=useState({
        content:'', mediaURL:'', mediaAlt:''
    })

    const submitPostHandler= async (e)=>{
        e.preventDefault();
        const newPostToast=toast.loading('Creating new Post!');

        let imageFile=newPostDetails.mediaURL

        if(newPostDetails.mediaURL){
            const response = await uploadFile(imageFile);
            createNewPostHandler(token,{...newPostDetails,mediaURL:response.url,mediaAlt:response.original_filename})
        } else{
            createNewPostHandler(token,newPostDetails)
        }
         toast.success("Added new post successfully", { id: newPostToast });
        setNewPostDetails({content:'', mediaURL:'', mediaAlt:''})
    }
    return(
        <div className="flex p-3">
            <UserAvatar user={loginUser}/>
            <div className="flex flex-col w-full m-2">
                 <textarea placeholder='Whats happening!' value={newPostDetails?.content} className="border border-gray-500 p-2"
                 rows={2}
                 onChange={(e)=>setNewPostDetails({...newPostDetails,content: e.target.value})}/>
                 <div className="flex flex-row justify-end items-center py-2">
                    <label className="cursor-pointer">
                        <input
                        type="file"
                        accept="image/*, video/*"
                        className="hidden"
                        onChange={(e)=>setNewPostDetails({...newPostDetails, mediaURL: e.target.files[0]})}
                        />
                        <BiSolidImageAdd className="w-9 h-9" />
                    </label>
                    <button className="flex items-center px-5 ml-3 h-8 bg-blue-500 text-white rounded-md shadow-md" onClick={(e)=>submitPostHandler(e)}>Post</button>
                 </div>
            </div>
        </div>
    )
}