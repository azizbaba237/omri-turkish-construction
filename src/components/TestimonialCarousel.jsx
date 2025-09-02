import React, { useState, useEffect } from "react";
import { Box, Card, Typography, IconButton, Skeleton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getTestimonials } from "../services/api";


const TestimonialCarousel = () => {
  // State : liste des témoignages et index du témoignage actuel
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  // Chargement des témoignages depuis de bd 
  useEffect(() => {
    getTestimonials()
      .then((res)  => setTestimonials(res.data.results || res.data || []))
      .catch((err) => console.error("Erreur testimonials :", err));
  }, []);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer); // nettoyage interval
    }
  }, [testimonials]);

  // Navigation manuelle
  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  // Si pas encore de témoignages → skeleton
  if (testimonials.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  // Témoignage actuel
  const t = testimonials[current];

  return (
    <Box sx={{ position: "relative", maxWidth: 800, mx: "auto", px: 2 }}>
      {/* Carte du témoignage */}
      <Card sx={{ p: { xs: 3, sm: 4 }, textAlign: "center", boxShadow: 6 }}>
        {/* Étoiles */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {[...Array(t.rating || 5)].map((_, i) => (
            <StarIcon key={i} color="primary" />
          ))}
        </Box>

        {/* Texte et auteur */}
        <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
          "{t.text}"
        </Typography>
        <Typography fontWeight="bold">- {t.name}</Typography>
      </Card>

      {/* Boutons précédent / suivant */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 0, sm: -40 },
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 0, sm: -40 },
          transform: "translateY(-50%)",
          bgcolor: "white",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default TestimonialCarousel;
