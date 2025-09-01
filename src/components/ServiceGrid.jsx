import React from "react";
import { Box, Skeleton } from "@mui/material";
import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services = [], loading = false }) => {
  // --- Squelettes affichés pendant le chargement ---
  const skeletons = [...Array(3)];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // Mobile : 1 service par ligne
          sm: "1fr 1fr", // Tablette : 2 services par ligne
          md: "1fr 1fr 1fr", // Desktop : 3 services par ligne
        },
        gap: 3, // Espacement entre les cartes
        pb: 2,
        pt: 2,
      }}
    >
      {/* Affiche les skeletons si en cours de chargement */}
      {loading
        ? skeletons.map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          ))
        : // Sinon, affiche les services (limité à 3 en homepage)
          services.slice(0, 3).map((service) =>
            service ? (
              <Box key={service.id}>
                <ServiceCard service={service} />
              </Box>
            ) : null
          )}
    </Box>
  );
};

export default ServiceGrid;
