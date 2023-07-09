import {Sidebar} from '../../components/sidebar/Sidebar'
import {Searchbar} from '../../components/search/Searchbar';
import {PostCard} from '../../components/postCard/PostCard';
import { useUser } from '../../context/userContext';

export default function Bookmark(){
    const {userState:{bookmarks}} =useUser();

    return (
        <div className="flex">
        <div className="w-1/4 border ">
            <aside className="flex-shrink-0 center">
            <Sidebar />
            </aside>
        </div>
        <div className="w-2/4 border border-gray-700 md:items-center">
            <Searchbar/>

            {bookmarks.length!==0?
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