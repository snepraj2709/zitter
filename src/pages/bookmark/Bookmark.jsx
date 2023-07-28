import {Sidebar} from '../../components/sidebar/Sidebar'
import {Searchbar} from '../../components/search/Searchbar';
import {PostCard} from '../../components/postCard/PostCard';
import { useUser } from '../../context/userContext';
import { usePost } from '../../context/postContext';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'

export default function Bookmark(){
    const {userState:{bookmarks}} =useUser();
    const {postState:{allPosts}} =usePost();
   const bookmarkedPosts = allPosts.filter(post => bookmarks.includes(post._id));

    return (
        <div className="flex">
        <div className="w-1/4 border ">
            <aside className="flex-shrink-0 center sticky top-0">
            <Sidebar />
            </aside>
        </div>
        <div className="w-2/4 border border-gray-700 md:items-center">
            <div className="flex flex-row justify-between border-b-2 border-gray-500 pb-2">
                <h2 className="font-bold text-lg text-center m-3">Bookmark</h2>
                <Searchbar className='w-full'/>
            </div>

            {bookmarkedPosts.length!==0?
            bookmarkedPosts.map((post)=>(
                <div key={post._id}>
                <PostCard post={post}/>
                <hr/>
                </div>
            )):(<h1 className="font-medium text-lg text-center mt-10">No Bookmarks</h1>)
            }
        </div>
        <div className="w-1/4 border hidden lg:block">
            <SuggestedUser/>
        </div>
        </div>
    );
}