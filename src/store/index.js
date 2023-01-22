import { configureStore } from "@reduxjs/toolkit"
import rateCounterReducer from "./slice-rate-counter";
import defaultConfig from "./slice-default-config";



export default configureStore({
    reducer: {
        defaultConfig: defaultConfig,
        rateCounter: rateCounterReducer
    }
});
