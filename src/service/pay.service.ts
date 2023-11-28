import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const payAPI = createApi({
  reducerPath: "pays",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers, { getState }) => {
      // Add your authorization header here
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["pay"],
  endpoints: (builder) => ({
    getPaybyTranfer: builder.query({
      query: (money) => `/Payment?&amount=${money}`,
      providesTags: ["pay"],
    }),
    SendEmail: builder.mutation({
      query: () => ({
        url: "/send-book-ticket-details-email/",
        method: "POST",
      }),
      invalidatesTags: ["pay"],
    }),
    // PaymentMomo: builder.query({
    //   query: (money) => `/momo_payment?&amount=${money}`,
    //   providesTags: ["pay"],
    // }),
    PaymentMomo: builder.mutation({
      query: (amount :any) => ({
        url: "/momo_payment/",
        method: "POST",
        body: amount,
      }),
      invalidatesTags: ["pay"],
    }),
  }),
});

export const {
  useGetPaybyTranferQuery,
  useSendEmailMutation,
  usePaymentMomoMutation
} = payAPI;
export default payAPI;
