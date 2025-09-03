import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <Card
      sx={{
        maxWidth: 360,
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {service.images && service.images.length > 0 ? (
        <CardMedia
          component="img"
          image={service.images[0]?.image}
          alt={service.title}
          sx={{ height: 180, objectFit: "cover" }}
        />
      ) : (
        <Skeleton variant="rectangular" height={180} />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {service.category ? service.category.name : "Service"}
        </Typography>

        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
          {service.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: 60 }}
        >
          {service.description}
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Prix : {service.price}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            component={Link}
            to={`/services/${service.id}`}
            fullWidth
          >
            Voir détails
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            component={Link}
            to="/contact"
            fullWidth
          >
            Demander un service
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
