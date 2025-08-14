import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const services = [
  {
    title: "Vente de produits sanitaires",
    description: "Robinetterie, colonnes de douche, lavabos...",
  },
  {
    title: "Suivi de travaux",
    description: "Accompagnement et contrôle qualité de vos projets.",
  },
  {
    title: "Installation",
    description: "Pose professionnelle par nos techniciens.",
  },
];

const Services = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Nos Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
