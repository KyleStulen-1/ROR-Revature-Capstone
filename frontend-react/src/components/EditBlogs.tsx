import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function EditBlogs() {
    const [text, setText] = useState<string>("");
    const { blogData: string } = useParams();
    const thiscontent = [{blog_id:1, title: "title1", content: "content1", user_id:1}, {id:2, title: "title2", content: "content2"}]
    //const pageData = parseInt(blogData, 10);

    return (
    <div>
        {/* <h1> { pageData } </h1> */}
        <input
            type="text"
            value = {"This is the value"}
            onChange = { (event) => setText( event.target.value ) }
        />
    </div>
  )
}
