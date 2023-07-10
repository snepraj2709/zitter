import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ToasterWrapper from "./components/toaster/ToasterWrapper";
import PrivateRoute from "./components/route/PrivateRoute";
import Explore from "./pages/explore/Explore";
import Bookmark from "./pages/bookmark/Bookmark";
import Profile from "./pages/profile/Profile";
import PostDetails from "./pages/post/PostDetails";
import NotFound from "./components/NotFound";
import Mockman from "mockman-js";

export default function App() {
  return (
    <div>
      <ToasterWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mockman" element={<Mockman />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:postId" element={<PostDetails />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
