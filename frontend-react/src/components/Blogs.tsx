import { useEffect, useState } from "react"
import { Blog, BlogAuthor } from "../models/blog";
import { authAppClient } from "../remote/authenticated-app-client";

import "../css/blog.css"
import { updateViewCount } from "../remote/services/blog-service";


export default function Blogs (){

    const [blogs, setBlogs] = useState<BlogAuthor[]>([{id: 0, title:"", content:"", view_count:0, created_at:"",updated_at:"", user_id:0, user:{first_name:"", last_name:""},readMore:false }]);
    const [fBlogs, setFBlogs] = useState<BlogAuthor[]>([{id: 0, title:"", content:"", view_count:0, created_at:"",updated_at:"", user_id:0, user:{first_name:"", last_name:""},readMore:false}]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    
    useEffect(()=>{
        (async ()=>{
            const response = await authAppClient.get<BlogAuthor[]>('/blog')

            const sortedBlogs = response.data.sort( (b1,b2) =>
                Date.parse(b2.updated_at) - Date.parse(b1.updated_at)
            )

            sortedBlogs.forEach((b)=>{ b.readMore = false })

            setBlogs(sortedBlogs)
            setFBlogs(sortedBlogs);
        })();
    }, [])

    function handleSearch(){
        if(searchTerm){

            const filteredBlogs = blogs.filter(b =>
                `${b.user.first_name} ${b.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(filteredBlogs)
            setFBlogs( () => filteredBlogs );    
        } else {
            setFBlogs(() => []);
        }
    }

    async function handleReadmore(blog:BlogAuthor){

        const blogIndex = fBlogs.indexOf(blog);
        const updatedBlogs = [...fBlogs];
        
        updatedBlogs[blogIndex] = {
        ...updatedBlogs[blogIndex],
        readMore: !updatedBlogs[blogIndex].readMore
        };
        console.log("STATE2")
        
        //-------
        
        if(updatedBlogs[blogIndex].readMore) {
            await updateViewCount(blog.user_id, blog.id)
            updatedBlogs[blogIndex] = {
                ...updatedBlogs[blogIndex],
                view_count: updatedBlogs[blogIndex].view_count
                }
        }

        const response = await authAppClient.get<BlogAuthor[]>('/blog')

        const sortedBlogs = response.data.sort( (b1,b2) =>
            Date.parse(b2.updated_at) - Date.parse(b1.updated_at)
        )

        sortedBlogs.forEach((b)=>{ b.readMore = false })
        sortedBlogs[blogIndex].readMore=updatedBlogs[blogIndex].readMore
        setFBlogs(sortedBlogs);
        setBlogs(sortedBlogs)
    }

    function retreieveContent(bID:number) {
      const blog=blogs.filter(b=>b.id===bID)
      if(blog[0].readMore) {
        return blog[0].content
      } else {
        return blog[0].content.slice(0,10).concat("...");
      }
    }

    return (<>

        <div className="search-feature">
            <input onChange={e=> setSearchTerm( () => e.target.value?.trim())}></input>
            <button onClick={handleSearch}>Search</button>
            <button onClick={()=> setFBlogs(()=> blogs)}>Clear Search</button>
        </div>

        {
            fBlogs.length ? (
                fBlogs.map(b => 
                    <div key = {b.id} className="blog">
                    <div className="author-info">
                        <p id="blog-title">{b.title}</p>
                        <p id="author-date">{formatDate(b.updated_at)}</p>
                    </div>
                    <div className="name-container">
                         <p id="author-name">{b.user.first_name} {b.user.last_name}</p>
                        
                    </div>
                    
                    <div id="content">
                        <p>{retreieveContent(b.id)}</p>
                        
                    </div>
                    <div className="reaction-buttons">
                        
                         <button id="readMore" onClick={()=>handleReadmore(b)}>{ b.readMore?"Collapse":"Read More"}</button> 
                    </div>
                    {/* <div className="reaction-buttons">
                    
                        <button id="thumbs-up">👍</button>
                        <button id="thumbs-down">👎</button>
                    </div> */}
                    <div className="blogInfo">
                    <p>viewed <span id="viewcount"> {b.view_count}</span> times</p>
                    
                    </div>
                </div>
            )) : <p id="search-msg">No Blogs Found</p>
        }

        </>)
}

function formatDate(dateString:string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}
