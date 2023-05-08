import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import "../styles/EditBlogs.css"
// import axios from "axios"

export default function EditBlogs() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { id } = useParams();
    const pageData = parseInt(id ?? '0', 10) -1;
    const thiscontent = [{blog_id:1, title: "title1", content: "content1", user_id:1}, {id:2, title: "title2", content: "content2"}]
    const navigate = useNavigate();

    const myBlogData = {
        title:title,
        content:content, 
    }

    function handleNavigate() {
        navigate(`/myblogs`)
    }

// Axios Patch Function
// async function updateBlog(id, data) {
//     try {
//       const response = await axios.patch(`/blog/${id}`, data);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

    useEffect(()=>{
            setContent(thiscontent[pageData].content)
            setTitle(thiscontent[pageData].title)
    },[])
console.log(id)
    return (
    <div className='page-spacing'>
        <div className='data'>
        <TextField
            id="outlined-controlled"
            label="Title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
            }}
        />
        </div>

        <div className='data'>
        <TextField
            id="outlined-controlled"
            label="Content"
            value={content}
            multiline
            rows={6}
            className='content-width'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContent(event.target.value);
            }}
        />
        </div>
        <div>
            <span className='buttonspacing'><Button variant="contained" >Submit</Button></span>
            <span className='buttonspacing'><Button variant="contained" onClick={() => handleNavigate()}>My Blogs</Button></span>
        </div>
    </div>
  )
}
