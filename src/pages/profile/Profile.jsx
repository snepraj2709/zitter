import { Sidebar } from '../../components/sidebar/Sidebar';
import {usePost} from '../../context/postContext';
import {PostCard} from '../../components/postCard/PostCard';
import {ProfileDetails} from '../../components/profileDetails/ProfileDetails';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/userContext';


export default function Profile(){
  const current=useParams();
   
    const {userState:{allUsers}}=useUser();
    const currentUser=allUsers.find((user)=>user?.username===current.username)

    const {isLoading,postState:{allPosts}}=usePost();

    const postsOfCurrentUser =allPosts.filter((post)=>(
       currentUser?.username===post?.username
    ))

  return (
    !isLoading?(<div className="flex">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:items-center">
        <ProfileDetails user={currentUser} totalPosts={postsOfCurrentUser}/>
        {postsOfCurrentUser.length!==0?
          postsOfCurrentUser?.map((post)=>(
            <div key={post._id}>
             <PostCard post={post}/>
             <hr/>
            </div>
          )):(<div>No Posts</div>)
        }
      </div>
      <div className="w-1/4 border hidden lg:block">
        <div className="bg-gray-300">Suggested User</div>
      </div>
    </div>):(<div>Loading...</div>)
    
  );
}