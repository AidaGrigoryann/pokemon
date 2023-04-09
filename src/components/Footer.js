import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Footer() {
  return (
    <Paper
      sx={{
        padding: "10px",
        backgroundColor: "#fae41e",
        boxShadow: 3,
        border: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        ></Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#0c4a87", fontSize: "16px" }}
          >
            Copyright ©2023. Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}