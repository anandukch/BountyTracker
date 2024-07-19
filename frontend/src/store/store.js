import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeBaseApi } from "../api/baseApi";

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        [employeeBaseApi.reducerPath]: employeeBaseApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeBaseApi.middleware),
});
setupListeners(store.dispatch);
export default store;
