import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Action login déclenchée avec payload :", action.payload);
      state.isAuthenticated = true;
      state.userInfo = action.payload; // Les informations utilisateur sont stockées ici
    },
    logout: (state) => {
      console.log("Action logout déclenchée");
      state.isAuthenticated = false;
      state.userInfo = null; // Réinitialise les informations utilisateur
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;