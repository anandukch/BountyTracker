import { apiWithTags } from "./baseApi";

export const employeeApi = apiWithTags.injectEndpoints({
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

			providesTags: ["PROFILE"],
		}),

		getProfile: builder.query({
			query: () => "/employees/profile",
			providesTags: ["PROFILE"],
		}),

		getEmployeeCurrentTasks: builder.query({
			query: () => "/employees/tasks",
			providesTags: ["PROFILE"],
		}),

		getEmployeeCreatedTasks: builder.query({
			query: () => "/tasks/created",
			providesTags: ["PROFILE"],
		}),

		login: builder.mutation({
			query: (data) => ({
				url: "/employees/login",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["EMPLOYEE_LIST", "PROFILE"],
		}),
		redeemReward: builder.mutation({
			query: ({ reward }) => ({
				url: "/employees/reward",
				method: "POST",
				body: { reward },
			}),
			invalidatesTags: ["REDEEM"],
		}),
		getRedeemRequests: builder.query({
			query: () => "/employees/reward",
			providesTags: ["REDEEM"],
		}),
		approveRedeemRequest: builder.mutation({
			query: ({ employeeId, requestId }) => ({
				url: `/employees/redeem`,
				method: "PATCH",
				body: { employeeId, requestId },
			}),
			invalidatesTags: ["PROFILE", "REDEEM"],
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
