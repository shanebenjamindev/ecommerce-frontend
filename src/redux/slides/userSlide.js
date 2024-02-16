import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, phone, password } = action.payload;
            console.log(password);
            state.name = name || email;
            state.email = email;
            state.phone = phone;
            state.pasword = password;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.access_token = "";
        }
    },
})

export const { updateUser, resetUser } = userSlice.actions
export default userSlice.reducer