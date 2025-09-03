import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories } from "../services/api";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Sous-composants
import ProductFilters from "../components/products/ProductFilters";
import ProductSkeletonGrid from "../components/products/ProductSkeletonGrid";
import EmptyState from "../components/products/EmptyState";

/**
 * Page Produits
 */
export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);

  // Charger produits + catégories au montage
  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data.results || productsRes.data || []);
        setCategories(categoriesRes.data.results || categoriesRes.data || []);
      })
      .catch((err) => console.error("Erreur chargement :", err))
      .finally(() => setLoading(false));
  }, []);

  // Appliquer recherche, filtre et tri
  const filteredProducts = products
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (filter === "all") return true;
      return String(p.category?.id) === String(filter);
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      if (sort === "price-asc") return priceA - priceB;
      if (sort === "price-desc") return priceB - priceA;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Titre et sous-titre */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>

      {/* Barre de recherche + filtres */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      {/* Liste produits */}
      {loading ? (
        <ProductSkeletonGrid />
      ) : filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          resetFilters={() => {
            setSearch("");
            setFilter("all");
          }}
        />
      )}
    </Box>
  );
}
