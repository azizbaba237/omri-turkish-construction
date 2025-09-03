import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { getServices } from "../services/api";
import ServiceCard from "../components/services/ServiceCard";
import ServiceSkeletonGrid from "../components/services/ServiceSkeletonGrid";
import EmptyState from "../components/products/EmptyState";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getServices()
      .then((servicesRes) => {
        setServices(servicesRes.data.results || servicesRes.data || []);
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ mb: 5 }}
      >
        Nos Services
      </Typography>

      {loading ? (
        <ServiceSkeletonGrid />
      ) : services.length === 0 ? (
        <EmptyState message="Aucun service disponible pour le moment." />
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {services.map((service) => (
            <Grid
              item
              key={service.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Services;
