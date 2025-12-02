import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: ["person1", "person2", "person3"],
  following: ["John Doe", "person2", "person3", "person4", "person5", "person6"],
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    addFollowing(state, action) {
      // payload is following name
      state.following.push(action.payload);
    },
    deleteFollowing(state, action) {
      state.following = state.following.filter(
        (person) => person !== action.payload
      );
    },
  },
});

export const { addFollowing, deleteFollowing } = followSlice.actions;
export default followSlice.reducer;

export const getFollowings = (state) => state.follow.following;
export const getFollowers = (state) => state.follow.followers;
