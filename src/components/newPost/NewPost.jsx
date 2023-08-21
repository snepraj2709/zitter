import { useAuth } from "../../context/authContext"
import { UserAvatar } from "../avatar/UserAvatar";
import { usePost } from "../../context/postContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {uploadFile} from '../../utils/uploadFile';
import { BiSolidImageAdd, MdCancel } from "../../utils/icons";

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
    <div className="flex border border-t-gray-500">
        <div className="flex flex-col w-full p-3">
            <UserAvatar user={loginUser}/>
            <div className="flex flex-col w-full m-2">
                <div>
                    <textarea
                        placeholder='Whats happening!'
                        value={newPostDetails?.content}
                        className="p-2 border-none outline-none"
                        rows={1}
                        onChange={(e) => setNewPostDetails({ ...newPostDetails, content: e.target.value })}
                    />
                    {newPostDetails.mediaURL && (
                        <div className="relative">
                            {newPostDetails.mediaURL.type.includes('video') ? (
                            <video controls className="w-full h-auto rounded-md">
                                <source src={URL.createObjectURL(newPostDetails.mediaURL)} type="video/mp4" />
                            </video>
                        ) : (
                            <div>
                                <img src={URL.createObjectURL(newPostDetails.mediaURL)} alt={newPostDetails.mediaAlt} className="w-full h-auto rounded-md"/>
                            </div>
                        )}
                        <button type="button" onClick={()=>setNewPostDetails({...newPostDetails,mediaURL:null})} className="absolute top-1.5 left-2 text-lg">
                            <MdCancel className="w-8 h-8"/>
                        </button>
                    </div> 
                    )}   
                </div>

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
    </div>
    )
}