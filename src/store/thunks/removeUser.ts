import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../slices";

export const removeUser = createAsyncThunk(
  "user/remove",
  async (user: User) => {
    const response = await axios.delete(
      `http://localhost:3005/users/${user.id}`,
    );

    // FIX!!!
    return response.data;
  },
);
