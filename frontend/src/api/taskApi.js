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
			query: (data) => ({ url: "/tasks", method: "POST", body: data }),
		}),
        // getCommentsByTaskId:builder.query({
        //     query:(id)=> `/tasks/${id}/comments`,
        // })
	}),
});

export const { useGetTaskListQuery, useGetTaskByIdQuery, useCreateTaskMutation ,useGetCommentsByTaskIdQuery} = taskApi;
