import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectedImage: null,
  },

  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { selectImage, resetImage } = appSlice.actions;

export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;