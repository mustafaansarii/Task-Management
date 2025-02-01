import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, BASE_URL } from '../api/api';

// Async Thunks
export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await api.post(`/auth/signin`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Login success", data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await api.post(`/auth/signup`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Register success", data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Register failed");
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        localStorage.clear();
        console.log("Logout success");
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Logout failed");
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt);
    try {
        const { data } = await api.get(`/api/users/profile`);
        console.log("User profile success", data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Failed to fetch user profile");
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
    setAuthHeader(jwt);
    try {
        const { data } = await api.get(`/api/users/list`);
        console.log("User list success", data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Failed to fetch user list");
    }
});

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: null,
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.jwt = action.payload.jwt;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.user = action.payload.user;
                state.jwt = action.payload.jwt;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loggedIn = false;
                state.user = null;
                state.jwt = null;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
