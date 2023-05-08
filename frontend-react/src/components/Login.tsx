import { SyntheticEvent, useState } from "react";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import { authenticate } from "../remote/services/session-service"; 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {styled} from "@mui/system";
import TextField from "@mui/material/TextField";
import {AxiosError} from "axios";

interface ILoginProps{
    currentUser: User | undefined;
    setCurrentUser: (newUser: User) => void;
}

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
    marginTop: '16px',
    marginBottom: '16px',
});
const StyledButton = styled(Button)({
    marginTop: '16px',
});

export default function Login(props: ILoginProps){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    let submitLogin = async (e: SyntheticEvent) => {
        setErrorMessage('');
        if (password) {
            try {
                let response = await authenticate({email, password});

                if (response.status === 201) {
                    props.setCurrentUser(response.data);
                    sessionStorage.setItem('token', response.data.token);
                    setRedirect(true);
                }
            } catch (err : any) {
                if (err.response.status === 401) {
                    setErrorMessage('Email and/or password incorrect.');
                } else {
                    console.log("Some other error")
                    console.log(err)
                }
            }
        } else {
            setErrorMessage("Must provide a password.")
        }
    }
    
    return (
        props.currentUser && redirect ?
        <Link to='/blogs' />
        :
        <StyledBox>
            <Typography component="h1" variant="h5" align="center">
                Sign In
            </Typography>
            <StyledTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton variant="contained" color="primary" onClick={submitLogin}>
                Login
            </StyledButton>
            <Typography variant="body1" color="error">
                {errorMessage}
            </Typography>
        </StyledBox>
    )
}