export type Blog = {
    id: number,
    title: string,
    content: string,
    view_count: number
}

export type BlogAuthor = {
    user:{first_name:string,last_name:string},
    user_id: number,
    id: number,
    title: string,
    content: string,
    view_count: number,
    created_at: string,
    updated_at: string
    readMore: boolean
}