import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyBlog.css';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { authAppClient } from '../remote/authenticated-app-client';
// import axios from 'axios'

type Blog = {
    username: string;
    blog_id: number;
}


export default function MyBlogs (){
    const content = [
        {id:1, title: "title1", content: "In this project, we are going to create an Lorem Ipsum generator with JavaScript. Lorem Ipsum is the dummy text, used by almost all developers to show in place of data in their project. We are going to use a variance of it called Hipster Ipsum. So, as usual head over to your terminal and create a folder LoremIpsum. Inside it three files index.html, main.js and styles.css.", user_id:1, updated_at:"2001-02-03T04:05:06+00:00"}, 
        {id:2, title: "title2", content: "content2", user_id:2, updated_at:"2001-02-03T04:05:06+00:00"}
    ]
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    // Navigate to EdidtBlogs page
    function handleEdit(id: number) {
        navigate(`/editblogs/${id}`)
    }

    // function that needs to be replaced with axios call for delete
    function sayHello () {
        console.log("hello")
        setOpen(false)
    }

    // Function for formatting time
    function formatDate(date: string) {
        let  updatedDate=new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',day: '2-digit',year: 'numeric'})
            return updatedDate
    }
    // Function to bring up pop up box
    function DeletePostDialog() {
        const handleDelete = () => {
          setOpen(false);
        }
    }

    // Axios delete function replace with say hello
    async function deleteBlog(id: string) {
        try {
         const response = await authAppClient.delete(`/blogs/${id}`)
            setOpen(false)
          return response.data;
        }
         catch(error) {
          console.error(error);
            setOpen(false)
        }
    }

    return (
        <>
        <div className = 'blogspacing'>
        <div>UserName's Blogs</div>
        {content.map(content => (
            <div >
                
                <div>
                    <span className='header'> { content.title } </span> 
                    <span className ='buttonspacing'><Button  variant="contained" onClick={() => handleEdit(content.id)}> Edit</Button></span> 
                    <span className ='buttonspacing'><Button  variant="contained" color="error" onClick={() => setOpen(true)}> Delete</Button></span>
                </div>
                <div className='content'>
                    {content.content}
                </div>
                <div className='updatedAt'>Updated At: {formatDate(content.updated_at)}</div>
            </div>
    ))}

    {/* Pop up box to confirm delete */}
     <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this post?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={sayHello} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      </div>
        </>
    )
}