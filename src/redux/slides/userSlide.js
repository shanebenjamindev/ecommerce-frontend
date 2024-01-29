import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token } = action.payload;
            console.log(name, email, access_token);
            state.name = name || email;
            state.email = email;
            state.access_token = access_token;
        }
    },
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer