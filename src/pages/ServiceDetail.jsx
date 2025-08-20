import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => {
        const selected = res.data.services.find(
          (s) => s.id === parseInt(id, 10)
        );
        setService(selected);
        setMainImage(selected.images[0] || "");
        setAllServices(res.data.services.filter((s) => s.id !== selected.id));
      })
      .catch((err) => console.error("Erreur API:", err));
  }, [id]);

  if (!service) return <Typography>Chargement...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Bouton retour */}
      <Button
        component={Link}
        to="/services"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        Retour aux services
      </Button>

      {/* Grille principale */}
      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        {/* Images */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Card sx={{ mb: 2, width: "100%", maxWidth: 500, borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={service.name}
              sx={{ height: 350, objectFit: "cover", borderRadius: 3 }}
            />
          </Card>

          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            {service.images.map((img, idx) => (
              <Card
                key={idx}
                onClick={() => setMainImage(img)}
                sx={{
                  width: 100,
                  height: 80,
                  cursor: "pointer",
                  border: mainImage === img ? "2px solid #1976d2" : "1px solid #ccc",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "border 0.3s",
                  "&:hover": { border: "2px solid #1976d2" },
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Miniature ${idx}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Infos service */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {service.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {service.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {service.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Prix : {service.price}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Points forts :
            </Typography>
            <List>
              {service.features.map((feature, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              component={Link}
              to="/contact"
              fullWidth
            >
              Demander ce service
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Services similaires */}
      {allServices.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Services similaires
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {allServices.map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.id}>
                <Card
                  component={Link}
                  to={`/services/${s.id}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={s.images[0]}
                    alt={s.name}
                    sx={{ height: 180, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {s.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ServiceDetail;
