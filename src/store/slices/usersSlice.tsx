import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks";

interface User {
  id: number;
  name: string;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [] as User[],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        // Update our state object however appropriate to show the user what
        // we are loading
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {})
      .addCase(fetchUsers.rejected, (state, action) => {});
  },
});

export const usersReducer = usersSlice.reducer;
