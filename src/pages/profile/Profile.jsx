import {usePost} from '../../context/postContext';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import {Sidebar,PostCard,SuggestedUser,ProfileDetails,MobileSidebar} from '../../components/index';

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
      <div className="w-1/4 hidden md:block ">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="flex flex-col md:w-2/4 border border-gray-700 md:items-center min-h-screen">
        <ProfileDetails user={currentUser} totalPosts={postsOfCurrentUser}/>
        <div className="flex-grow md:items-center">
          {postsOfCurrentUser.length!==0?
          postsOfCurrentUser?.map((post)=>(
            <div key={post._id}>
             <PostCard post={post}/>
             <hr/>
            </div>
          )):(<div className="font-medium text-lg text-center mt-10">No Posts</div>)
        }
        </div>
        <MobileSidebar className='md:hidden'/>
      </div>
      <div className="w-1/4 hidden md:block">
        <SuggestedUser/>
      </div>
    </div>):(<div>Loading...</div>)
    
  );
}