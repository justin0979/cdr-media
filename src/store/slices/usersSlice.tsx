import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks";

export interface User {
  id: number;
  name: string;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [] as User[],
    isLoading: false,
    error: null || {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const usersReducer = usersSlice.reducer;
