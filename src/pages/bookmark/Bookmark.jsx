import {Sidebar} from '../../components/sidebar/Sidebar'
import {PostCard} from '../../components/postCard/PostCard';
import { useUser } from '../../context/userContext';
import { usePost } from '../../context/postContext';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'
import PageHeader from '../../components/pageHeader/PageHeader';
import MobileSidebar from '../../components/sidebar/MobileSidebar';

export default function Bookmark(){
    const {userState:{bookmarks}} =useUser();
    const {postState:{allPosts}} =usePost();
   const bookmarkedPosts = allPosts.filter(post => bookmarks.includes(post._id));

    return (
        <div className="flex min-h-screen">
        <div className="w-1/4 hidden md:block">
            <aside className="flex-shrink-0 center sticky top-0">
            <Sidebar />
            </aside>
        </div>
        <div className="md:w-2/4 border border-gray-700 md:items-center min-h-screen">
            <PageHeader page='Bookmarks'/>
            {bookmarkedPosts.length!==0?
            bookmarkedPosts.map((post)=>(
                <div key={post._id}>
                <PostCard post={post}/>
                </div>
            )):(<h1 className="font-medium text-lg text-center mt-10">No Bookmarks</h1>)
            }
            <MobileSidebar className='md:hidden'/>
        </div>
        <div className="w-1/4 hidden md:block">
            <SuggestedUser/>
        </div>
        </div>
    );
}