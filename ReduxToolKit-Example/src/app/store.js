import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../feature/post/postSlice";
import userReducer from "../feature/users/userSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer
    },
});