import { usePost } from "../../context/postContext";
import {Sidebar} from '../../components/sidebar/Sidebar'
import {Searchbar} from '../../components/search/Searchbar';
import {PostCard} from '../../components/postCard/PostCard';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser';
import {SortPost} from '../../components/sortPosts/SortPost'
import { sortPosts } from '../../utils/sortPosts';

export default function Explore(){
    
    const {postState:{allPosts,filterType}}=usePost();
    const postsOnExplore= sortPosts(allPosts,filterType)

  return (
    <div className="flex">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:items-center">
       <div className="flex flex-row justify-between border-b-2 border-gray-500 pb-2">
          <h2 className="font-bold text-lg text-center m-3">Explore</h2>
           <Searchbar className='w-full'/>
        </div>
        <SortPost/>
        {postsOnExplore.length!==0?
          postsOnExplore.map((post)=>(
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