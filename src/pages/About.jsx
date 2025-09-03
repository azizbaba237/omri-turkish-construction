import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { FaTools, FaSmile, FaLightbulb } from "react-icons/fa";

// Import des composants découpés
import Hero from "../components/about/Hero";
import ValeurCard from "../components/about/ValeurCard";
import ImageCarousel from "../components/about/ImageCarousel";
import TeamMember from "../components/about/TeamMember";
import TestimonialCarousel from "../components/home/TestimonialCarousel";

const About = () => {
  const values = [
    {
      title: "Qualité",
      desc: "Produits sanitaires haut de gamme.",
      icon: <FaTools size={40} color="#1976d2" />,
    },
    {
      title: "Service",
      desc: "Suivi personnalisé pour chaque projet.",
      icon: <FaSmile size={40} color="#1976d2" />,
    },
    {
      title: "Innovation",
      desc: "Solutions modernes et efficaces.",
      icon: <FaLightbulb size={40} color="#1976d2" />,
    },
  ];

  const heroSlides = [
    {
      img: "/images/photo5.jpg",
      title: "À propos de Omri Turkish Construction",
      subtitle:
        "Expertise, qualité et service professionnel pour tous vos projets.",
    },
    {
      img: "/images/construction1.jpg",
      title: "Nos Projets",
      subtitle: "Construction et rénovation de qualité supérieure.",
    },
    {
      img: "/images/vitre1.jpg",
      title: "Innovation",
      subtitle: "Solutions modernes et efficaces pour tous vos besoins.",
    },
  ];

  const realizations = [
    "/images/photo5.jpg",
    "/images/vitre1.jpg",
    "/images/construction1.jpg",
    "/images/robinet.jpg",
  ];
  const partners = [
    "/images/logo.jpg",
    "/images/lampe.jpg",
    "/images/miroir.jpg",
    "/images/equipe.jpg",
  ];
  const team = [
    { name: "Aziz Baba", role: "CEO", img: "/images/equipe.jpg" },
    {
      name: "Marie Dupont",
      role: "Responsable Projets",
      img: "/images/equipe.jpg",
    },
    { name: "John Doe", role: "Chef de chantier", img: "/images/equipe.jpg" },
  ];

  return (
    <Container maxWidth="lg" sx={{ pb: 2 }}>
      <Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          À propos de nous{" "}
        </Typography>
      </Typography>
      {/* Hero Section */}
      <Hero slides={heroSlides} />

      {/* Section mission */}
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        mb={8}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Notre mission
          </Typography>
          <Typography paragraph>
            Fournir des solutions durables, esthétiques et efficaces pour vos
            projets de construction et rénovation, avec des produits sanitaires
            de haute qualité.
          </Typography>
          <Typography paragraph>
            Accompagnement complet, suivi rigoureux et service après-vente
            irréprochable.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image="/images/construction1.jpg"
              alt="Mission Turkish Omri"
              sx={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Valeurs */}
      <Grid container spacing={4} justifyContent="center" mb={8}>
        {values.map((val, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <ValeurCard {...val} />
          </Grid>
        ))}
      </Grid>

      {/* Réalisations */}
      <Box mb={8}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Nos réalisations
        </Typography>
        <ImageCarousel images={realizations} />
      </Box>

      {/* Partenaires */}
      <Box mb={8}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Nos partenaires
        </Typography>
        <ImageCarousel images={partners} height={80} />
      </Box>

      {/* Équipe */}
      <Box mb={8}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Notre équipe
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {team.map((member, idx) => (
            <TeamMember key={idx} {...member} />
          ))}
        </Grid>
      </Box>

      {/* Témoignages */}
      <Box mb={8} textAlign="center">
        <TestimonialCarousel />
      </Box>
    </Container>
  );
};

export default About;
