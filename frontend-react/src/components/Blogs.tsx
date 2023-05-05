import { useEffect, useState } from "react"
import { Blog } from "../models/blog";

import "../css/blog.css"

const testBlogs: Blog[] = (
    [{id: 1, title: "Title 1", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", date:"05/04/2023", img:"https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg"
},
{id: 2, title: "Title 2", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", date:"05/04/2023", img: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg"
},
{id: 3, title: "Title 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Ut tortor pretium viverra suspendisse. Non quam lacus suspendisse faucibus interdum. Elit at imperdiet dui accumsan sit. Ultrices dui sapien eget mi proin sed libero. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Phasellus egestas tellus rutrum tellus. Vel orci porta non pulvinar neque laoreet suspendisse. Convallis posuere morbi leo urna molestie at elementum eu.", date:"05/04/2023", img: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg"
}
]
)

export default function Blogs (){

    const [blogs, setBlogs] = useState<Blog[]>([{id: 0, title:"", body:"", date:"", img:""}]);
    const [author, setAuthor] = useState<string>("");

    useEffect(()=>{
        (async ()=>{
            // Await for all blogs here
            setBlogs(testBlogs)
        })();
    }, [])

    return (<>

        <div className="search-feature">
            <input></input>
            <button>Search</button>
        </div>

        {blogs.length === 0 ? (
                <p className="no-blogs">No Blogs to show</p>
        ) : 
        
        (blogs.map(b => 
        <div key = {b.id} className="blog">
            <div className="author-info">
                <p>Author Name</p>
                <p>{b.date}</p>
            </div>
            <div>
                <img src={b.img} alt={b.title}></img>
            </div>
            <div>
                <p>{b.title}</p>
                <p>{b.body}</p>
            </div>
            <div>
                <button>👍</button>
            </div>
        </div>
        ))}

        </>)
}