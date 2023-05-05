import { useEffect, useState } from "react"
import { Blog, BlogAuthor } from "../models/blog";

import "../css/blog.css"

const testBlogs: BlogAuthor[] = (
    [{id: 1, title: "Intro to React", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", created_at:"05/14/2023", updated_at:"05/14/2023", view_count:10, first_name:"Jane", last_name:"Doe", email:"test1@email.com"
},
{id: 2, title: "Error Handling in Ruby", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", created_at:"05/05/2023", updated_at:"05/06/2023", view_count:10, first_name:"Billy", last_name:"Smith", email:"test2@email.com"
},
{id: 3, title: "What is CI/CD?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", created_at:"05/20/2023", updated_at:"05/20/2023", view_count:10, first_name:"Marcus", last_name:"Smith", email:"test3@email.com"
},
{id: 4, title: "AWS EC2: What is it? How to set it up.", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", created_at:"04/06/2023", updated_at:"04/06/2023", view_count:10, first_name:"James", last_name:"Smith", email:"test3@email.com"
}
]
)

export default function Blogs (){

    const [blogs, setBlogs] = useState<BlogAuthor[]>([{id: 0, title:"", content:"", view_count:0, created_at:"",updated_at:"", first_name:"", last_name:"", email:""}]);

    // may need a diff useState for the filtered blogs
    const [fBlogs, setFBlogs] = useState<BlogAuthor[]>([{id: 0, title:"", content:"", view_count:0, created_at:"",updated_at:"", first_name:"", last_name:"", email:""}]);
    

    const [author, setAuthor] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(()=>{
        (async ()=>{
            // Await for all blogs here

            // Sort blogs by created/updated dates

            const sortedBlogs = testBlogs.sort( (b1,b2) => 
                Date.parse(b2.updated_at) - Date.parse(b1.updated_at)
                // if(b1.updated_at === ""){
                //     const result = Date.parse(b1.created_at) - Date.parse(b2.created_at)
                //     return result;
                // }
            )

            setBlogs(sortedBlogs)
            setFBlogs(testBlogs);
        })();
    }, [])

    function handleSearch(){
        if(searchTerm){

            const filteredBlogs = blogs.filter(b =>
                `${b.first_name} ${b.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(filteredBlogs)
            setFBlogs( () => filteredBlogs );    
        } else {
            setFBlogs(() => []);
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
                        <p id="author-date">{b.created_at}</p>
                    </div>
                    <div className="name-container">
                        <p id="author-name">{b.first_name} {b.last_name}</p>
                    </div>
                    
                    <div id="content">
                        <p id="blog-content">{b.content}</p>
                    </div>
                    <div className="reaction-buttons">
                        <button id="thumbs-up">👍</button>
                        <button id="thumbs-down">👎</button>
                    </div>
                </div>
            )) : <p id="search-msg">No Blogs Found</p>
        }

        <div id="footer"> </div>

        </>)
}

