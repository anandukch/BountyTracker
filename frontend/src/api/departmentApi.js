import apiWithTag from "./baseApi";

const departmentApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getDepartmentList: builder.query({
            query: () => "/departments",
        }),
    }),
});

export const { useGetDepartmentListQuery } = departmentApi;
