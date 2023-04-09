import { configureStore } from "@reduxjs/toolkit";
import pokemonReduser from "./pokemonSlice";
const store = configureStore({
  reducer: {
    pokemon: pokemonReduser,
  },
});

export default store;
