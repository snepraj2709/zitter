import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import {usePost} from '../../context/postContext';
import {Searchbar} from '../../components/search/Searchbar'
import {PostCard} from '../../components/postCard/PostCard';

export default function Home() {

    const {loginUser}=useAuth();
    const {isLoading,postState:{allPosts,filterType},postDispatch}=usePost();
    
 console.log('loginUser',loginUser)

    const postsOfFollowers =allPosts.filter((post)=>(
        loginUser.following.some(followedUser=>followedUser.username===post.username) || loginUser.username===post.username
    ))
      
    console.log('allPosts',allPosts)

  return (
    <div className="flex">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700">
        <Searchbar/>
        {postsOfFollowers.length!==0?
          postsOfFollowers.map((post)=>(
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
    </div>
  );
}
