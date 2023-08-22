import { usePost } from "../../context/postContext";
import {sortPosts } from '../../utils/sortPosts';
import {Sidebar,PostCard,SuggestedUser,SortPost,PageHeader,MobileSidebar} from '../../components/index';

export default function Explore(){
    const {postState:{allPosts,filterType}}=usePost();
    const postsOnExplore= sortPosts(allPosts,filterType)

  return (
    <div className="flex">
      <div className="w-1/4 hidden md:block">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="flex flex-col md:w-2/4 border border-gray-700 md:items-center min-h-screen">
        <PageHeader page='Explore'/>
        <SortPost/>
          <div className="flex-grow md:items-center">
            {postsOnExplore.length!==0?
          postsOnExplore.map((post)=>(
            <div key={post._id}>
             <PostCard post={post}/>
            </div>
          )):(<div className="font-medium text-lg text-center mt-10">No Posts</div>)
        }
          </div>
         <MobileSidebar className='md:hidden'/>
      </div>
      <div className="w-1/4 hidden md:block">
        <SuggestedUser/>
      </div>
    </div>
  );
}