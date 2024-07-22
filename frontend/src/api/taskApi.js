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
			query: ({ ...data }) => ({ url: `/tasks/${parseInt(data.id)}/comments`, method: "POST", body: data }),
			invalidatesTags: ["COMMENTS"],
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
} = taskApi;
