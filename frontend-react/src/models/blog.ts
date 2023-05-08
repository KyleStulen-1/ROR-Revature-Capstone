export type Blog = {
    id: number,
    title: string,
    content: string,
    view_count: number
}

export type BlogAuthor = {
    first_name: string,
    last_name:string,
    email: string,
    id: number,
    title: string,
    content: string,
    view_count: number,
    created_at: string,
    updated_at: string
}