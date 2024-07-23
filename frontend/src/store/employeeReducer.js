import { createAction, createReducer } from "@reduxjs/toolkit";
import { employeeList } from "../utils/employees";

const addLoggedState = createAction("ADD_LOGGED_STATE");
const employeeReducer = createReducer({ loggedState: "Regular", username: "", joinedTask:{} }, (builder) => {
	builder.addCase(addLoggedState, (state, action) => {
		state.loggedState = action.payload.role;
		state.username = action.payload.name;
	});
});

export { employeeReducer as default, addLoggedState };
