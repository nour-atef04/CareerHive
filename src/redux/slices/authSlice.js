import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const res = await fetch(`http://localhost:3001/users?email=${email}`);
    const data = await res.json();

    if (data.length > 0 && data[0].password === password) {
      return data[0];
    } else {
      return thunkAPI.rejectWithValue("Invalid email or password.");
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const getUser = (state) => state.auth.user;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
