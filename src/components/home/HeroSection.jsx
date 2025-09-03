import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Données pour le carrousel
  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Bienvenue chez Omri Turkish Construction",
      subtitle: "Vente de produits sanitaires et prestations professionnelles",
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Des matériaux de qualité supérieure",
      subtitle: "Pour tous vos projets de construction et rénovation",
    },
    {
      image: "/public/images/construction1.jpg",
      title: "Expertise professionnelle",
      subtitle: "Des services sur mesure pour répondre à vos besoins",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [carouselData.length]);

  return (
    // Section principale avec image de fond et overlay sombre
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url('${carouselData[currentIndex].image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        transition: "background-image 1s ease-in-out",
        padding: { xs: "0 16px", sm: "0" }, // Ajout de padding sur mobile
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
          variant={isMobile ? "h5" : "h4"} // Taille de police réduite sur mobile
          fontWeight="bold"
          gutterBottom
          className="uppercase drop-shadow-lg"
          sx={{
            animation: "fadeIn 1s",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            fontSize: {
              // Ajustement spécifique de la taille de police
              xs: "1.5rem", // Taille pour très petits écrans
              sm: "2rem", // Taille pour petits écrans
              md: "2.125rem", // Taille par défaut
            },
            lineHeight: {
              xs: "1.3",
              sm: "1.5",
            },
            padding: { xs: "0 8px", sm: "0" }, // Padding pour éviter les débordements
          }}
        >
          {carouselData[currentIndex].title}
        </Typography>

        <Typography
          variant={isMobile ? "body1" : "h6"}
          mb={3}
          sx={{
            animation: "fadeIn 1s",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
            },
            padding: { xs: "0 8px", sm: "0" }, // Padding pour éviter les débordements
          }}
        >
          {carouselData[currentIndex].subtitle}
        </Typography>

        {/* Boutons d'appel à l'action */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: { xs: "column", sm: "row" }, // Colonne sur mobile, ligne sur desktop
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            component={Link}
            to="/products"
            sx={{
              bgcolor: "#1E40AF",
              width: { xs: "100%", sm: "auto" }, // Pleine largeur sur mobile
            }}
          >
            Voir nos produits
          </Button>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            component={Link}
            to="/services"
            sx={{
              bgcolor: "#f29200",
              width: { xs: "100%", sm: "auto" }, // Pleine largeur sur mobile
            }}
          >
            Découvrir nos services
          </Button>
        </Box>
      </Container>

      {/* Indicateurs de défilement */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {carouselData.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor:
                index === currentIndex ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
