import { useEffect, useState } from "react"
import { Blog, BlogAuthor } from "../models/blog";
import { authAppClient } from "../remote/authenticated-app-client";
import {useParams} from "react-router-dom";

export function BlogDetails(){
    const params = useParams().id;//
    return <>

           </>
}