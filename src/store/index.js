import { configureStore } from "@reduxjs/toolkit"
import defaults from "./slice-defaults";
import user from "./slice-user";
import rateCounter from "./slice-rate-counter";



export default configureStore({
    reducer: {
        defaults: defaults,
        user: user,
        rateCounter: rateCounter
    }
});
