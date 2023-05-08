import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import "../styles/EditBlogs.css"
import axios from "axios"
import { User } from '../models/user';
import { authAppClient } from '../remote/authenticated-app-client';

interface IUserCreateProps {
    currentUser: User | undefined
}

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
export default function EditBlogs(props: IUserCreateProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<Blog>();
    const [data, setData] = useState<string>("");
    const { id } = useParams();
    const pageData = parseInt(id ?? '0', 10) -1;
    // const thiscontent = [{blog_id:1, title: "title1", content: "content1", user_id:1}, {id:2, title: "title2", content: "content2"}]
    const navigate = useNavigate();

    const myBlogData = {
        title:title,
        content:data, 
    }

    function handleUpdateBlog() {
        updateBlog( myBlogData )
        navigate(`/myblogs`)
    }

    function handleNavigate() {
        navigate(`/myblogs`)
    }


    async function updateBlog(blog_data: any) {
        try {
            const response = await authAppClient.patch(`/user/${props.currentUser?.user_id}/blog/${content?.id}`, blog_data);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        async function getBlogs() {
            try {
                const response = await authAppClient.get(`/user/${props.currentUser?.user_id}/blog/${id}`)
                console.log(response.data)
                setContent(response.data)
                setTitle(response.data.title)
                setData(response.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        getBlogs()
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
            value={data}
            multiline
            rows={6}
            className='content-width'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setData(event.target.value);
            }}
        />
        </div>
        <div>
            <span className='buttonspacing'><Button variant="contained" onClick={() => handleUpdateBlog()}>Submit</Button></span>
            <span className='buttonspacing'><Button variant="contained" onClick={() => handleNavigate()}>My Blogs</Button></span>
        </div>
    </div>
  )
}
