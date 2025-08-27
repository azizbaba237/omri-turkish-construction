import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  TextField,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getProducts, getServices } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  //const [testimonials, setTestimonials] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    setLoadingProducts(true);
    getProducts()
      .then((productsRes) => {
        setProducts(productsRes.data.results || productsRes.data || []);
      })
      .catch((err) => console.error("Erreur chargement :", err))
      .finally(() => setLoadingProducts(false));
  }, []);

 useEffect(() => {
  setLoadingServices(true);
  getServices()
    .then((servicesRes) => {
      setServices(
        servicesRes.data.results || servicesRes.data || []
      );
      console.log(servicesRes.data);
      
    })
    .catch((err) => console.error("Erreur API:", err))
    .finally(() => setLoadingServices(false));
}, []);


  // Carrousel Témoignages
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // useEffect(() => {
  //   if (testimonials.length > 0) {
  //     const timer = setInterval(() => {
  //       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  //     }, 5000);
  //     return () => clearInterval(timer);
  //   }
  // }, [testimonials.length]);

  // const nextTestimonial = () =>
  //   setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  // const prevTestimonial = () =>
  //   setCurrentTestimonial(
  //     (currentTestimonial - 1 + testimonials.length) % testimonials.length
  //   );

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            className="uppercase drop-shadow-lg"
          >
            Bienvenue chez Omri Turkish Construction
          </Typography>
          <Typography variant="h6" mb={3}>
            Vente de produits sanitaires et prestations professionnelles
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              sx={{ bgcolor: "#1E40AF" }}
            >
              Voir nos produits
            </Button>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/services"
              sx={{ bgcolor: "#f29200" }}
            >
              Découvrir nos services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Promo Banner */}
      <Box
        sx={{
          backgroundColor: "#f29200",
          color: "#000",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          <LocalOfferIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          NB: NOS PRODUITS BENEFICIENT D'UNE GARENTIE D'UN AN
        </Typography>
      </Box>

      {/* Products Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2rem" },
          }}
        >
          Nos Produits Phares
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {loadingProducts
            ? [...Array(12)].map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
                  <Card sx={{ maxWidth: 350, margin: "auto", height: "100%" }}>
                    <Skeleton
                      variant="rectangular"
                      height={320}
                      sx={{
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      }}
                    />
                    <CardContent>
                      <Skeleton variant="text" height={30} width="80%" />
                      <Skeleton
                        variant="text"
                        height={20}
                        width="60%"
                        sx={{ mt: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        height={25}
                        width="40%"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Skeleton
                        variant="rectangular"
                        height={40}
                        sx={{ borderRadius: 1 }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))
            : products.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={product.id}>
                  <Card
                    className="transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      maxWidth: 250,
                      margin: "auto",
                    }}
                  >
                    <Box
                      sx={{ position: "relative", width: "100%", pt: "75%" }}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
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

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        px: { xs: 2, sm: 3 },
                        py: { xs: 2, sm: 3 },
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          minHeight: "3rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          minHeight: "2.5rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.short_description}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
                      >
                        {product.price} Fcfa
                      </Typography>
                    </CardContent>

                    <Box sx={{ p: 2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        component={Link}
                        to={`/products/${product.id}`}
                      >
                        Voir le produit
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {/* Services Section */}
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
            mt: 8,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Nos Prestations de Services
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {loadingServices
              ? [...Array(6)].map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={i}>
                    <Card
                      sx={{ maxWidth: 350, margin: "auto", height: "100%" }}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={140}
                        sx={{
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                        }}
                      />
                      <CardContent>
                        <Skeleton variant="text" height={30} width="70%" />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="90%"
                          sx={{ mt: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          height={25}
                          width="50%"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Skeleton
                          variant="rectangular"
                          height={36}
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))
              : services.slice(0, 3).map((service) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    key={service.id}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxWidth: 350,
                        margin: "auto",
                      }}
                    >
                      {service.images && (
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            pt: "70%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={service.images[0]?.image}
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
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {service.description}
                        </Typography>
                        {service.price && (
                          <Typography variant="h6" color="primary">
                            Prix : {service.price}
                          </Typography>
                        )}
                      </CardContent>
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
                  </Grid>
                ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/services"
            >
              Voir tous nos services
            </Button>
          </Box>
        </Box>

        {/* Témoignages */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 8,
            mb: 4,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Ils nous font confiance
        </Typography>

        {/* {testimonials.length === 0 ? (
          <Box sx={{ position: "relative", maxWidth: 800, mx: "auto", px: 2 }}>
            <Skeleton
              variant="rectangular"
              height={180}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        ) : (
          <Box sx={{ position: "relative", maxWidth: 800, mx: "auto", px: 2 }}>
            <Card
              sx={{ p: { xs: 3, sm: 4 }, textAlign: "center", boxShadow: 6 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                {[...Array(testimonials[currentTestimonial]?.rating || 5)].map(
                  (_, i) => (
                    <StarIcon key={i} color="primary" />
                  )
                )}
              </Box>
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                "{testimonials[currentTestimonial]?.text}"
              </Typography>
              <Typography fontWeight="bold">
                - {testimonials[currentTestimonial]?.name}
              </Typography>
            </Card>

            <IconButton
              onClick={prevTestimonial}
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: 0, sm: -40 },
                transform: "translateY(-50%)",
                bgcolor: "white",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={nextTestimonial}
              sx={{
                position: "absolute",
                top: "50%",
                right: { xs: 0, sm: -40 },
                transform: "translateY(-50%)",
                bgcolor: "white",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )} */}
      </Container>

      {/* Newsletter */}
      <Box
        sx={{
          backgroundColor: "#1E40AF",
          color: "white",
          p: 5,
          mt: 8,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Restez informé
            </Typography>
            <Typography>
              Abonnez-vous à notre newsletter pour recevoir nos offres
              exclusives et actualités.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Votre email"
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                endIcon={<EmailIcon />}
              >
                S'abonner
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
