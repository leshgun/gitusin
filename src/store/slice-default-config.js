import { createSlice } from '@reduxjs/toolkit';



function getLocalStorageUser() {
    return localStorage.getItem ("startup_user") || 'leshgun';
}

export const defaultConfigs = createSlice({
    name: "defaultConfigs",
    initialState: {
        error: "O-o-ops, something went wrong...",
        username: getLocalStorageUser(),
        user: "leshgun"
    },
    reducers: {
        setUsername: (state, action) => { state.username = action.payload },
        setUser2: (state, action) => { state.user = action.payload },
    }
})

export const { setUsername, setUser2 } = defaultConfigs.actions;
    
export default defaultConfigs.reducer;
