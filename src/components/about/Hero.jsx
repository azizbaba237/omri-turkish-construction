import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <Box mb={8}>
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              position: "relative", // Permet de placer le texte par-dessus
              width: "100%",
              maxHeight: { xs: 300, sm: 400, md: 450 }, // Hauteur responsive
              overflow: "hidden",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {/* Image de fond */}
            <Box
              component="img"
              src={slide.img}
              alt={slide.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // couvre tout le conteneur
              }}
            />

            {/* Texte par-dessus */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                background: "rgba(0,0,0,0.3)", // léger overlay pour lisibilité
                px: 2,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" } }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
              >
                {slide.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Hero;
