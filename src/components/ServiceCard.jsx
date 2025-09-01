import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  if (!service) return null; // Sécurité si aucun service reçu

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: 350,
        margin: "auto",
      }}
    >
      {/* Image du service (première image disponible) */}
      {service.images?.length > 0 && (
        <Box sx={{ position: "relative", width: "100%", pt: "70%" }}>
          <CardMedia
            component="img"
            image={service.images[0].image}
            alt={service.title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          />
        </Box>
      )}

      {/* Contenu texte du service */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Titre */}
        <Typography variant="h6" gutterBottom>
          {service.title || "Titre indisponible"}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {service.description || "Description indisponible"}
        </Typography>

        {/* Prix (optionnel) */}
        {service.price && (
          <Typography variant="h6" color="primary">
            Prix : {service.price}
          </Typography>
        )}
      </CardContent>

      {/* Bouton Voir plus */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to={`/services/${service.id}`}
        >
          En savoir plus
        </Button>
      </Box>
    </Card>
  );
};

export default ServiceCard;
