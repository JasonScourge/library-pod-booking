import { createSlice } from "@reduxjs/toolkit";

const userDetailsInitialState = {
  name: "",
  bookings: [],
  loginToken: null,
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: userDetailsInitialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    writingUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.bookings = action.payload.bookings;
      state.loginToken = action.payload.loginToken;
    },
    deletingUserDetails: () => userDetailsInitialState,
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { writingUserDetails, deletingUserDetails, setBookings } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
