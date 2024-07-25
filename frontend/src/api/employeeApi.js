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

			providesTags: ["EMPLOYEE"],
		}),

		getProfile: builder.query({
			query: () => "/employees/profile",
			providesTags: ["EMPLOYEE"],
		}),

		getEmployeeCurrentTasks: builder.query({
			query: () => "/employees/tasks",
			providesTags: ["EMPLOYEE"],
		}),

		getEmployeeCreatedTasks: builder.query({
			query: () => "/tasks/created",
			providesTags: ["EMPLOYEE"],
		}),

		login: builder.mutation({
			query: (data) => ({
				url: "/employees/login",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["EMPLOYEE_LIST", "EMPLOYEE"],
		}),
		redeemReward: builder.mutation({
			query: () => ({
				url: "/employees/reward",
				method: "POST",
			}),
			invalidatesTags: ["REDEEM"],
		}),
		getRedeemRequests: builder.query({
			query: () => "/employees/reward",
			providesTags: ["REDEEM"],
		}),
		approveRedeemRequest: builder.mutation({
			query: ({ id, commentId }) => ({
				url: `/employees/redeem/${parseInt(id)}`,
				method: "PATCH",
				body: { commentId },
			}),
			invalidatesTags: ["EMPLOYEE", "REDEEM"],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useGetEmployeeListQuery,
	useAddEmployeeMutation,
	useGetEmployeeQuery,
	useLazyGetEmployeeCurrentTasksQuery,
	useLazyGetEmployeeCreatedTasksQuery,
	useGetEmployeeCreatedTasksQuery,
	useGetEmployeeCurrentTasksQuery,
	useLoginMutation,
	useRedeemRewardMutation,
	useGetRedeemRequestsQuery,
	useApproveRedeemRequestMutation,
} = employeeApi;
