import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  name: string;
}

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints: (builder) => ({
    // Is this a query or a mutation?
    // - Using `builder.query` specifies a query
    // This name specifies the name of the hook: `albumsApi.useFetchAlbumsQuery()`
    // - if we named it getAlbums, name of hook: `albumsApi.useGetAlbumsQuery()`
    //                       ResultType QueryArg
    //                          v        v
    fetchAlbums: builder.query<User[], User>({
      // The goal of the below query function is to specify exactly how to make
      // the request
      query: (user) => ({
        // specifies what will be concantenated to the `baseUrl` above
        url: "/albums",
        // if you need a query string, add it to params object
        params: {
          // this will concantenate `?userId=user.id` to url
          userId: user.id,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
