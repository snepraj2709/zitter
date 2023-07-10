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
            <aside className="flex-shrink-0 center">
            <Sidebar />
            </aside>
        </div>
        <div className="w-2/4 border border-gray-700 md:items-center">
            <Searchbar/>

            {bookmarkedPosts.length!==0?
            bookmarkedPosts.map((post)=>(
                <div key={post._id}>
                <PostCard post={post}/>
                <hr/>
                </div>
            )):(<h1>No Bookmarks</h1>)
            }
        </div>
        <div className="w-1/4 border hidden lg:block">
            <SuggestedUser/>
        </div>
        </div>
    );
}