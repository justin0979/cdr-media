import { createSlice } from "@reduxjs/toolkit";

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
});

export const usersReducer = usersSlice.reducer;
