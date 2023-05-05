import { appClient } from "../app-client"

export const authenticate = async (credentials: {userName: string, password: string}) => {
    return await appClient.post('/login', credentials);
}