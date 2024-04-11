import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/slice";

const localstorageMiddleware = (store) => (next) => (action) => {
  next(action);
  window.localStorage.setItem("ReduxState_", JSON.stringify(store.getState()));
};

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
  // Middleware'leri doğru bir şekilde ekleyin
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localstorageMiddleware),
});
