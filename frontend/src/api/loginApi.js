import apiWithTag from "./baseApi";

const loginApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/employees/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
