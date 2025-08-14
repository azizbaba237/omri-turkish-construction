import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        À propos
      </Typography>
      <Box>
        <Typography paragraph>
          Turkish Omri Construction est spécialisée dans la vente de produits
          sanitaires et le suivi de travaux. Nous proposons des produits de
          haute qualité et un service professionnel pour répondre à tous vos
          besoins en construction et rénovation.
        </Typography>
        <Typography paragraph>
          Notre mission est de fournir des solutions durables, esthétiques et
          efficaces pour tous vos projets.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
