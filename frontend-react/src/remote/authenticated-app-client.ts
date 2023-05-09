import axios from "axios";
//ec2-34-229-146-172.compute-1.amazonaws.com
export const authAppClient = axios.create({
    baseURL: 'http://ec2-34-229-146-172.compute-1.amazonaws.com',
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
