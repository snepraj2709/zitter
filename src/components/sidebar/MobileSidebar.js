import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  MdExplore,
  BiSolidBookmark,
  BiSolidUser,
  MdAddCircle,
  BsThreeDots,
  MdLogout,
} from "../../utils/icons";
import { useAuth } from "../../context/authContext";

function MobileSidebar() {
  const { loginUser, logoutHandler } = useAuth();
  const classes = "flex items-center";
  return (
    <div className="flex justify-around md:hidden sticky bottom-0 p-4 bg-gray-100">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return isActive
            ? `${classes} text-blue-500`
            : `${classes} text-gray-800`;
        }}>
        <AiFillHome className="w-6 h-6" />
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) => {
          return isActive
            ? `${classes} text-blue-500`
            : `${classes} text-gray-800`;
        }}>
        <MdExplore className="w-6 h-6" />
      </NavLink>

      <NavLink
        to="/bookmark"
        className={({ isActive }) => {
          return isActive
            ? `${classes} text-blue-500`
            : `${classes} text-gray-800`;
        }}>
        <BiSolidBookmark className="w-6 h-6" />
      </NavLink>

      <NavLink
        to={`/profile/${loginUser?.username}`}
        className={({ isActive }) => {
          return isActive
            ? `${classes} text-blue-500`
            : `${classes} text-gray-800`;
        }}>
        <BiSolidUser className="w-6 h-6" />
      </NavLink>

      {/* <NavLink
        className={({ isActive }) => {
          return isActive
            ? `${classes} text-blue-500`
            : `${classes} text-gray-800`;
        }}>
        <MdAddCircle className="w-6 h-6" />
      </NavLink> */}
    </div>
  );
}

export default MobileSidebar;
