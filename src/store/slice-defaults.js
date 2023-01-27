import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    error_message: "O-o-ops, something went wrong...",
    theme: "light"
}

export const defaults = createSlice({
    name: "defaults",
    initialState: initialState,
    reducers: {
        toggleTheme: state => {
            state.theme = state.theme === "light" ? "dark" : "light"
        },
        setTheme: (state, action) => { state.theme = action.payload }
    }
})

export const { toggleTheme, setTheme } = defaults.actions;
    
export default defaults.reducer;
