import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Avatar,
} from "@mui/material";
import { FaTools, FaSmile, FaLightbulb } from "react-icons/fa";
import Slider from "react-slick"; // Carrousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Titre principal */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          À propos de Omri Turkish Construction
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Expertise, qualité et service professionnel pour tous vos projets.
        </Typography>
      </Box>

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
            <Card
              sx={{ textAlign: "center", p: 4, borderRadius: 3, boxShadow: 3 }}
            >
              <Box mb={2}>{val.icon}</Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {val.title}
              </Typography>
              <Typography color="text.secondary">{val.desc}</Typography>
            </Card>
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
        <Slider {...carouselSettings}>
          {realizations.map((img, idx) => (
            <Box key={idx} px={2}>
              <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Réalisations ${idx + 1}`}
                  sx={{ width: "100%", height: 220, objectFit: "cover" }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
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
        <Slider {...carouselSettings}>
          {partners.map((img, idx) => (
            <Box key={idx} px={2} textAlign="center">
              <Card sx={{ borderRadius: 2, p: 2, boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Partenaire ${idx + 1}`}
                  sx={{
                    maxWidth: "100%",
                    height: 80,
                    objectFit: "contain",
                    mx: "auto",
                  }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
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
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={idx}
              sx={{ textAlign: "center" }}
            >
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{ width: 140, height: 140, mb: 2, mx: "auto" }}
              />
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography color="text.secondary">{member.role}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Témoignages */}
      <Box mb={8} textAlign="center">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ce que disent nos clients
        </Typography>
        <Typography variant="body1" fontStyle="italic" color="text.secondary">
          “Travail impeccable, produits de qualité et suivi très professionnel.”
          – Client satisfait
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
