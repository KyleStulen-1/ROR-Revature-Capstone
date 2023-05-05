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

function App() {

  const [principal, setPrincipal] = useState<User>();

  return (
      <BrowserRouter>
        <Nav currentUser = {principal} setCurrentUser={setPrincipal} />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/editblogs/:id" element={<EditBlogs />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/newuser" element={<NewUser currentUser={principal}/>} />
          <Route path="/login" element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
