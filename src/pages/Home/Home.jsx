import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import {usePost} from '../../context/postContext';
import {Searchbar} from '../../components/search/Searchbar'
import {PostCard} from '../../components/postCard/PostCard';
import { NewPost } from '../../components/newPost/NewPost';
import {SortPost} from '../../components/sortPosts/SortPosts';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'

export default function Home() {

    const {loginUser}=useAuth();
    const {isLoading,postState:{allPosts,filterType},postDispatch}=usePost();

    const postsOfFollowers =allPosts.filter((post)=>(
        loginUser.following.some(followedUser=>followedUser.username===post.username) || loginUser.username===post.username
    ))

  return (
    <div className="flex justify-center z-0">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:align-middle">
        <Searchbar/>
        <SortPost/>
        <NewPost/>
        {postsOfFollowers.length!==0?
          postsOfFollowers.map((post)=>(
            <div key={post._id} className="justify-items-center">
             <PostCard post={post}/>
             <hr/>
            </div>
          )):(<div>No Posts</div>)
        }
      </div>
      <div className="w-1/4 border  sticky top-0 hidden lg:block">
        <SuggestedUser/>
      </div>
    </div>
  );
}
