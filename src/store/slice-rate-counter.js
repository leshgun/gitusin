import { createSlice } from '@reduxjs/toolkit';

import DocService from '../API/DocService';



function getUsedRatelimit(force = false) {
    return parseInt(DocService.get_ratelimit(force).used);
}


export const rateCounterSlice = createSlice({
    name: 'rateCounter',
    initialState: {
        used: 0,
        limit: 60
    },
    reducers: {
        increment: state => { state.used += 1 },
        decrement: state => { state.used -= 1 },
        incrementByAmount: (state, action) => { state.used += action.payload },
        updateRatelimit: (state, action) => {
            state.used = getUsedRatelimit(action.payload) || state.used;
        }
    }
});


export const { increment, decrement, incrementByAmount, updateRatelimit } = 
    rateCounterSlice.actions;
    
export default rateCounterSlice.reducer;
