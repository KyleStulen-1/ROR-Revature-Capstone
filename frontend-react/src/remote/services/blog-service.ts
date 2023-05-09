import { authAppClient } from "../authenticated-app-client"

export async function updateViewCount(user_id: number, blog_id: number) {
    try {
        return await authAppClient.put(`/user/${user_id}/blog/${blog_id}/viewcount`);
    } catch (error) {
        throw new Error("ERROR IN VIEWCOUNT");
    }
}