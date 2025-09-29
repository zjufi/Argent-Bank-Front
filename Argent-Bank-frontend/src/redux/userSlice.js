import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour mettre à jour le profil sur le backend
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // si tu utilises JWT
      const response = await axios.put(
        "http://localhost:3001/user/profile", // ton endpoint backend
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // les nouvelles infos user du backend
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // met à jour le nom avec la réponse backend
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
