import { Box, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setModalOpen, setSelectedPokemon } from "../redux/pokemonSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#efde4e",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
};

export const DetailedModal = () => {
  const dispatch = useDispatch();

  const { selectedPokemon, modalOpen } = useSelector((state) => state.pokemon);

  const handleCloseModal = () => {
    dispatch(setModalOpen(false));
    dispatch(setSelectedPokemon(null));
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Name:{" "}
          {selectedPokemon?.name?.charAt(0).toUpperCase() +
            selectedPokemon?.name?.slice(1)}
        </Typography>
        <Typography variant="body1">
          Height: {selectedPokemon?.height ? selectedPokemon.height : ""}
        </Typography>
        <Typography variant="body1">
          Weight: {selectedPokemon?.weight ? selectedPokemon.weight : ""}
        </Typography>
        <Typography variant="body1">
          Abilities:{" "}
          {selectedPokemon?.abilities
            ? selectedPokemon?.abilities
                .map((ability) => ability?.ability?.name)
                .join(", ")
            : ""}
        </Typography>
      </Box>
    </Modal>
  );
};
