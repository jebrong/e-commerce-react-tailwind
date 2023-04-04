import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  openNav: false,
  slides: [
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1860&q=80",
    "https://images.unsplash.com/photo-1535799695145-f3849086ee3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80",
  ],
  currentSlideIndex: 0,
  home: true,
};
const utilsSlice = createSlice({
  name: "utils",

  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("dark", state.darkMode);
    },
    seeDarkMode: (state) => {
      let status = localStorage.getItem("dark");
      if (status === "true") {
        state.darkMode = true;
      } else if (status === "false") {
        state.darkMode = false;
      }
    },
    toggleNav: (state) => {
      state.openNav = !state.openNav;
    },
    nextSlide: (state) => {
      if (state.currentSlideIndex < state.slides.length - 1) {
        state.currentSlideIndex = state.currentSlideIndex + 1;
      } else {
        state.currentSlideIndex = 0;
      }
    },
    prevSlide: (state) => {
      if (state.currentSlideIndex === 0) {
        state.currentSlideIndex = state.slides.length - 1;
      } else {
        state.currentSlideIndex = state.currentSlideIndex - 1;
      }
    },
    insideHome: (state) => {
      state.home = true;
    },
    outsideHome: (state) => {
      state.home = false;
    },
  },
});

export const utilsReducer = utilsSlice.reducer;

export const {
  toggleDarkMode,
  seeDarkMode,
  toggleNav,
  nextSlide,
  prevSlide,
  insideHome,
  outsideHome,
} = utilsSlice.actions;
