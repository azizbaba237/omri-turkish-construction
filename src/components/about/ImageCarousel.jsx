import React from "react";
import { Box, Card, CardMedia } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images, height = 220 }) => {
  const settings = {
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
    <Slider {...settings}>
      {images.map((img, idx) => (
        <Box key={idx} px={2}>
          <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img}
              alt={`Image ${idx + 1}`}
              sx={{ width: "100%", height, objectFit: "cover" }}
            />
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
