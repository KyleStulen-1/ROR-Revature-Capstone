import { useEffect, useState } from "react"
import { Blog, BlogAuthor } from "../models/blog";
import { authAppClient } from "../remote/authenticated-app-client";
import {useParams} from "react-router-dom";
import { User } from '../models/user';

interface IUserCreateProps {
    currentUser: User | undefined
}
export function BlogDetails(props: IUserCreateProps){
    const blogID = useParams().id;//
    const userID = useParams().user_id;
    const user = useParams().user;
    const [blogs, setBlogs] = useState<BlogAuthor|undefined>(undefined);
    useEffect(()=>{
        (async ()=>{
            const response = await authAppClient.get<BlogAuthor>(`/user/${userID}/blog/${blogID}`)
            .then((response)=>{
                setBlogs(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
            
        })();
    }, [])
    return (<>
               {!blogs? <p id="search-msg">LOADING</p> :
               <div className="blog">
                    <div className="author-info">
                        <p id="blog-title">{blogs.title}</p>
                        <p id="author-date">{formatDate(blogs.updated_at)}</p>
                    </div>
                    <div className="name-container">
                         <p id="author-name">{blogs.user.first_name} {blogs.user.last_name}</p>
                        
                    </div>
                    
                    <div id="content">
                        <p>{blogs.content}</p>
                        
                    </div>
                    <div className="blogInfo">
                    <p>viewed <span id="viewcount"> {blogs.view_count}</span> times</p>
                    
                    </div>
                </div>}
    </>)
}

function formatDate(dateString:string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}