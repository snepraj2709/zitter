import { Link, NavLink } from 'react-router-dom';
import {useState} from 'react';
import {AiFillHome,MdExplore,BiSolidBookmark,BiSolidUser,MdAddCircle,BsThreeDots,MdLogout} from '../../utils/icons'
import { useAuth } from '../../context/authContext'
import { zitterLogo } from '../../utils/constants';
import { UserAvatar } from '../avatar/UserAvatar';
import { NewPostModal } from '../newPostModal/NewPostModal';

export  function Sidebar(){
const {loginUser,logoutHandler}=useAuth();
const [newPost,setNewPost]=useState(false);
const classes='flex items-center';

function openModal(){
    setNewPost(true);
}

function closeModal(){
    setNewPost(false);
}
return(
    <div>
        <div className="flex flex-col items-center min-h-screen left-0 top-0">
            <div className="flex sm:items-start px-5 py-15 sm:flex-col gap-3 grow space-y-1.5 items-center md:items:start">
                <li className="flex items-center ">
                <Link to="/" className="flex items-center">
                    <img src={zitterLogo} alt="zitter-logo" className="w-10 h-10" />
                    <span className="ml-2 font-bold text-2xl p-2">Zitter</span>
                </Link>
                </li>
                <li className="flex items-center">
                <NavLink to="/" className={({ isActive }) => {
                return isActive
                    ? `${classes} text-blue-500`
                    : `${classes} text-gray-800`;
                }}>
                    <AiFillHome className="w-6 h-6" />
                    <span className="ml-2 text-lg hidden md:inline-flex">Home</span>
                </NavLink>
                </li>
                <li className="flex items-center">
                <NavLink to="/explore" className={({ isActive }) => {
                return isActive
                    ? `${classes} text-blue-500`
                    : `${classes} text-gray-800`;
                }}>
                    <MdExplore className="w-6 h-6" />
                    <span className="ml-2 text-lg hidden md:inline-flex">Explore</span>
                </NavLink>
                </li>

                <li className="flex items-center">
                <NavLink to="/bookmark" className={({ isActive }) => {
                return isActive
                    ? `${classes} text-blue-500`
                    : `${classes} text-gray-800`;
                }}>
                    <BiSolidBookmark className="w-6 h-6" />
                    <span className="ml-2 text-lg hidden md:inline-flex">Bookmark</span>
                </NavLink>
                </li>

                <li className="flex items-center">
                <NavLink to={`/profile/${loginUser?.username}`} className={({ isActive }) => {
                return isActive
                    ? `${classes} text-blue-500`
                    : `${classes} text-gray-800`;
                }}>
                    <BiSolidUser className="w-6 h-6" />
                    <span className="ml-2 text-lg hidden md:inline-flex">Profile</span>
                </NavLink>
                </li>

                <li className="flex items-center">
                <NavLink className={({ isActive }) => {
                return isActive
                    ? `${classes} text-blue-500`
                    : `${classes} text-gray-800`;
                }}>
                    <button className="flex items-center md:px-2 md:py-2 md:bg-blue-500 text-black md:text-white rounded-md" onClick={openModal}>
                    <MdAddCircle className="w-6 h-6" />
                    <span className="ml-2 hidden md:inline-flex">New Post</span>
                    </button>
                </NavLink>
                </li>
            </div>

            <div className="flex p-2 rounded-xl bg-gray-100 m-2 shadow-md shadow-blue-300/40 hover:shadow-indigo-500/40">
                <UserAvatar user={loginUser} className='w-9 h-9'/>
                    <div className="flex flex-col lg:inline">
                        <p className="font-bold text-gray-900 text-md lg:text-base">{loginUser?.firstName} {loginUser?.lastName}</p>
                        <p className="font-normal text-gray-500 text-sm lg:text-sm">{loginUser?.username}</p>
                    </div>
                <MdLogout className="ml-4 lg:inline my-auto hover:scale-105 sm:w-6 sm:h-6 lg:w-8 lg:h-8 cursor-pointer" onClick={logoutHandler}/>
            </div>
        </div>  
        {
            newPost && <div className='fixed z-40'><NewPostModal onClose={closeModal}/></div>
        }
    </div>
)}