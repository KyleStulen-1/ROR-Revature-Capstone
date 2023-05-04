import { SyntheticEvent, useState } from "react";

export default function Login(props: ILoginProps){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }
    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }
    
    let submitLogin = async (e: SyntheticEvent) => {
        setErrorMessage('');
        if (username && password && username.length > 3 && username.length < 17 && password.length > 7 && password.length < 21) {
            console.log("success");
            try {
                let response = await authenticate({username, password});

                if (response.status === 201) {
                    props.setCurrentUser(response.data);
                    sessionStorage.setItem('token', response.data.token);
                    setRedirect(true);
                } else {
                    setErrorMessage('Username and/or password incorrect. Please try again.');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setErrorMessage("Usernames must be between 4 and 16 characters. Passwords must be between 8 and 20 characters.")
        }
    }
    
    return (
        <h1>Login</h1>
    )
}