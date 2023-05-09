import axios from "axios";
//http://ec2-34-229-146-172.compute-1.amazonaws.com
export const appClient = axios.create({
    baseURL: 'http://ec2-34-229-146-172.compute-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json'
    }
});