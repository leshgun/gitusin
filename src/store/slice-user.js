import { createSlice } from '@reduxjs/toolkit';



function checkLocalStorage() {
    return localStorage.getItem("startup_user") || false;
}

const initialState = {
    startup: checkLocalStorage() || "leshgun",
    name: "",
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
