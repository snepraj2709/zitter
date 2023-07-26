import { usePost } from "../../context/postContext";
import {Sidebar} from '../../components/sidebar/Sidebar'
import {Searchbar} from '../../components/search/Searchbar';
import {PostCard} from '../../components/postCard/PostCard';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'

export default function Explore(){
    
    const {postState:{allPosts}}=usePost();

  return (
    <div className="flex">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center sticky top-0">
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
          )):(<div className="font-medium text-lg text-center mt-10">No Posts</div>)
        }
      </div>
     <div className="w-1/4 border hidden lg:block">
        <SuggestedUser/>
      </div>
    </div>
  );
}