import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return [...response.data];
    }
    catch (error) {
        return error.message;
    };
});

// const initialState = [
//     { id: '0', name: 'Dude Lebowski' },
//     { id: '1', name: 'Neil Young' },
//     { id: '2', name: 'Dave Gray' }
// ]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // addUser: {
        // reducer(state, action) {
        //     state.push(action.payload)
        // },
        // prepare(name, username) {
        //     return {
        //         payload: {
        //             id: nanoid(),
        //             name,
        //             username
        //         }
        //     }
        // }
        // }
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload;
            })
            // .addCase(fetchUsers.pending, (state, action) => {
            //     state.status = 'loading';
            // })
            // .addCase(fetchUsers.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.users = state.users.concat(action.payload);
            // })
            // .addCase(fetchUsers.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.error.message;
            // });
    },
});

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer