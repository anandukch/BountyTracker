import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});

const apiWithEmployeeTag = baseApi.enhanceEndpoints({
	addTagTypes: ["EMPLOYEE_LIST", "EMPLOYEE"],
});

const apiWithTaskTags = baseApi.enhanceEndpoints({
	addTagTypes: ["COMMENTS", "REVIEW", "TASK", "TASK_LIST"],
});

// const apiWith

export { apiWithEmployeeTag, apiWithTaskTags };
