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
  Skeleton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getServices } from "../services/api";

// Image de secours si aucune image n’existe
const fallbackImage = "/assets/images/placeholder.jpg";

// Fonction utilitaire : gère string ou objet image
const formatImageUrl = (img) => {
  if (!img) return fallbackImage;
  if (typeof img === "string") return img;
  if (img.image) return img.image; // cas où API renvoie {id, image: "..."}
  return fallbackImage;
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((servicesRes) => {
        const all = servicesRes.data.services || servicesRes.data;
        const selected = all.find((s) => s.id === parseInt(id, 10));

        setService(selected);
        setMainImage(formatImageUrl(selected?.images?.[0]));
        setAllServices(all.filter((s) => s.id !== selected?.id));
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 3 }} />
            <Box display="flex" gap={2} mt={2}>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={100}
                  height={80}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="70%" height={50} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!service) return <Typography>Service introuvable</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Bouton retour */}
      <Button
        component={Link}
        to="/services"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 4,
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { color: "primary.main" },
        }}
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
          <Card
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: 500,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 4,
            }}
          >
            <CardMedia
              component="img"
              image={mainImage || fallbackImage}
              alt={service.title}
              sx={{
                height: 350,
                objectFit: "cover",
                transition: "transform 0.4s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Card>

          {/* Miniatures */}
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            {(service.images && service.images.length > 0
              ? service.images
              : [fallbackImage]
            ).map((img, idx) => {
              const imgUrl = formatImageUrl(img);
              return (
                <Card
                  key={idx}
                  onClick={() => setMainImage(imgUrl)}
                  sx={{
                    width: 100,
                    height: 80,
                    cursor: "pointer",
                    border:
                      mainImage === imgUrl ? "2px solid #1976d2" : "1px solid #ccc",
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.3s",
                    "&:hover": {
                      border: "2px solid #1976d2",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={imgUrl}
                    alt={`Miniature ${idx}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
              );
            })}
          </Box>
        </Grid>

        {/* Infos service */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {service.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              gutterBottom
            >
              Catégorie : {service.category?.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {service.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Prix : {service.price}
            </Typography>

            {service.features?.length > 0 && (
              <>
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
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
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
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
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
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={formatImageUrl(s.images?.[0])}
                    alt={s.title}
                    sx={{ height: 180, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {s.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Catégorie : {s.category?.name}
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
