import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const PAGE_SIZE = [10, 20, 50];

export const fetchPokemonImages = createAsyncThunk(
  // get List of pokemons
  "pokemon/fetchImages",
  async (params, { getState }) => {
    const { page, pageSize } = getState().pokemon;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${
        (page - 1) * pageSize
      }`
    );

    const pokemonsDetailedInfo = [];
    const pokemonList = response.data.results;

    // Due to there is no one api that provides all info I have to use 2 API-s and merge them in one array
    for (const pokemon of pokemonList) {
      const spriteResponse = await axios.get(pokemon.url);
      pokemonsDetailedInfo.push({
        img: spriteResponse?.data?.sprites?.front_default,
        id: spriteResponse?.data?.id,
        height: spriteResponse?.data?.height,
        weight: spriteResponse?.data?.weight,
        name: spriteResponse?.data?.name,
        abilities: spriteResponse?.data?.abilities,
        types: spriteResponse?.data?.types,
        stats: spriteResponse?.data?.stats,
      });
    }

    return { pokemonsDetailedInfo, pokemonList };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonsDetailed: [],
    selectedPokemon: null,
    modalOpen: false,
    page: 1,
    pageSize: PAGE_SIZE[0],
    pokemonList: [],
    isSearching: false,
    isLoading: false,
    searchingValue: "",
    searchingResult: [],
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setSearchingValue: (state, action) => {
      const searchingValue = action.payload?.trim().toLowerCase();

      state.searchingValue = searchingValue;
      state.isSearching = !!searchingValue;

      // Filter data based on query
      const filtered = state.pokemonsDetailed.filter((pokemon) => {
        const sanitizedPokemonName = pokemon.name.trim().toLowerCase();
        return sanitizedPokemonName.includes(searchingValue);
      });
      console.log(state);
      state.searchingResult = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonImages.pending, (state) => {
        state.pokemonsDetailed = [];
        state.pokemonList = [];
        state.isLoading = true;
      })

      .addCase(fetchPokemonImages.fulfilled, (state, action) => {
        state.pokemonsDetailed = action.payload.pokemonsDetailedInfo;
        state.pokemonList = action.payload.pokemonList;
        state.isLoading = false;
      });
  },
});

export const {
  setSelectedPokemon,
  setModalOpen,
  setPage,
  setPageSize,
  setSearchingValue,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
