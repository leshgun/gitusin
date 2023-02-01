import { createSlice } from '@reduxjs/toolkit';



function getLocalStorageRatelimit(state) {
    return localStorage.getItem("ratelimit_used") || state;
}

const initialState = {
    used: 0,
    limit: 60,
    help_text: "The number of available GET requests"
}

export const rateCounter = createSlice({
    name: 'rateCounter',
    initialState: initialState,
    reducers: {
        increment: state => { state.used += 1 },
        decrement: state => { state.used -= 1 },
        incrementByAmount: (state, action) => { state.used += action.payload },
        setLimit: (state, action) => { state.limit = action.payload },
        updateRateLimit: (state) => { 
            state.used = getLocalStorageRatelimit(state.used) 
        }
    }
});

export const {
    increment, decrement, 
    incrementByAmount, setLimit,
    updateRateLimit
    } = rateCounter.actions;
    
export default rateCounter.reducer;
