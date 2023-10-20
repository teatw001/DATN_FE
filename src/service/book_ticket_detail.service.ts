import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookTicketDetail } from "../interface/model";

const bookTicketDetailsAPI = createApi({
  reducerPath: "bookTicketDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["bookTicketDetail"],
  endpoints: (builder) => ({
    fetchBookTicketDetail: builder.query<IBookTicketDetail[], void>({
      query: () => "/Book_ticket_detail/",
      providesTags: ["bookTicketDetail"],
    }),
    getBookTicketDetailById: builder.query<IBookTicketDetail, number | string>({
      query: (id) => `/Book_ticket_detail/${id}`,
      providesTags: ["bookTicketDetail"],
    }),
    removeBookTicketDetail: builder.mutation({
      query: (id) => ({
        url: "/Book_ticket_detail/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["bookTicketDetail"],
    }),
    addBookTicketDetail: builder.mutation({
      query: (bookTicketDetail: IBookTicketDetail) => ({
        url: "/Book_ticket_detail/",
        method: "POST",
        body: bookTicketDetail,
      }),
      invalidatesTags: ["bookTicketDetail"],
    }),
    updateBookTicketDetail: builder.mutation({
      query: (bookTicketDetail: IBookTicketDetail) => ({
        url: `/Book_ticket_detail/${bookTicketDetail.id}`,
        method: "PATCH",
        body: bookTicketDetail,
      }),
      invalidatesTags: ["bookTicketDetail"],
    }),
  }),
});
export const {
    useFetchBookTicketDetailQuery,
    useGetBookTicketDetailByIdQuery,
    useAddBookTicketDetailMutation,
    useUpdateBookTicketDetailMutation,
    useRemoveBookTicketDetailMutation
} = bookTicketDetailsAPI;
export default bookTicketDetailsAPI;
