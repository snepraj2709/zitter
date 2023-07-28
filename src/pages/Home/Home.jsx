import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import {usePost} from '../../context/postContext';
import {Searchbar} from '../../components/search/Searchbar'
import {PostCard} from '../../components/postCard/PostCard';
import { NewPost } from '../../components/newPost/NewPost';
import {SortPost} from '../../components/sortPosts/SortPost';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'
import { sortPosts } from '../../utils/sortPosts';

export default function Home() {
  const {loginUser}=useAuth();
  const {postState:{allPosts,filterType}}=usePost();
  const postsOfFollowers =allPosts?.filter((post)=>(
      loginUser?.following.some(followedUser=>followedUser.username===post.username) || loginUser.username===post.username))

  const postsOnHome= sortPosts(postsOfFollowers,filterType)

  return (
    <div className="flex justify-center">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:align-middle">
        <div className="flex flex-row justify-between border-b-2 border-gray-500 pb-2">
          <h2 className="font-bold text-lg text-center m-3">Home</h2>
           <Searchbar className='w-full'/>
        </div>
        <NewPost/>
        <SortPost/>
        {postsOnHome?.length!==0?
          postsOnHome?.map((post)=>(
            <div key={post._id} className="justify-items-center">
             <PostCard post={post}/>
            </div>
          )):(<div className="font-medium text-lg text-center mt-10">No Posts</div>)
        }
      </div>
      <div className="w-1/4 border sticky top-0 hidden lg:block">
        <SuggestedUser/>
      </div>
    </div>
  );
}
