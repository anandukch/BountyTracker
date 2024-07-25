import { createAction, createReducer } from "@reduxjs/toolkit";
const addLoggedState = createAction("ADD_LOGGED_STATE");
const addJoinedStatus = createAction("ADD_JOINED_STATUS");
const employeeReducer = createReducer({ employee:{} , joinedTask: {} }, (builder) => {
	
	builder.addCase(addLoggedState, (state, action) => {
		state.employee = action.payload;
	});
	builder.addCase(addJoinedStatus, (state, action) => {
		state.joinedTask = action.payload;
	});
});

export { employeeReducer as default, addLoggedState, addJoinedStatus };
