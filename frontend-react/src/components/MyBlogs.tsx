import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyBlog.css';
//import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';

type Blog = {
    username: string;
    blog_id: number;
}

export default function MyBlogs (){
    const thiscontent = [{id:1, title: "title1", content: "content1", user_id:1}, {id:2, title: "title2", content: "content2"}]
    const navigate = useNavigate();


    function handleEdit(id: number) {
        navigate(`/editblog/${id}`)
    }

    function handleDelete(id: number) {
        console.log(id)
    }
    return (
        <>
        {thiscontent.map(content => (
            <div className = 'blogspacing'>
                <div>
                    <span className='header'> { content.title } </span> 
                    <button className = 'buttonspacing' onClick={() => handleEdit(content.id)}> Edit Blog </button> 
                    <button  className = 'buttonspacing' onClick = { () => handleDelete }> Delete Blog</button>
                </div>
                <div>
                    {content.content}
                </div>
            </div>
    ))}
        </>
    )

}