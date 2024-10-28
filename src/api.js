import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils/constants";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().auth.token || localStorage.getItem("token");

      if (token && endpoint !== "registerUser" && endpoint !== "loginUser") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/auth/get`,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/auth/update",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["tasks"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/auth/all`,
      }),
    }),
    createTask: builder.mutation({
      query: (payload) => ({
        url: "/task/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["tasks"],
    }),
    getTasks: builder.query({
      query: (query) => ({
        url: `/task/all?filter=${query}`,
      }),
      providesTags: ["tasks"],
    }),
    getTask: builder.query({
      query: (query) => ({
        url: `/task/${query}`,
      }),
      invalidatesTags: ["tasks"],
    }),
    updateTask: builder.mutation({
      query: (payload) => ({
        url: `/task/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation({
      query: (payload) => ({
        url: `/task/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
    getAnalytics: builder.query({
      query: () => ({
        url: `/task/analytics`,
      }),
      providesTags: ["tasks"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAnalyticsQuery,
  useGetTaskQuery,
} = api;
