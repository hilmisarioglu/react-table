import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/slice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});
