import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => setServices(res.data.services))
      .catch((err) => console.error("Erreur API:", err));
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
              {service.images && service.images.length > 0 && (
                <CardMedia
                  component="img"
                  image={service.images[0]}
                  alt={service.name}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  {service.category || "Service"}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  color="primary"
                >
                  {service.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 60 }}
                >
                  {service.description}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  {service.price}
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
