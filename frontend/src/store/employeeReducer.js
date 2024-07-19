import { createAction, createReducer } from "@reduxjs/toolkit";
import { employeeList } from "../utils/employees";

const addEmployee = createAction("ADD_EMPLOYEE");
const editEmployee = createAction("EDIT_EMPLOYEE");
const addFilter = createAction("ADD_FILTER");
const deleteEmployee = createAction("DELETE_EMPLOYEE");
const employeeReducer = createReducer({ employees: [...employeeList], filterBy: "all" }, (builder) => {
    builder.addCase(addEmployee, (state, action) => {
        state.employees.push(action.payload);
    });

    builder.addCase(editEmployee, (state, action) => {
        // const employees = state.employees;
        // const idx = employees.findIndex((employee) => employee.id === action.payload.id);
        // employees[idx] = action.payload;
        state.employees = state.employees.map((employee) => (employee.id === action.payload.id ? action.payload : employee));
    });

    builder.addCase(addFilter, (state, action) => {
        state.filterBy = action.payload;
    });

    builder.addCase(deleteEmployee, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
    });
});

export { employeeReducer as default, addEmployee, editEmployee, addFilter,deleteEmployee };
