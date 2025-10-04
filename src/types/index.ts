export interface Post {
    id: number
    title: string
    content: string
    thumbnail: string
    isFeatured: boolean
    tags: string[]
    authorId: number
    views: number
    author: {
        email: string
        name: string
        id: number
    }
    createdAt: string
}


export interface Project {
    id: number
    projectName: string
    content: string
    liveLink: string
    githubLink: string
    thumbnail: string
    createdAt: string
}