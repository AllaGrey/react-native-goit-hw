import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    nickname: null,
    loginStatus: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,

    reducers: {
        updateUserStatus: (state, {payload}) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
        }),
        
        updateLoginStatus: (state, { payload }) => ({
            ...state,
            loginStatus: payload.loginStatus,
        }),
        resetUserStatus: () => state
    }
})

