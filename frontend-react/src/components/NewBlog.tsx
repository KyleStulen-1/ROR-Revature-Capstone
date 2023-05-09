import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import {useState} from "react";
import {authAppClient} from "../remote/authenticated-app-client";
import {User} from "../models/user";
import { useNavigate } from 'react-router-dom';
interface IUserCreateProps {
    currentUser: User | undefined
}
type Props ={
    onSubmit: (title:string, content:string) => void;
};

{/*   */}
const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '20px auto',
    padding: '16px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
});
const StyledTextField = styled(TextField)({
    marginBottom: '16px',
});
const StyledButton = styled(Button)({
    marginTop: '16px',
});

{/* Defined functional component - accepts a single prop called onSubmit and returns a component that renders a form for creating a new blog post */}
{/* Defined two state variables - that will use user input */}
{/* = ({ onSubmit }: Props) => */}
export default function NewBlog(props: IUserCreateProps) {
    const[title,setTitle] = useState<any>();
    const [content, setContent] = useState<any>();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBlog(title, content);
        navigate(`/myblogs`);
    }
    
    // Axios function to create a new blog post
    // topics is not implemented so its hardcoded as 1 
    async function createBlog(title: string, content: string) {
        try {
            const response = await authAppClient.post(`/user/${props.currentUser?.user_id}/blog/`, {
                title: title,
                content: content,
                user_id: props.currentUser?.user_id,
                topics_id: 1,
                view_count: 0
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <StyledBox>
            <StyledTextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <StyledTextField
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
                Create
            </StyledButton>
        </StyledBox>
    );

    };