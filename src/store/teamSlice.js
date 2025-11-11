import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamColor: "#FEEFEFE",
  teamName: "",
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.teamName = action.payload.teamName;
      state.teamColor = action.payload.teamColor;
      localStorage.setItem("selectedTeam", state.teamName);
    },
  },
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
