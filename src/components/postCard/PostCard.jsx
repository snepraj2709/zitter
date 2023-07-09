import {UserAvatar} from '../UserAvatar';
import {useUser} from '../../context/userContext';
import {usePost} from '../../context/postContext';
import {FcLike,FiHeart,BiSolidBookmark,BsBookmark,FaComment,BsThreeDots} from '../../utils/icons';
import {timeAgo} from '../../utils/timeAgo';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export function PostCard({post}){
    const {_id,id,content,mediaURL,mediaAlt,username,likes,comments,createdAt} = post;

    const {loginUser,token}=useAuth();
    const {userState:{allUsers},addBookmarkHandler,removeBookmarkHandler,postAlreadyBookmarked}=useUser();
    const {deletePostHandler,editPostHandler,fetchSinglePost,likePostHandler,dislikePostHandler,postLikedByLoggedUser}=usePost();
    const time = timeAgo(createdAt);
    const navigate=useNavigate();
    const postByUser= allUsers?.find((user)=>user.username===username)

    return(
        <div className="flex flex-col border border-gray-500">
			<div >
                <div onClick={()=>navigate(`/profile${postByUser.username}`)} className='flex flex-row justify-between align-middle'>
                    <div className='flex flex-row m-2 justify-evenly align-middle'>
                        <UserAvatar user={postByUser}/>
                        <div className='flex flex-col'>
                            <span>{postByUser?.firstName} {postByUser?.lastName}</span>
                            <span>@{postByUser?.username}</span>  
                        </div>
                        <span>{time}</span>
                    </div>
                    <BsThreeDots/>
                </div>
				    
				<div >
					<div
                        onClick={() => {
                            fetchSinglePost(_id);
                            navigate(`/post/${id}`);
                        }}
                        >
                        <img src={mediaURL} alt={mediaAlt}/>
						<>{content}</>
					</div>
					<div className='flex flex-row justify-between m-3' >
						<div className='flex flex-row' >
                            {
                               postLikedByLoggedUser(loginUser,post) ?(
                                <FcLike onClick={() =>
									 dislikePostHandler(_id,token) 
								}/>
                               ) :<FiHeart onClick={()=>likePostHandler(_id,token)}/>
                            }
							<>{likes?.likeCount>0 && <>{likes?.likeCount}</>}</>
						</div>
						<div className='flex flex-row' >
                            <FaComment/>
							<>{comments?.length}</>
						</div>
						<div className='flex flex-row'>
                            {
                                postAlreadyBookmarked(_id)?(
                                     <BiSolidBookmark onClick={() =>
									 removeBookmarkHandler(_id,token)}/>
                                ):(
                                    <BsBookmark onClick={()=>addBookmarkHandler(_id,token)}/>
                                )
                            } 
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}