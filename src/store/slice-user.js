import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    name: "leshgun",
    startup: "leshgun"
}

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setName: (state, action) => { state.name = action.payload },
        setStartupUser: (state, action) => { state.startup = action.payload }
    }
})

export const { setName, setStartupUser } = user.actions;
    
export default user.reducer;
