import {usePost} from '../../context/postContext';
import {BiArrowBack} from '../../utils/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import {Sidebar,PostCard,SuggestedUser,CommentCard,MobileSidebar} from '../../components/index';


export default function PostDetails(){
  const {postId}=useParams();
  const navigate=useNavigate();
  const {isLoading,postState:{allPosts}}=usePost();
  const {userState:{allUsers}}=useUser();
  const currentPost=allPosts.find((post)=>post?._id===postId)

  const postByUser= allUsers?.find((user)=>user?.username===currentPost?.username)

  return (
    !isLoading?(<div className="flex">
      <div className="w-1/4 hidden md:block">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="flex flex-col md:w-2/4 border border-gray-700 md:items-center min-h-screen">
        <div className="bg-gray-100 p-4">
          <BiArrowBack className="mr-2 text-lg text-gray-600 cursor-pointer" onClick={()=>navigate(-1)}/>
        </div>
        <div className="flex-grow  md:items-center">
          <PostCard post={currentPost}/>
        <CommentCard comments={currentPost?.comments} user={postByUser}/>
        </div>
        <MobileSidebar className='md:hidden'/>
      </div>
      <div className="w-1/4 hidden md:block">
        <SuggestedUser/>
      </div>
    </div>):(<div>Loading...</div>)
  );
}