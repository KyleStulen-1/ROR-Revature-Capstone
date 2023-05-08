import axios from "axios";

export const appClient = axios.create({
    baseURL: 'ec2-34-229-146-172.compute-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json'
    }
});