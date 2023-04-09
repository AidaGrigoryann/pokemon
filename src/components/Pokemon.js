import { Card, CardActions, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalOpen, setSelectedPokemon } from "../redux/pokemonSlice";
import { DetailedModal } from "./DetailedModal";

const Pokemon = ({ pokemonList, img, index, pokemon }) => {
  const dispatch = useDispatch();
  const handlePokemonClick = async () => {
    // pass to redux pokemon that has been selected
    dispatch(setSelectedPokemon(pokemon));
    dispatch(setModalOpen(true));
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#efde4e",
        width: "270px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ color: "#0c4a87" }}>
        {pokemonList[index]?.name.charAt(0).toUpperCase() +
          pokemonList[index]?.name.slice(1)}
      </Typography>
      <img
        src={img}
        alt={`Pokemon ${index}`}
        key={`pokemon-${index}`}
        onClick={handlePokemonClick}
        style={{ cursor: "pointer" }}
      />
      <Typography sx={{ color: "#0c4a87" }}>
        Type:{" "}
        {pokemon.types.map((pokemon) => {
          return (
            pokemon.type.name.charAt(0).toUpperCase() +
            pokemon.type.name.slice(1)
          );
        })}
      </Typography>
      <Typography sx={{ color: "#0c4a87" }}>
        Stats:{" "}
        {pokemon.stats.reduce((prev, acc) => {
          return prev + acc.base_stat;
        }, 0)}
      </Typography>
      <CardActions>
        <DetailedModal />
      </CardActions>
    </Card>
  );
};

export default Pokemon;