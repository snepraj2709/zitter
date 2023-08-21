import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import {usePost} from '../../context/postContext';
import {PostCard} from '../../components/postCard/PostCard';
import { NewPost } from '../../components/newPost/NewPost';
import {SortPost} from '../../components/sortPosts/SortPost';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'
import { sortPosts } from '../../utils/sortPosts';
import PageHeader from '../../components/pageHeader/PageHeader';
import MobileSidebar from '../../components/sidebar/MobileSidebar';

export default function Home() {
  const {loginUser}=useAuth();
  const {postState:{allPosts,filterType}}=usePost();
  const postsOfFollowers =allPosts?.filter((post)=>(
      loginUser?.following.some(followedUser=>followedUser.username===post.username) || loginUser.username===post.username))

  const postsOnHome= sortPosts(postsOfFollowers,filterType)

  return (
    <div className="flex">
      <div className="w-1/4 hidden md:block">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="md:w-2/4 border border-gray-700 md:items-center min-h-screen">
        <PageHeader page='Home'/>
        <NewPost/>
        <SortPost/>
        {postsOnHome?.length!==0?
          postsOnHome?.map((post)=>(
            <div key={post._id}>
             <PostCard post={post}/>
            </div>
          )):(<div className="font-medium text-lg text-center mt-10">No Posts</div>)
        }
        <MobileSidebar className='md:hidden'/>
      </div>
      <div className="w-1/4 hidden md:block">
        <SuggestedUser/>
      </div>
    </div>
  );
}
