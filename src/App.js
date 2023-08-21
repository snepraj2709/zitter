import "./index.css";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  SignUp,
  Home,
  Explore,
  Bookmark,
  Profile,
  PostDetails,
} from "./pages/index";
import { ToasterWrapper, PrivateRoute, NotFound } from "./components/index";

export default function App() {
  return (
    <div>
      <ToasterWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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
