import apiWithTag from "./baseApi";

const taskApi = apiWithTag.injectEndpoints({
	endpoints: (builder) => ({
		getTaskList: builder.query({
			query: () => "/tasks",
		}),
		getTaskById: builder.query({
			query: (id) => `/tasks/${id}`,
		}),
		createTask: builder.mutation({
			query: (data) => "/tasks",
			method: "POST",
			body: data,
		}),
	}),
});

export const { useGetTaskListQuery, useGetTaskByIdQuery,useCreateTaskMutation } = taskApi;
