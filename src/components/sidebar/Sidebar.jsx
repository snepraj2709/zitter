import { Link, NavLink } from 'react-router-dom'
import {AiFillHome,MdExplore,BiSolidBookmark,BiSolidUser,MdAddCircle,BsThreeDots,MdLogout} from '../../utils/icons'
import { useAuth } from '../../context/authContext'
import { zitterLogo } from '../../utils/constants';
import { UserAvatar } from '../UserAvatar';

export  function Sidebar(){
const {loginUser,logoutHandler}=useAuth();

    return(
        <aside  className="sticky top-0">
            <ul className="flex items-center sm:items-start justify-around sm:justify-start px-5 py-15 sm:py-4 sm:flex-col gap-3 sm:gap-2 tracking-wide grow space-y-1.5">
                <li className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src={zitterLogo} alt="zitter-logo" className="w-6 h-6" />
                        <span className="ml-2 font-bold text-2xl p-2">Zitter</span>
                    </Link>
                </li>
                <li className="flex items-center">
                    <NavLink to="/" className="flex items-center">
                        <AiFillHome className="w-6 h-6" />
                        <span className="ml-2 text-xl">Home</span>
                    </NavLink>
                </li>
                <li className="flex items-center">
                <NavLink to="/explore" className="flex items-center">
                    <MdExplore className="w-6 h-6" />
                    <span className="ml-2 text-xl">Explore</span>
                </NavLink>
                </li>

                <li className="flex items-center">
                <NavLink to="/bookmark" className="flex items-center">
                    <BiSolidBookmark className="w-6 h-6" />
                    <span className="ml-2 text-xl">Bookmark</span>
                </NavLink>
                </li>

                <li className="flex items-center">
                <NavLink to={`/profile/${loginUser?.username}`} className="flex items-center">
                    <BiSolidUser className="w-6 h-6" />
                    <span className="ml-2 text-xl">Profile</span>
                </NavLink>
                </li>

                {/* <li className="flex items-center">
                <NavLink className="flex items-center">
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
                    <MdAddCircle className="w-6 h-6" />
                    <span className="ml-2">New Post</span>
                    </button>
                </NavLink>
                </li> */}

                <li className="flex items-center justify-center space-x-4 p-2 rounded-xl shadow shadow-blue-500/40 hover:shadow-indigo-500/40">
                <UserAvatar user={loginUser} />
                <div className="flex flex-col text-sm lg:inline">
                    <p className="font-bold text-gray-900 text-xl">{loginUser?.firstName} {loginUser?.lastName}</p>
                    <p className="font-normal text-gray-500 text-lg">{loginUser?.username}</p>
                </div>
                <MdLogout className="ml-4 hidden lg:inline hover:scale-105" onClick={logoutHandler}/>
                </li>
            </ul>  
        </aside>
    )
}