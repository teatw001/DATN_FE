import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChairs } from "../interface/model";

const bookingSeatAPI = createApi({
  reducerPath: "bkseats",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  tagTypes: ["chairs"],
  endpoints: (builder) => ({
    fetchChairs: builder.query<IChairs[], void>({
      query: () => "/Chairs/",
      providesTags: ["chairs"],
    }),

    addChairs: builder.mutation({
      query: (chair: IChairs) => ({
        url: "/Chairs/",
        method: "POST",
        body: chair,
      }),
      invalidatesTags: ["chairs"],
    }),
    saveChairs: builder.mutation<IChairs, IChairs>({
      query: (chair) => {
        const newChair: IChairs = { ...chair, id: generateUniqueId() };
        return newChair;
      },
    }),
  }),
});
export const { useAddChairsMutation, useFetchChairsQuery, useSaveChairsMutation } = bookingSeatAPI;
export default bookingSeatAPI;
function generateUniqueId(): string {
  return Date.now().toString();
}