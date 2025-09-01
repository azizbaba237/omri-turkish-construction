import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";

// Import des fonctions API
import { getProducts, getServices } from "../services/api";

// Import des composants de la page d'accueil
import TestimonialCarousel from "../components/TestimonialCarousel";
import HeroSection from "../components/HeroSection";
import PromoBanner from "../components/PromoBanner";
import ProductGrid from "../components/ProductGrid";
import ServiceGrid from "../components/ServiceGrid";
import Newsletter from "../components/Newsletter";

const Home = () => {
  // --- États pour stocker les produits et services ---
  const [products, setProducts] = useState([]); // Liste des produits
  const [services, setServices] = useState([]); // Liste des services

  // --- États de chargement ---
  const [loadingProducts, setLoadingProducts] = useState(true); // Indique si les produits sont en cours de chargement
  const [loadingServices, setLoadingServices] = useState(true); // Indique si les services sont en cours de chargement

  // --- useEffect : chargement des produits ---
  useEffect(() => {
    setLoadingProducts(true);
    getProducts()
      .then((res) => setProducts(res.data.results || res.data || [])) // Récupère les produits depuis l'API
      .catch((err) => console.error("Erreur chargement produits :", err)) // Gestion des erreurs
      .finally(() => setLoadingProducts(false)); // Fin du chargement
  }, []);

  // --- useEffect : chargement des services ---
  useEffect(() => {
    setLoadingServices(true);
    getServices()
      .then((res) => setServices(res.data.results || res.data || [])) // Récupère les services depuis l'API
      .catch((err) => console.error("Erreur chargement services :", err)) // Gestion des erreurs
      .finally(() => setLoadingServices(false)); // Fin du chargement
  }, []);

  return (
    <>
      {/* Section Héro (bannière principale) */}
      <HeroSection />

      {/* Bandeau promotionnel */}
      <PromoBanner />

      {/* Section Produits */}
      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 4, sm: 6 }, pb: { xs: 2, sm: 2 } }}
      >
        {/* Titre Produits */}
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

        {/* Grille des produits */}
        <ProductGrid products={products} loading={loadingProducts} />
      </Container>

      {/* Section Services */}
      <Container maxWidth="xl">
        {/* Titre Services */}
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
          Nos Prestations de Services
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
          }}
        >
          {/* Grille des services */}
          <ServiceGrid services={services} loading={loadingServices} />

          {/* Bouton Voir tous les services */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/services"
            >
              Voir tous nos services
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Section Témoignages */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
        {/* Titre Témoignages */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Ils nous font confiance
        </Typography>

        {/* Carrousel de témoignages */}
        <TestimonialCarousel />
      </Container>

      {/* Section Newsletter */}
      <Newsletter />
    </>
  );
};

export default Home;
