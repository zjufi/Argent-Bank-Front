import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";

// Récupérer le token depuis localStorage au démarrage
const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            console.log("📌 Tentative de login avec :", email);

            const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
            console.log("✅ Réponse login :", response.data);

            const token = response.data.token || response.data.body?.token; // token selon API
            if (!token) throw new Error("Token non reçu");

            // Stocker token
            localStorage.setItem("token", token);

            return token;
        } catch (error) {
            console.error("❌ Erreur login :", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur login");
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            console.log("📌 fetchUserProfile déclenché - token :", state.auth.token);

            const response = await axios.get(`${API_BASE_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${state.auth.token}` },
            });

            console.log("✅ Réponse fetchUserProfile :", response.data);

            // Stocker le user dans localStorage pour Header
            const user = response.data.body;
            localStorage.setItem("user", JSON.stringify(user));

            return user;
        } catch (error) {
            console.error("❌ Erreur fetchUserProfile :", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Impossible de récupérer le profil");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        user: storedUser ? JSON.parse(storedUser) : null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
