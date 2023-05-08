import axios from "axios";

export const authAppClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Accept': "application/json",
    }
});

authAppClient.interceptors.request.use(
    (request) => {
        if(request.headers){
            request.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
        }

        return request;
    }
)
