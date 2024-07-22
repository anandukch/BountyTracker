import { createAction, createReducer } from "@reduxjs/toolkit";

const addToastMessage = createAction("ADD_TOAST_MESSAGE");
const clearToastMessage = createAction("CLEAR_TOAST_MESSAGE");

const toastReducer = createReducer(
	{
		toastMessages: [],
	},
	(builder) => {
		builder.addCase(addToastMessage, (state, action) => {
			state.toastMessages.push(action.payload);
		});
		builder.addCase(clearToastMessage, (state, action) => {
			state.toastMessages = state.toastMessages.filter((toastMessage) => toastMessage.id != action.payload);
		});
	},
);

export { toastReducer as default, addToastMessage, clearToastMessage };
