import { Sidebar } from '../../components/sidebar/Sidebar';
import {usePost} from '../../context/postContext';
import {PostCard} from '../../components/postCard/PostCard';
import {ProfileDetails} from '../../components/profileDetails/ProfileDetails';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { CommentCard } from '../../components/commentCard/CommentCard';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'

export default function PostDetails(){
  const {postId}=useParams();
    const {isLoading,postState:{allPosts}}=usePost();
    const {userState:{allUsers}}=useUser();
    const currentPost=allPosts.find((post)=>post?._id===postId)

    const postByUser= allUsers?.find((user)=>user?.username===currentPost?.username)

  return (
    !isLoading?(<div className="flex">
      <div className="w-1/4">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 h-full border border-gray-700 md:items-center">
        <PostCard post={currentPost}/>
        <CommentCard comments={currentPost?.comments} user={postByUser}/>
        <hr/>
      </div>
      <div className="w-1/4 hidden lg:block">
        <SuggestedUser/>
      </div>
    </div>):(<div>Loading...</div>)
  );
}