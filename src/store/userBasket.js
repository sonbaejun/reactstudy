import { createSlice } from "@reduxjs/toolkit";

let userBasket = createSlice({
  name: "userBasket",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      let stateId = state.findIndex((e) => e.id == action.payload);
      state[stateId].count++;
      //   state.map((e) => {
      //     return e.id == action.payload ? e.count++ : null;
      //   });
    },
    changeBasket(state, action) {
      let stateId = state.findIndex((e) => e.id == action.payload.id);
      if (stateId == -1) {
        let newBasket = {
          id: action.payload.id,
          name: action.payload.title,
          count: 1,
        };
        state.push(newBasket);
      } else {
        state[stateId].count++;
      }
    },
    deleteBasket(state, action) {
      let stateId = state.findIndex((e) => e.id == action.payload);
      state.splice(stateId, 1);
    },
  },
});

export let { changeCount, changeBasket, deleteBasket } = userBasket.actions;

export default userBasket;
