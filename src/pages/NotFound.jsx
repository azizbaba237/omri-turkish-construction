import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h1" fontWeight="bold" color="error">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page introuvable
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Désolé, la page que vous recherchez n'existe pas.
      </Typography>
      <Box>
        <Button variant="contained" component={Link} to="/">
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
