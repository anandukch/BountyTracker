import { createAction, createReducer } from "@reduxjs/toolkit";

const addError = createAction("ADD_ERROR");
const clearError = createAction("CLEAR_ERROR");

const toastReducer = createReducer(
    {
        errors: [],
    },
    (builder) => {
        builder.addCase(addError, (state, action) => {
            state.errors.push(action.payload);
        });
        builder.addCase(clearError, (state, action) => {
            state.errors = state.errors.filter(
                (error) => error.id != action.payload
            );
        });
    }
);

export { toastReducer as default, addError, clearError };
