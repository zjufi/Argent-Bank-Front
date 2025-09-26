import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Login ---
export const loginAsync = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login`,
                {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || "Login failed");
            }

            // Selon ton YAML : LoginResponse = { token }
            return data.body.token;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Fetch User Profile ---
export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/profile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || "Fetch profile failed");
            }

            // Selon ton YAML : UserProfile = { id, firstName, lastName, email }
            return data.body;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    token: null,
    userProfile: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.userProfile = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload; // Le token JWT
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });

        // Fetch User Profile
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload; // Les infos utilisateur
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Fetch profile failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;   