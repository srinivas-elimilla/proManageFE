import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = " http://localhost:3000";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
