import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonImages, setPageSize } from "../redux/pokemonSlice";
import Pokemon from "./Pokemon";

const PAGE_SIZE = [10, 20, 50]; // Number of Pokemon to display on each page

const PokemonGallery = () => {
  const dispatch = useDispatch();

  const {
    pokemonsDetailed,
    page,
    pageSize,
    pokemonList,
    isLoading,
    searchingResult,
    searchingValue,
    isSearching,
  } = useSelector((state) => state.pokemon);
  useEffect(() => {
    dispatch(fetchPokemonImages());
  }, [dispatch, page, pageSize]);

  const handlePageSizeClick = (size) => {
    dispatch(setPageSize(size));
  };
  return (
    <>
      {!isLoading && searchingValue && isSearching && (
        <Typography
          sx={{
            backgroundColor: "#e3e5d8",
            textAlign: "center",
            padding: "30px",
            color: "#0c4a87",
          }}
        >
          По зарпосу "{searchingValue}" мы нашли {searchingResult.length}{" "}
          результатов
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "centr",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundColor: "#e3e5d8",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : isSearching ? (
          searchingResult.map((pokemon, index) => {
            const { img } = pokemon;
            return (
              <Pokemon
                index={index}
                key={`${index}-${pokemon.id}`}
                img={img}
                pokemon={pokemon}
                pokemonList={pokemonList}
              />
            );
          })
        ) : (
          pokemonsDetailed?.map((pokemon, index) => {
            const { img, id } = pokemon;
            return (
              <Pokemon
                index={index}
                key={`${index}-${pokemon.id}`}
                img={img}
                pokemon={pokemon}
                pokemonList={pokemonList}
              />
            );
          })
        )}
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          backgroundColor: "#fae41e",
        }}
      >
        {PAGE_SIZE.map((size) => (
          <Button
            sx={{ color: "#0c4a87" }}
            key={size}
            onClick={() => handlePageSizeClick(size)}
          >
            {size}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default PokemonGallery;
