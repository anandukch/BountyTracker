import { createAction, createReducer } from "@reduxjs/toolkit";
const addLoggedState = createAction("ADD_LOGGED_STATE");
const addJoinedStatus = createAction("ADD_JOINED_STATUS");
const employeeReducer = createReducer({ role: "Regular", username: "", id: "", joinedTask: {} }, (builder) => {
	builder.addCase(addLoggedState, (state, action) => {
		state.role = action.payload.role;
		state.username = action.payload.username;
		state.id = action.payload.id;
	});
	builder.addCase(addJoinedStatus, (state, action) => {
		state.joinedTask = action.payload;
	});
});

export { employeeReducer as default, addLoggedState, addJoinedStatus };
