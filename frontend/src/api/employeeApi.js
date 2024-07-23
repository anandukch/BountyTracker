// import apiWithTag from "./baseApi";

import { apiWithEmployeeTag } from "./baseApi";

export const employeeApi = apiWithEmployeeTag.injectEndpoints({
	endpoints: (builder) => ({
		getEmployeeList: builder.query({
			query: () => "/employees",
			providesTags: ["EMPLOYEE_LIST"],
		}),
		addEmployee: builder.mutation({
			query: (data) => ({
				url: "/employees",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["EMPLOYEE_LIST"],
		}),

		getEmployee: builder.query({
			query: (id) => `/employees/${id}`,
			// invalidatesTags: ["EMPLOYEE_LIST"],
			providesTags: ["EMPLOYEE"],
		}),

		getProfile: builder.query({
			query: () => "/employees/profile",
			// providesTags: ["EMPLOYEE"],
			invalidatesTags: ["EMPLOYEE"],
		}),

		getEmployeeCurrentTasks: builder.query({
			query: () => "/employees/tasks",
		}),

		getEmployeeCreatedTasks: builder.query({
			query: () => "/tasks/created",
		}),

		login: builder.mutation({
			query: (data) => ({
				url: "/employees/login",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["EMPLOYEE_LIST", "EMPLOYEE"],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useGetEmployeeListQuery,
	useAddEmployeeMutation,
	useGetEmployeeQuery,
	useGetEmployeeCurrentTasksQuery,
	useGetEmployeeCreatedTasksQuery,
	useLoginMutation,
} = employeeApi;
