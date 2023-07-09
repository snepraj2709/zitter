import { useAuth } from "../../context/authContext";
import { usePost } from "../../context/postContext";
import {Sidebar} from '../../components/sidebar/Sidebar'
import {Searchbar} from '../../components/search/Searchbar';
import {PostCard} from '../../components/postCard/PostCard';

export default function Explore(){
     const {loginUser}=useAuth();
    const {isLoading,postState:{allPosts,filterType},postDispatch}=usePost();

  return (
    <div className="flex">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:items-center">
        <Searchbar/>

        {allPosts.length!==0?
          allPosts.map((post)=>(
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