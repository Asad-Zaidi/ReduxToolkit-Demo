import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeede' | 'failed'
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POST_URL);
        return [...response.data];
    }
    catch (error) {
        return error.message;
    };
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POST_URL, initialPost);
        return response.data;
    }
    catch (error) {
        return error.message;
    };
});

/*
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost);
        return response.data;
    }
    catch (error) {
        return error.message;
    };
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POST_URL}/${id}`);
        if (response?.status === 200) return initialPost;
        return Promise.reject();
    }
    catch (error) {
        return error.message;
    };
});
*/

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                });

                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                };
                console.log(action.payload);
                state.posts.push(action.payload);
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { addPost, reactionAdded } = postSlice.actions;
export default postSlice.reducer;