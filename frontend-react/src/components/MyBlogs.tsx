import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyBlog.css';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { authAppClient } from '../remote/authenticated-app-client';
import { User } from '../models/user';

type Blog = {
    id: number;
    title: string;
    content: string;
    view_count: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    topics_id: number;
}

interface IUserCreateProps {
    currentUser: User | undefined
}

export default function MyBlogs (props: IUserCreateProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Blog[]>([]);

    // Navigate to EditBlogs page
    function handleEdit(id: number) {
        navigate(`/editblogs/${id}`)
    }

    // Function to delete the blogs then rerender the page with the deleted blog removed
    function handleDeleteBlog(id: number) {
        deleteBlog(id).then(() => {
            setContent(content.filter(blog => blog.id !== id));
        });
        setOpen(false);
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

    // Axios get function for all the user's blogs
    useEffect(() => {
        async function getBlogs() {
            authAppClient.get(`/user/${props.currentUser?.user_id}/blog`)
                .then((response)=>{
                    setContent(response.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        getBlogs()
        console.log(props.currentUser?.user_id)
    }, [])

    // Axios delete function 
    async function deleteBlog(id: number) {
        try {
         const response = await authAppClient.delete(`/user/${props.currentUser?.user_id}/blog/${id}`)
            setOpen(false)
            navigate('/myblogs')
          return response.data;
        }
         catch(error) {
          console.error(error);
            setOpen(false)
        }
    }

    return (
        <>
        { content? 
        <div className = 'blogspacing'>
        <div className = 'name-font'> {props.currentUser?.first_name }'s Blogs</div>
        
        {content.map(content => (
            <div >
                
                <div className = 'grid-div'>
                    <span className='header'> { content.title } </span> 
                    <div> 
                        <span className ='buttonspacing'><Button  variant="contained" onClick={() => handleEdit(content.id)}> Edit</Button></span> 
                        <span className ='buttonspacing'><Button  variant="contained" color="error" onClick={() => setOpen(true)}> Delete</Button></span>
                    </div>
                </div>
                <div className='content'>
                    {content.content}
                </div>
                <div className='updatedAt'>Updated At: {formatDate(content.updated_at)}</div>
                {/* Pop up box to confirm delete */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogContent>
                    <p>Are you sure you want to delete this post?</p>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleDeleteBlog(content.id)} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
    ))}

    
      </div>
        : <div> No blogs </div>
}
        </>

    )
}