import { apiWithTags } from "./baseApi";

const taskApi = apiWithTags.injectEndpoints({
	endpoints: (builder) => ({
		getTaskList: builder.query({
			query: () => "/tasks",
			providesTags: ["TASK_LIST"],
		}),
		getTaskById: builder.query({
			query: (id) => `/tasks/${id}`,
			providesTags: ["TASK"],
			invalidatesTags: ["COMMENTS"],
		}),
		createTask: builder.mutation({
			query: (data) => ({ url: "/tasks", method: "POST", body: data }),
			invalidatesTags: ["TASK", "TASK_LIST"],
		}),
		getCommentsByTaskId: builder.query({
			query: (id) => `/tasks/${id}/comments`,
			providesTags: ["COMMENTS", "REVIEW"],
		}),
		createComment: builder.mutation({
			query: (data) => {
				// console.log(data);
				return {
					url: `/tasks/${parseInt(data.taskId)}/comments`,
					method: "POST",
					body: data.formData,
				};
			},
			invalidatesTags: ["COMMENTS"],
		}),
		reviewCommentById: builder.mutation({
			query: ({ ...data }) => ({ url: `tasks/comments/${parseInt(data.id)}`, method: "PATCH", body: data }),
			invalidatesTags: ["REVIEW"],
		}),

		getCommentById: builder.query({
			query: (id) => `/tasks/comments/${id}`,
			providesTags: ["COMMENTS"],
		}),

		joinTask: builder.mutation({
			query: (id) => ({
				url: `/employees/tasks/${id}`,
				method: "POST",
			}),
			invalidatesTags: ["COMMENTS", "REVIEW", "TASK_LIST", "TASK"],
		}),

		completeTask: builder.mutation({
			query: ({ taskId, participantContributions }) => {
				// console.log(taskId, participantContributions);
				return {
					url: `tasks/complete/${parseInt(taskId)}`,
					method: "PATCH",
					body: { participantContributions },
				};
			},
			invalidatesTags: ["TASK", "TASK_LIST", "EMPLOYEE_LIST", "PROFILE"],
		}),

		getTaskContributions: builder.query({
			query: (id) => `/tasks/${id}/contributions`,
			responseHandler: (response) => response.blob(),
			providesTags: ["TASK"],
		}),

		downloadFile: builder.query({
			query: (id) => `/tasks/comments/${id}/file`,
		}),
	}),
});

export const {
	useGetTaskListQuery,
	useLazyGetTaskListQuery,
	useGetTaskByIdQuery,
	useLazyGetTaskByIdQuery,
	useCreateTaskMutation,
	useGetCommentsByTaskIdQuery,
	useCreateCommentMutation,
	useReviewCommentByIdMutation,
	useGetCommentByIdQuery,
	useJoinTaskMutation,
	useCompleteTaskMutation,
	useGetTaskContributionsQuery,
	useLazyDownloadFileQuery,
	useLazyGetCommentsByTaskIdQuery,
} = taskApi;
