import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    error_message: "O-o-ops, something went wrong..."
}

export const defaults = createSlice({
    name: "defaults",
    initialState: initialState
})

export const { setUser } = defaults.actions;
    
export default defaults.reducer;
