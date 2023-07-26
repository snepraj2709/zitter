import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import {usePost} from '../../context/postContext';
import {Searchbar} from '../../components/search/Searchbar'
import {PostCard} from '../../components/postCard/PostCard';
import { NewPost } from '../../components/newPost/NewPost';
import {SortPost} from '../../components/sortPosts/SortPosts';
import {SuggestedUser} from '../../components/suggestedUser/SuggestedUser'
import { useEffect,useState } from 'react';

export default function Home() {

    const {loginUser}=useAuth();
    const {postState:{allPosts}}=usePost();
    const [posts,setPosts]=useState([])

    useEffect(()=>{
      const postsOfFollowers =allPosts?.filter((post)=>(
        loginUser?.following.some(followedUser=>followedUser.username===post.username) || loginUser.username===post.username
    ))
    setPosts(postsOfFollowers)
    },[allPosts])

  return (
    <div className="flex justify-center z-0">
      <div className="w-1/4 border ">
        <aside className="flex-shrink-0 center sticky top-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4 border border-gray-700 md:align-middle">
        <Searchbar/>
        <NewPost/>
        <SortPost/>
        {posts?.length!==0?
          posts?.map((post)=>(
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
