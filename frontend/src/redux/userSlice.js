import { createSlice } from "@reduxjs/toolkit"

const userSilce = createSlice({
    name: "user",
    initialState: {
        avatars: {
            data: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getAvatarStart: (state) => {
            state.avatars.isFetching = true;
            state.avatars.error = false;
        },
        getAvatarSuccess: (state, action) => {
            state.avatars.isFetching = false;
            state.avatars.data = action.payload;
            state.avatars.error = false;
        },
        getAvatarFailed: (state) => {
            state.avatars.isFetching = false;
            state.avatars.error = true;
        }
    }
})


export const {  getUsersStart, getUsersSuccess, getUsersFalied, 
                getAvatarStart, getAvatarSuccess, getAvatarFailed } = userSilce.actions;
export default userSilce.reducer;