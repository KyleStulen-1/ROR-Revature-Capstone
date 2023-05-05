import { useState, SyntheticEvent } from "react";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface IUserCreateProps {
    currentUser: User | undefined
}

const theme = createTheme();

export default function NewUser(props: IUserCreateProps){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let updateEmail = (e:SyntheticEvent) => {
        setEmail((e.target as HTMLInputElement).value)
    }

    let updatePassword = (e:SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value)
    }

    let updateFirstName = (e:SyntheticEvent) => {
        setFirstName((e.target as HTMLInputElement).value)
    }

    let updateLastName = (e:SyntheticEvent) => {
        setLastName((e.target as HTMLInputElement).value)
    }

    let submitUser = () => {
        console.log("Registered")
    }

    return (
        props.currentUser && redirect ? <Link to='/newuser' /> :
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{  marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',}}>
                        <Typography component={"h1"} variant="h5">
                            Register
                        </Typography>

                    </Box>
                    <Box sx={{mt: 1}}>
                        <input type="text" name="Email" id="Email" onChange={updateEmail} placeholder="Email"/>
                        <br />
                        <input type="password" name="Password" id="Password" onChange={updatePassword} placeholder="Password"/>
                        <br />
                        <input type="text" name="First name" id="firstName" onChange={updateFirstName} placeholder="First name"/>
                        <br />
                        <input type="text" name="Last name" id="lastName" onChange={updateLastName} placeholder="Last name"/>
                        <br />
                        <Button onClick={submitUser} type="submit" fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                            Register
                        </Button>
                        <p>{errorMessage}</p>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
    )
}