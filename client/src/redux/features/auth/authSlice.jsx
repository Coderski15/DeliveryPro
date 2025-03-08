import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        _id: null,
        name: null,
        email: null,
        phone: null,
        address: null,
        role: null,
        isAdmin: null
    },
    loading: false,
    error: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user._id = action.payload._id; // Assuming payload contains _id
            state.user.name = action.payload.name; // Assuming payload contains username
            state.user.email = action.payload.email;
            state.user.phone = action.payload.phone;
            state.user.address = action.payload.address;
            state.user.role = action.payload.role;
            state.user.isAdmin = action.payload.isAdmin; // Assuming payload contains username
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            // Reset the user object to initial state on logout
            state.user = {
                _id: null,
                name: null,
                email: null,
                phone: null,
                address: null,
                role: null,
                isAdmin: null
            };
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

// Export actions
export const { login, logout, setLoading, setError } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth; // Ensure this matches the key in the store
export const selectUser = (state) => state.auth.user;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUserIsAdmin = (state) => state.auth.user.isAdmin;
export const selectUserRole = (state) => state.auth.user.role;
export const selectIsLoading = (state) => state.auth.user.loading;

export default authSlice.reducer;