import { createSlice } from "@reduxjs/toolkit"

const userSilce = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFalied: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        }
    }
})


export const { getUsersStart, getUsersSuccess, getUsersFalied } = userSilce.actions;
export default userSilce.reducer;