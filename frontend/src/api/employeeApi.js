import apiWithTag from "./baseApi";

export const employeeApi = apiWithTag.injectEndpoints({
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
            // invalidatesTags: ["EMPLOYEE_LIST"],
            providesTags: ["EMPLOYEE"],
        }),

        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["EMPLOYEE_LIST"],
        }),

        updateEmployee: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/employees/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["EMPLOYEE_LIST", "EMPLOYEE"],
        }),

        getProfile: builder.query({
            query: () => "/employees/profile",
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/employees/reset-password",
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetEmployeeListQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useGetEmployeeQuery,
    useDeleteEmployeeMutation,
    useResetPasswordMutation
} = employeeApi;
