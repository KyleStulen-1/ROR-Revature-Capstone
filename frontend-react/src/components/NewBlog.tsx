import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import {useState} from "react";


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
export default function NewBlog() {
    const[title,setTitle] = useState<any>();
    const [content, setContent] = useState<any>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //onSubmit(title, content);
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





