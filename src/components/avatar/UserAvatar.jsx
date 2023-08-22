import { DefaultUserAvatar } from "../../utils/constants";

export function UserAvatar({ user,className }) {
  const avatar = user?.profileAvatar;
  
  const classForAvatar=className?`${className} rounded-full object-cover`:'w-10 h-10 rounded-full object-cover'
 
  return (
    <span>
      {avatar ? (
        <img
          src={avatar}
          alt={user?.firstName}
          className={classForAvatar}
        />
      ) : (
        <img
          src={DefaultUserAvatar}
          alt={user?.firstName}
          className={classForAvatar}
        />
      )}
    </span>
  );
}
