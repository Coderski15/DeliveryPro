import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice.jsx";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});

export default store;