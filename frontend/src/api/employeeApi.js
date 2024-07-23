import apiWithTag from "./baseApi";

export const employeeApi = apiWithTag.injectEndpoints({
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
		}),

		getEmployeeCurrentTasks: builder.query({
			query: () => "/employees/tasks",
		}),

		getEmployeeCreatedTasks: builder.query({
			query: () => "/tasks/created",
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
} = employeeApi;
