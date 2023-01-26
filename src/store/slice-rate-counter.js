import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    used: 0,
    limit: 60
}

export const rateCounter = createSlice({
    name: 'rateCounter',
    initialState: initialState,
    reducers: {
        increment: state => { state.used += 1 },
        decrement: state => { state.used -= 1 },
        incrementByAmount: (state, action) => { state.used += action.payload },
        setLimit: (state, action) => { state.limit = action.payload }
    }
});

export const {
    increment, decrement, 
    incrementByAmount, setLimit
    } = rateCounter.actions;
    
export default rateCounter.reducer;
