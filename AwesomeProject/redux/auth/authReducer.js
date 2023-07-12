import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        nickname: null,
        isLogIn: false,
    },

    reducers: {
        updateUserStatus: (state, {payload}) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
        }),

    }
})

console.log(authSlice.reducer);