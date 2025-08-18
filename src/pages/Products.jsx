import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { Box, TextField, MenuItem, Typography, Grid, Skeleton } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filter === "all" ? true : p.category === filter))
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s|FCFA/g, ""));
      const priceB = parseInt(b.price.replace(/\s|FCFA/g, ""));
      if (sort === "price-asc") return priceA - priceB;
      if (sort === "price-desc") return priceB - priceA;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Titre */}
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Nos Produits
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Découvrez notre sélection de produits sanitaires de qualité.
      </Typography>

      {/* Barre recherche + filtres */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          my: 4,
        }}
      >
        <TextField
          label="Rechercher un produit"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Catégorie"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">Toutes les catégories</MenuItem>
          <MenuItem value="robinetterie">Robinetterie</MenuItem>
          <MenuItem value="lavabo">Lavabos</MenuItem>
          <MenuItem value="douche">Colonnes de douche</MenuItem>
          <MenuItem value="miroir">Miroirs</MenuItem>
        </TextField>

        <TextField
          select
          label="Trier par"
          variant="outlined"
          size="small"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="name">Nom</MenuItem>
          <MenuItem value="price-asc">Prix croissant</MenuItem>
          <MenuItem value="price-desc">Prix décroissant</MenuItem>
        </TextField>
      </Box>

      {/* Liste produits */}
      {loading ? (
        <Grid container spacing={4}>
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton
                variant="rectangular"
                height={250}
                sx={{ borderRadius: 2 }}
                animation="wave"
              />
              <Skeleton variant="text" sx={{ mt: 1 }} animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : filteredProducts.length > 0 ? (
        <Grid container spacing={4}>
          {filteredProducts.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id} sx={{ display: "flex" }}>
              <ProductCard product={p} sx={{ flex: 1 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="text.secondary" mt={4}>
          Aucun produit trouvé.
        </Typography>
      )}
    </Box>
  );
}
