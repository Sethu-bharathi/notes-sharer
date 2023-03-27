import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userData")) || {};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isStudent: userData.data && "student" in userData.data,
    userData: userData && { ...userData.data },
  },
  reducers: {
    checkAgain: (state) => {
      const user = JSON.parse(localStorage.getItem("userData"));
      state.userData = user && { ...user.data };
      state.isStudent = userData.data && "student" in user.data;
      console.log(state);
    },
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;
