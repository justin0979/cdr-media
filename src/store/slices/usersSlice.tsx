import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, addUser, removeUser } from "../thunks";

export interface User {
  id: number;
  name: string;
}

export interface UsersState {
  data: User[];
  isLoading: boolean;
  error: null | {};
}

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [] as User[],
    isLoading: false,
    error: null as null | {},
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

    builder
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(removeUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // FIX ME!!!
        console.log(action);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const usersReducer = usersSlice.reducer;
