import { useState, SyntheticEvent } from "react";
import { User } from "../models/user";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import { authAppClient } from "../remote/authenticated-app-client";
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';

interface IUserCreateProps {
    currentUser: User | undefined
}

const theme = createTheme();

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

export default function NewUser(props: IUserCreateProps){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const user = {
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName
    }

    async function submitUser() {
        setErrorMessage('')
        if (email && password && firstName && lastName) {
            try {
                let response = await authAppClient.post('/user', user)
                console.log(response)

                if (response.status == 201) {
                    console.log("User created")
                    navigate('/blogs')
                }
            } catch (err: any) {
                console.log(err)
                setErrorMessage('Something went wrong.')
            }
        } else {
            setErrorMessage('All fields must be filled out.')
        }
    }

    return (
        props.currentUser && redirect ? <Link to='/blogs' /> :
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <StyledBox sx={{  marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',}}>
                        <Typography component={"h1"} variant="h5">
                            Register
                        </Typography>

                    </StyledBox>
                    <StyledBox sx={{mt: 1}}>
                        <StyledTextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <StyledTextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value) }/>
                        <StyledTextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value) } />
                        <StyledTextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <StyledButton onClick={submitUser} type="submit" fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                            Register
                        </StyledButton>
                        <p>{errorMessage}</p>
                    </StyledBox>
                </Container>
            </ThemeProvider>

        </div>
    )
}