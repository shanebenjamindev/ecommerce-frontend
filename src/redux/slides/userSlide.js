import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: {
            
        }
    },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions
export default userSlice.reducer