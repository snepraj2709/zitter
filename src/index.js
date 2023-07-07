import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";
import { useUser, UserProvider } from "./context/userContext";
import { usePost, PostProvider } from "./context/postContext";

// Call make Server
makeServer();
export { useAuth, useUser, usePost };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
