import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => (
  // Section principale avec image de fond et overlay sombre
  <Box
    sx={{
      position: "relative",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
    }}
  >
    {/* Overlay sombre au-dessus de l'image */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    />

    {/* Contenu centré */}
    <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        className="uppercase drop-shadow-lg"
      >
        Bienvenue chez Omri Turkish Construction
      </Typography>

      <Typography variant="h6" mb={3}>
        Vente de produits sanitaires et prestations professionnelles
      </Typography>

      {/* Boutons d'appel à l'action */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/products"
          sx={{ bgcolor: "#1E40AF" }}
        >
          Voir nos produits
        </Button>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/services"
          sx={{ bgcolor: "#f29200" }}
        >
          Découvrir nos services
        </Button>
      </Box>
    </Container>
  </Box>
);

export default HeroSection;
