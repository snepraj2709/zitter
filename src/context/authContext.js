//import axios from 'axios';
import { createContext, useContext, useState } from "react";
import { LoginService, SignUpService } from "../services/authServices";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageToken = JSON.parse(localStorage.getItem("loginItems"));

  const [loginItems, setLoginItems] = useState({
    loginUser: localStorageToken?.loginUser,
    token: localStorageToken?.token,
  });
  const { loginUser, token } = loginItems;
  const [loading, setLoading] = useState(false);

  const loginHandler = async (username, password) => {
    setLoading(true);
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await LoginService({ username, password });
      console.log("Found loginUser", foundUser, status);
      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginItems",
          JSON.stringify({ token: encodedToken, loginUser: foundUser })
        );

        setLoginItems({
          ...loginItems,
          loginUser: foundUser,
          token: encodedToken,
        });
        toast.success(`Welcome back, ${foundUser}!`);
        navigate(location?.state?.from?.pathname, "/", { replace: true });
      }
      if (status === 404) {
        toast.message(
          "The username you entered is not Registered, Please Signup before Login"
        );
      }
    } catch (e) {
      console.error(e);
      toast.error("Please enter correct login details");
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (username, password, firstName, lastName) => {
    setLoading(true);
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await SignUpService({ username, password, firstName, lastName });
      if (status === 200 || status === 201) {
        // saving the loginItems in the localStorage
        localStorage.setItem(
          "loginItems",
          JSON.stringify({
            token: encodedToken,
            loginUser: loginItems.loginUser,
          })
        );
      }

      setLoginItems({
        ...loginItems,
        loginUser: createdUser,
        token: encodedToken,
      });

      //welcome loginUser with toast
      toast.success(`Hi, ${createdUser.firstName}!`, {
        icon: "👋",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoading(false);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("loginItems");
    setLoginItems({ loginUser: null, token: null });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        token,
        loading,
        setLoginItems,
        loginHandler,
        logoutHandler,
        signupHandler,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
