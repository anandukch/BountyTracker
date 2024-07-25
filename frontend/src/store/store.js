import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "../api/baseApi";
import toastReducer from "./toastReducer";

const store = configureStore({
	reducer: {
		employee: employeeReducer,
		toasts: toastReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch);
export default store;
