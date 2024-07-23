import apiWithTag from "./baseApi";

const taskApi = apiWithTag.injectEndpoints({
	endpoints: (builder) => ({
		getTaskList: builder.query({
			query: () => "/tasks",
		}),
		getTaskById: builder.query({
			query: (id) => `/tasks/${id}`,
			providesTags: ["COMMENTS"],
		}),
		createTask: builder.mutation({
			query: (data) => ({ url: "/tasks", method: "POST", body: data }),
		}),
		getCommentsByTaskId: builder.query({
			query: (id) => `/tasks/${id}/comments`,
		}),
		createComment: builder.mutation({
			query: (data) => {
				console.log("create Comment");
				return {
					url: `/tasks/${parseInt("9")}/comments`,
					method: "POST",
					body: data.formData,
				};
			},
			invalidatesTags: ["COMMENTS"],
		}),
		reviewCommentById: builder.mutation({
			query: ({ ...data }) => ({ url: `tasks/comments/${parseInt(data.id)}`, method: "PATCH", body: data }),
		}),
		getCommentById: builder.query({
			query: (id) => `/tasks/comments/${id}`,
		}),

		upload: builder.mutation({
			query: ({ formData }) => ({
				url: `/file`,
				method: "POST",
				body: formData,
			}),
		}),
	}),
});

export const {
	useGetTaskListQuery,
	useGetTaskByIdQuery,
	useLazyGetTaskByIdQuery,
	useCreateTaskMutation,
	useGetCommentsByTaskIdQuery,
	useCreateCommentMutation,
	useUploadMutation,
	useReviewCommentByIdMutation,
	useGetCommentByIdQuery,
} = taskApi;
