import { useUser } from '../../context/userContext';
import { usePost } from '../../context/postContext';
import {Sidebar,PostCard,SuggestedUser,PageHeader,MobileSidebar} from '../../components/index';

export default function Bookmark(){
    const {userState:{bookmarks}} =useUser();
    const {postState:{allPosts}} =usePost();
    const bookmarkedPosts = allPosts.filter(post => bookmarks.includes(post._id));

    return (
        <div className="flex">
            <div className="w-1/4 hidden md:block">
                <aside className="flex-shrink-0 center sticky top-0">
                <Sidebar />
                </aside>
            </div>
            <div className="flex flex-col md:w-2/4 border border-gray-700 md:items-center min-h-screen">
                <PageHeader page='Bookmarks'/>
                <div className="flex-grow border border-gray-700 md:items-center">
                    {bookmarkedPosts.length!==0?
                bookmarkedPosts.map((post)=>(
                    <div key={post._id}>
                    <PostCard post={post}/>
                    </div>
                )):(<h1 className="font-medium text-lg text-center mt-5">No Bookmarks</h1>)
                }</div>
                
                <MobileSidebar className='md:hidden'/>
            </div>
            <div className="w-1/4 hidden md:block">
                <SuggestedUser/>
            </div>
        </div>
    );
}