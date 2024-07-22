import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeBaseApi } from "../api/baseApi";
import toastReducer from "./toastReducer";

const store = configureStore({
	reducer: {
		employee: employeeReducer,
		toasts: toastReducer,

		[employeeBaseApi.reducerPath]: employeeBaseApi.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeBaseApi.middleware),
});
setupListeners(store.dispatch);
export default store;
