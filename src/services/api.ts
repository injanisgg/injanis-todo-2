import axios from 'axios';
import type { Comment, Post } from "../types";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000
});

async function fetchApi<T>(endpoint: string): Promise<T> {
    try {
        const response = await api.get<T>(endpoint);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `API Error: ${error.response?.status} - ${error.message}`
            )
        }
        throw error;
    }
}

export const postsApi = {
    getAllPosts: async (): Promise<Post[]> => {
        return fetchApi<Post[]>('/posts');
    },

    getPostById: async (id: number): Promise<Post> => {
        return fetchApi<Post>(`/posts/${id}`)
    },

    getCommentsByPostId: async (postId: number): Promise<Comment[]> => {
        return fetchApi<Comment[]>(`/comments?postId=${postId}`);
    }
}