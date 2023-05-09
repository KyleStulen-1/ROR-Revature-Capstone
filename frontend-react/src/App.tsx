import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import Nav from "./components/Nav";
import Blogs from "./components/Blogs"
import NewBlog from "./components/NewBlog"
import MyBlogs from "./components/MyBlogs"
import NewUser from "./components/NewUser"
import Login from "./components/Login";
import EditBlogs from "./components/EditBlogs";
import {User} from "./models/user"

import {BlogDetails} from "./components/BlogDetails";

function App() {

  const [principal, setPrincipal] = useState<User>();

  return (
      <BrowserRouter>
        <Nav currentUser = {principal} setCurrentUser={setPrincipal} />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/newblog" element={<NewBlog currentUser={principal} />} />
          <Route path="/editblogs/:id" element={<EditBlogs currentUser={principal}/>} />
          <Route path="/myblogs" element={<MyBlogs currentUser={principal} />} />
          <Route path="/newuser" element={<NewUser currentUser={principal}/>} />
          <Route path="/login" element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>} />
          <Route path="/blogdetails/:user_id/:id" element={<BlogDetails currentUser={principal}/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
