import {Navigate, Outlet, useLocation } from "react-router-dom";
import {useAuth} from '../../context/authContext';

export function PrivateRoute(){
    const location=useLocation();
    const {token}=useAuth();
    return (token?<Outlet/>:
       <Navigate to='/login' state={{from:location}} replace/>
    )
}